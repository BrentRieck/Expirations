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
    if (users.some(user => user.username === username)) {
        showMessage('A user with this username already exists', 'error');
        return;
    }
    
    // Add new user
    const newUser = {
        username: username,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('appUsers', JSON.stringify(users));
    
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
        localStorage.setItem('appUsers', JSON.stringify(users));
        
        // Refresh user list
        renderUsers();
    }
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
            ${user.username !== 'admin' ? 
                `<div class="office-actions">
                    <button class="btn btn-danger btn-small" onclick="removeUser('${user.username}')">🗑️ Remove</button>
                </div>` : 
                `<div class="office-actions">
                    <button class="btn btn-secondary btn-small" disabled>Protected Account</button>
                </div>`}
        `;
        container.appendChild(userCard);
    });
}

// Initialize the user management page
function initializeUserManagement() {
    // Check authentication first
    const session = checkAuth();
    if (!session) return;
    
    renderUsers();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', initializeUserManagement);