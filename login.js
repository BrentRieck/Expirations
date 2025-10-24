const USERS_STORAGE_KEY = 'appUsers';
const LEGACY_OFFICES_KEY = 'medicalSupplyOffices';
const LEGACY_CURRENT_OFFICE_KEY = 'currentOfficeId';
const PUBLIC_OFFICES_KEY = 'medicalSupplyOffices_public';
const PUBLIC_CURRENT_OFFICE_KEY = 'currentOfficeId_public';

function getStoredUsers() {
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersData) {
        return [];
    }

    try {
        const parsed = JSON.parse(usersData);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Failed to parse stored users from localStorage:', error);
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getUserOfficesKey(username) {
    return `medicalSupplyOffices_${username}`;
}

function getUserCurrentOfficeKey(username) {
    return `currentOfficeId_${username}`;
}

function migrateLegacyDataToPublic() {
    const legacyOffices = localStorage.getItem(LEGACY_OFFICES_KEY);
    if (legacyOffices && !localStorage.getItem(PUBLIC_OFFICES_KEY)) {
        localStorage.setItem(PUBLIC_OFFICES_KEY, legacyOffices);
    }

    const legacyCurrentOffice = localStorage.getItem(LEGACY_CURRENT_OFFICE_KEY);
    if (legacyCurrentOffice && !localStorage.getItem(PUBLIC_CURRENT_OFFICE_KEY)) {
        localStorage.setItem(PUBLIC_CURRENT_OFFICE_KEY, legacyCurrentOffice);
    }
}

function ensureUserDataInitialized(username) {
    if (!username) {
        return;
    }

    const userOfficesKey = getUserOfficesKey(username);
    if (!localStorage.getItem(userOfficesKey)) {
        const legacyData = localStorage.getItem(LEGACY_OFFICES_KEY);
        if (legacyData) {
            localStorage.setItem(userOfficesKey, legacyData);
        } else {
            const publicData = localStorage.getItem(PUBLIC_OFFICES_KEY);
            if (publicData) {
                localStorage.setItem(userOfficesKey, publicData);
            }
        }
    }

    const currentOfficeKey = getUserCurrentOfficeKey(username);
    if (!localStorage.getItem(currentOfficeKey)) {
        const legacyCurrent = localStorage.getItem(LEGACY_CURRENT_OFFICE_KEY);
        const publicCurrent = localStorage.getItem(PUBLIC_CURRENT_OFFICE_KEY);
        const fallback = legacyCurrent || publicCurrent || 'default';
        localStorage.setItem(currentOfficeKey, fallback);
    }
}

// Initialize default admin account if none exists
function initializeDefaultAdmin() {
    const users = getStoredUsers();

    if (users.some(user => user.role === 'admin')) {
        return false;
    }

    const defaultAdmin = {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
    };

    users.push(defaultAdmin);
    saveUsers(users);
    return true;
}

function clearFormMessages() {
    const messageIds = ['loginMessage', 'adminMessage', 'registerMessage', 'registerSuccess'];
    messageIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = 'none';
            element.textContent = '';
        }
    });
}

function switchForm(targetId) {
    document.querySelectorAll('.form-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === targetId);
    });

    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.toggle('active', button.dataset.target === targetId);
    });

    clearFormMessages();

    const activePanel = document.getElementById(targetId);
    if (activePanel) {
        const firstInput = activePanel.querySelector('input');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

function startUserSession(user) {
    const session = {
        username: user.username,
        role: user.role || 'user',
        loggedIn: true,
        readOnly: false,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('userSession', JSON.stringify(session));
    ensureUserDataInitialized(user.username);

    if (user.role === 'admin') {
        window.location.href = 'user-management.html';
    } else {
        window.location.href = 'office-selector.html';
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('loginMessage');

    clearFormMessages();

    // Initialize default admin if needed
    initializeDefaultAdmin();

    // Get all users
    const users = getStoredUsers();

    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        startUserSession(user);
    } else {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.display = 'block';
    }
}

function handleAdminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    const errorMessage = document.getElementById('adminMessage');

    clearFormMessages();
    initializeDefaultAdmin();

    const users = getStoredUsers();
    const adminUser = users.find(user => user.username === username && user.password === password && user.role === 'admin');

    if (adminUser) {
        startUserSession(adminUser);
    } else {
        errorMessage.textContent = 'Invalid admin credentials';
        errorMessage.style.display = 'block';
    }
}

function handleRegistration(event) {
    event.preventDefault();

    const username = document.getElementById('newUserUsername').value.trim();
    const password = document.getElementById('newUserPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('registerMessage');
    const successMessage = document.getElementById('registerSuccess');

    clearFormMessages();
    initializeDefaultAdmin();

    if (!username) {
        errorMessage.textContent = 'Please choose a username.';
        errorMessage.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        errorMessage.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    const users = getStoredUsers();
    const usernameTaken = users.some(user => user.username.toLowerCase() === username.toLowerCase());

    if (usernameTaken) {
        errorMessage.textContent = 'A user with this username already exists.';
        errorMessage.style.display = 'block';
        return;
    }

    const newUser = {
        username,
        password,
        role: 'user',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    successMessage.textContent = `Welcome, ${username}! Redirecting to your dashboard...`;
    successMessage.style.display = 'block';

    startUserSession(newUser);
}

// View as guest (read-only mode)
function viewAsGuest() {
    migrateLegacyDataToPublic();

    if (!localStorage.getItem(PUBLIC_CURRENT_OFFICE_KEY)) {
        localStorage.setItem(PUBLIC_CURRENT_OFFICE_KEY, 'default');
    }

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

// Initialize form toggles and default admin on page load
document.addEventListener('DOMContentLoaded', function() {
    migrateLegacyDataToPublic();
    const isNewInstall = initializeDefaultAdmin();

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => switchForm(button.dataset.target));
    });

    switchForm('loginPanel');

    if (isNewInstall) {
        // Show info about default credentials
        const loginInfo = document.createElement('div');
        loginInfo.className = 'login-info';
        loginInfo.innerHTML = `
            <h3>Default Admin Credentials</h3>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> admin123</p>
            <p class="info-note">⚠️ Please change these credentials after first login.</p>
            <p class="info-note">Use the Admin Login tab to access the management console.</p>
        `;
        document.querySelector('.login-container').appendChild(loginInfo);
    }
});
