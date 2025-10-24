const PUBLIC_OFFICES_KEY = 'medicalSupplyOffices_public';
const PUBLIC_CURRENT_OFFICE_KEY = 'currentOfficeId_public';
const LEGACY_OFFICES_KEY = 'medicalSupplyOffices';
const LEGACY_CURRENT_OFFICE_KEY = 'currentOfficeId';
const API_BASE = '/api';

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

async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('loginMessage');

    clearFormMessages();

    try {
        const user = await apiRequest('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        startUserSession(user);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

async function handleAdminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    const errorMessage = document.getElementById('adminMessage');

    clearFormMessages();

    try {
        const user = await apiRequest('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        if (user.role !== 'admin') {
            throw new Error('This account does not have administrator access.');
        }

        startUserSession(user);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

async function handleRegistration(event) {
    event.preventDefault();

    const username = document.getElementById('newUserUsername').value.trim();
    const password = document.getElementById('newUserPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('registerMessage');
    const successMessage = document.getElementById('registerSuccess');

    clearFormMessages();

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

    try {
        const user = await apiRequest('/register', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });

        successMessage.textContent = `Welcome, ${user.username}! Redirecting to your dashboard...`;
        successMessage.style.display = 'block';
        startUserSession(user);
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    }
}

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

    window.location.href = 'office-selector.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    migrateLegacyDataToPublic();

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => switchForm(button.dataset.target));
    });

    switchForm('loginPanel');

    try {
        const setupState = await apiRequest('/setup-state');
        if (setupState && setupState.defaultAdminCreated) {
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
    } catch (error) {
        console.error('Failed to retrieve setup state:', error);
    }
});
