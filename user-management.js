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

function getStoredUsers() {
    const usersData = localStorage.getItem('appUsers');
    if (!usersData) {
        return [];
    }

    try {
        return JSON.parse(usersData);
    } catch (error) {
        console.error('Failed to parse stored users from localStorage:', error);
        return [];
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

function saveUsers(users) {
    localStorage.setItem('appUsers', JSON.stringify(users));
}

function countAdmins(users) {
    return users.filter(user => user.role === 'admin').length;
}

function generateSecurePassword(length = 12) {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';
    let password = '';
    const cryptoObj = window.crypto || window.msCrypto;

    if (cryptoObj && cryptoObj.getRandomValues) {
        const randomValues = new Uint32Array(length);
        cryptoObj.getRandomValues(randomValues);
        for (let i = 0; i < length; i++) {
            password += charset[randomValues[i] % charset.length];
        }
    } else {
        for (let i = 0; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }
    }

    return password;
}

let currentSession = null;

// Check authentication and ensure user is admin
function checkAuth() {
    const session = getSession();

    if (!session || !session.loggedIn) {
        // No session, redirect to login
        window.location.href = 'login.html';
        return false;
    }
    
    if (session.role !== 'admin') {
        // Not admin, redirect to office selector
        window.location.href = 'office-selector.html';
        return false;
    }
    
    // Update user info
    document.getElementById('userInfo').textContent = `Logged in as: ${session.username} (${session.role})`;
    
    return session;
}

// Logout function
function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'login.html';
}

// Navigate to office selector
function goToOfficeSelector() {
    window.location.href = 'office-selector.html';
}

// Add a new user
function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value;
    const role = document.getElementById('userRole').value;
    const messageElement = document.getElementById('userMessage');
    
    // Clear previous messages
    messageElement.style.display = 'none';
    
    // Validate input
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Get existing users
    let users = getStoredUsers();
    
    // Check if user already exists
    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        showMessage('A user with this username already exists', 'error');
        return;
    }

    // Reset any previous stored data for this username
    removeUserData(username);

    // Add new user
    const newUser = {
        username: username,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Clear form
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';

    // Show success message
    showMessage(`User "${username}" added successfully`, 'success');
    
    // Refresh user list
    renderUsers();
}

// Remove a user
function removeUser(username) {
    if (username === 'admin') {
        showMessage('Cannot remove the admin account', 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to remove user "${username}"?`)) {
        // Get existing users
        let users = getStoredUsers();

        // Remove user
        users = users.filter(user => user.username !== username);
        saveUsers(users);

        // Remove user-specific data
        removeUserData(username);

        // Refresh user list
        renderUsers();
    }
}

function toggleUserRole(username) {
    const users = getStoredUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        showMessage(`User "${username}" was not found`, 'error');
        return;
    }

    if (username === 'admin') {
        showMessage('The default admin account must remain an administrator', 'error');
        return;
    }

    const targetRole = user.role === 'admin' ? 'user' : 'admin';

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

    user.role = targetRole;
    saveUsers(users);
    showMessage(`User "${username}" is now assigned the ${targetRole} role`, 'success');
    renderUsers();
}

function resetUserPassword(username) {
    const users = getStoredUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        showMessage(`User "${username}" was not found`, 'error');
        return;
    }

    const newPassword = generateSecurePassword();
    user.password = newPassword;
    saveUsers(users);
    renderUsers();

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(newPassword)
            .then(() => {
                showMessage(`New password for "${username}": ${newPassword} (copied to clipboard)`, 'success');
            })
            .catch(() => {
                showMessage(`New password for "${username}": ${newPassword}`, 'success');
            });
    } else {
        showMessage(`New password for "${username}": ${newPassword}`, 'success');
    }
}

function updateOwnPassword() {
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

    const users = getStoredUsers();
    const user = users.find(user => user.username === currentSession.username);

    if (!user) {
        showMessage('Unable to locate the current user account. Please sign in again.', 'error');
        return;
    }

    user.password = newPassword;
    saveUsers(users);

    document.getElementById('adminNewPassword').value = '';
    document.getElementById('adminConfirmPassword').value = '';

    showMessage('Your password has been updated successfully', 'success');
}

// Show message
function showMessage(message, type) {
    const messageElement = document.getElementById('userMessage');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    if (type === 'error') {
        messageElement.style.background = '#f8d7da';
        messageElement.style.color = '#721c24';
        messageElement.style.borderColor = '#f5c6cb';
    } else {
        messageElement.style.background = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.borderColor = '#c3e6cb';
    }
}

// Render users
function renderUsers() {
    const container = document.getElementById('usersContainer');
    container.innerHTML = '';

    // Get users
    const users = getStoredUsers();
    
    if (users.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 4em; margin-bottom: 20px;">👥</div>
                <h3>No users found</h3>
                <p>Add your first user account</p>
            </div>
        `;
        return;
    }
    
    // Render each user
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="item-header">
                <div class="item-name">${user.username}</div>
                <span class="status-badge ${user.role === 'admin' ? 'expired' : 'good'}">
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
                    <span>${new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="user-actions">
                ${user.username !== 'admin' ?
                    `<button class="btn btn-secondary btn-small" onclick="toggleUserRole('${user.username}')">${user.role === 'admin' ? '⬇️ Demote to User' : '⬆️ Promote to Admin'}</button>` :
                    `<button class="btn btn-secondary btn-small" disabled>Admin Role Locked</button>`}
                <button class="btn btn-primary btn-small" onclick="resetUserPassword('${user.username}')">🔐 Reset Password</button>
                ${user.username !== 'admin' ?
                    `<button class="btn btn-danger btn-small" onclick="removeUser('${user.username}')">🗑️ Remove</button>` :
                    `<button class="btn btn-secondary btn-small" disabled>Protected Account</button>`}
            </div>
        `;
        container.appendChild(userCard);
    });
}

// Initialize the user management page
function initializeUserManagement() {
    // Check authentication first
    const session = checkAuth();
    if (!session) return;

    currentSession = session;
    renderUsers();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', initializeUserManagement);