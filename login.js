// Initialize default admin account if none exists
function initializeDefaultAdmin() {
    const users = JSON.parse(localStorage.getItem('appUsers'));
    
    if (!users || users.length === 0) {
        // Initialize with default admin account
        const defaultUsers = [{
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString()
        }];
        localStorage.setItem('appUsers', JSON.stringify(defaultUsers));
        return true;
    }
    return false;
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Clear previous error
    errorMessage.style.display = 'none';
    
    // Initialize default admin if needed
    initializeDefaultAdmin();
    
    // Get all users
    const users = JSON.parse(localStorage.getItem('appUsers')) || [];
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Successful login
        const session = {
            username: user.username,
            role: user.role || 'user',
            loggedIn: true,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('userSession', JSON.stringify(session));
        
        // Redirect based on role
        if (user.role === 'admin') {
            window.location.href = 'user-management.html';
        } else {
            window.location.href = 'office-selector.html';
        }
    } else {
        // Failed login
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
}

// View as guest (read-only mode)
function viewAsGuest() {
    const session = {
        username: 'guest',
        role: 'guest',
        loggedIn: false,
        readOnly: true,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem('userSession', JSON.stringify(session));
    
    // Redirect to office selector
    window.location.href = 'office-selector.html';
}

// Check if account exists on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize default admin if needed
    const isNewInstall = initializeDefaultAdmin();
    
    if (isNewInstall) {
        // Show info about default credentials
        const loginInfo = document.createElement('div');
        loginInfo.className = 'login-info';
        loginInfo.innerHTML = `
            <h3>Default Admin Credentials</h3>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
            <p class="info-note">⚠️ Please change these credentials after first login</p>
        `;
        document.querySelector('.login-container').appendChild(loginInfo);
    }
});