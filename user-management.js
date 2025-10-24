const API_BASE = '/api';
let currentSession = null;

function getSession() {
    const sessionData = localStorage.getItem('userSession');
    if (!sessionData) {
        return null;
    }

    try {
        return JSON.parse(sessionData);
    } catch (error) {
        console.error('Failed to parse user session from localStorage:', error);
        return null;
    }
}

function getUserOfficesKey(username) {
    return `medicalSupplyOffices_${username}`;
}

function getUserCurrentOfficeKey(username) {
    return `currentOfficeId_${username}`;
}

function removeUserData(username) {
    localStorage.removeItem(getUserOfficesKey(username));
    localStorage.removeItem(getUserCurrentOfficeKey(username));
}

function countAdmins(users) {
    return users.filter(user => user.role === 'admin').length;
}

function checkAuth() {
    const session = getSession();

    if (!session || !session.loggedIn) {
        window.location.href = 'login.html';
        return false;
    }

    if (session.role !== 'admin') {
        window.location.href = 'office-selector.html';
        return false;
    }

    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.textContent = `Logged in as: ${session.username} (${session.role})`;
    }

    return session;
}

function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'login.html';
}

function goToOfficeSelector() {
    window.location.href = 'office-selector.html';
}

async function apiRequest(endpoint, options = {}) {
    const config = { ...options };
    const headers = { ...(options.headers || {}) };
    if (!headers['Content-Type'] && config.body !== undefined) {
        headers['Content-Type'] = 'application/json';
    }
    config.headers = headers;

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
        const errorMessage = payload && payload.error ? payload.error : 'An unexpected error occurred. Please try again.';
        throw new Error(errorMessage);
    }

    return payload;
}

function showMessage(message, type) {
    const messageElement = document.getElementById('userMessage');
    if (!messageElement) {
        return;
    }

    messageElement.textContent = message;
    messageElement.style.display = 'block';

    if (type === 'error') {
        messageElement.classList.remove('message-success');
        messageElement.classList.add('message-error');
    } else {
        messageElement.classList.remove('message-error');
        messageElement.classList.add('message-success');
    }
}

function hideMessage() {
    const messageElement = document.getElementById('userMessage');
    if (messageElement) {
        messageElement.style.display = 'none';
        messageElement.textContent = '';
        messageElement.classList.remove('message-error', 'message-success');
    }
}

async function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('userRole').value;

    hideMessage();

    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    try {
        await apiRequest('/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, role })
        });

        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';

        showMessage(`User "${username}" added successfully`, 'success');
        await renderUsers();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function removeUser(username) {
    if (username === 'admin') {
        showMessage('Cannot remove the admin account', 'error');
        return;
    }

    if (!confirm(`Are you sure you want to remove user "${username}"?`)) {
        return;
    }

    try {
        await apiRequest(`/users/${encodeURIComponent(username)}`, {
            method: 'DELETE'
        });

        removeUserData(username);
        showMessage(`User "${username}" has been removed`, 'success');
        await renderUsers();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function toggleUserRole(username) {
    try {
        const users = await apiRequest('/users');
        const user = users.find(u => u.username === username);

        if (!user) {
            showMessage(`User "${username}" was not found`, 'error');
            return;
        }

        if (username === 'admin') {
            showMessage('The default admin account must remain an administrator', 'error');
            return;
        }

        if (user.role === 'admin') {
            const adminCount = countAdmins(users);
            if (adminCount <= 1) {
                showMessage('At least one administrator account is required', 'error');
                return;
            }

            if (currentSession && currentSession.username === username) {
                showMessage('You cannot demote the account that is currently signed in', 'error');
                return;
            }
        }

        const targetRole = user.role === 'admin' ? 'user' : 'admin';

        await apiRequest(`/users/${encodeURIComponent(username)}`, {
            method: 'PATCH',
            body: JSON.stringify({ role: targetRole })
        });

        showMessage(`User "${username}" is now assigned the ${targetRole} role`, 'success');
        await renderUsers();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function resetUserPassword(username) {
    try {
        const result = await apiRequest(`/users/${encodeURIComponent(username)}/reset-password`, {
            method: 'POST'
        });

        await renderUsers();

        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            try {
                await navigator.clipboard.writeText(result.newPassword);
                showMessage(`New password for "${username}": ${result.newPassword} (copied to clipboard)`, 'success');
                return;
            } catch (error) {
                console.warn('Failed to copy to clipboard:', error);
            }
        }

        showMessage(`New password for "${username}": ${result.newPassword}`, 'success');
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function updateOwnPassword() {
    if (!currentSession) {
        showMessage('Your session has expired. Please sign in again.', 'error');
        return;
    }

    const newPassword = document.getElementById('adminNewPassword').value;
    const confirmPassword = document.getElementById('adminConfirmPassword').value;

    if (!newPassword || !confirmPassword) {
        showMessage('Please complete both password fields', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    try {
        await apiRequest(`/users/${encodeURIComponent(currentSession.username)}`, {
            method: 'PATCH',
            body: JSON.stringify({ password: newPassword })
        });

        document.getElementById('adminNewPassword').value = '';
        document.getElementById('adminConfirmPassword').value = '';

        showMessage('Your password has been updated successfully', 'success');
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function renderUsers() {
    const container = document.getElementById('usersContainer');
    if (!container) {
        return;
    }

    container.innerHTML = '';

    try {
        const users = await apiRequest('/users');

        if (!users || users.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">👥</div>
                    <h3>No users found</h3>
                    <p>Add your first user account</p>
                </div>
            `;
            return;
        }

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <div class="item-header">
                    <div class="item-name">${user.username}</div>
                    <span class="status-badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}">
                        ${user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                </div>
                <div class="item-details">
                    <div class="item-detail">
                        <label>Role:</label>
                        <span>${user.role}</span>
                    </div>
                    <div class="item-detail">
                        <label>Created:</label>
                        <span>${user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                </div>
                <div class="user-actions">
                    ${user.username !== 'admin'
                        ? `<button class="btn btn-secondary btn-small" onclick="toggleUserRole('${user.username}')">${user.role === 'admin' ? '⬇️ Demote to User' : '⬆️ Promote to Admin'}</button>`
                        : `<button class="btn btn-secondary btn-small" disabled>Admin Role Locked</button>`}
                    <button class="btn btn-primary btn-small" onclick="resetUserPassword('${user.username}')">🔐 Reset Password</button>
                    ${user.username !== 'admin'
                        ? `<button class="btn btn-danger btn-small" onclick="removeUser('${user.username}')">🗑️ Remove</button>`
                        : `<button class="btn btn-secondary btn-small" disabled>Protected Account</button>`}
                </div>
            `;
            container.appendChild(userCard);
        });
    } catch (error) {
        console.error('Failed to load users:', error);
        container.innerHTML = `
            <div class="empty-state error">
                <div class="empty-icon">⚠️</div>
                <h3>Unable to load users</h3>
                <p>${error.message}</p>
            </div>
        `;
        showMessage(error.message, 'error');
    }
}

async function initializeUserManagement() {
    const session = checkAuth();
    if (!session) {
        return;
    }

    currentSession = session;
    hideMessage();
    await renderUsers();
}

document.addEventListener('DOMContentLoaded', () => {
    initializeUserManagement().catch(error => {
        console.error('Failed to initialize user management:', error);
        showMessage('Unable to initialize the user management console. Please refresh the page.', 'error');
    });
});
