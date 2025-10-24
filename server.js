const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

let defaultAdminCreated = false;

app.use(express.json());
app.use(express.static(__dirname));

async function ensureDataFile() {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
        await fs.access(USERS_FILE);
    } catch (error) {
        await fs.writeFile(USERS_FILE, '[]', 'utf8');
    }
}

async function loadUsers() {
    await ensureDataFile();
    let raw;

    try {
        raw = await fs.readFile(USERS_FILE, 'utf8');
    } catch (error) {
        raw = '[]';
    }

    let users;
    try {
        users = JSON.parse(raw);
        if (!Array.isArray(users)) {
            users = [];
        }
    } catch (error) {
        users = [];
    }

    if (!users.some(user => user.role === 'admin')) {
        const defaultAdmin = {
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        users.push(defaultAdmin);
        await saveUsers(users);
        defaultAdminCreated = true;
    }

    return users;
}

async function saveUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function sanitizeUser(user) {
    const { username, role, createdAt } = user;
    return { username, role, createdAt };
}

function findUser(users, username) {
    return users.find(user => user.username.toLowerCase() === username.toLowerCase());
}

function countAdmins(users) {
    return users.filter(user => user.role === 'admin').length;
}

function generatePassword() {
    return crypto.randomBytes(9).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
}

app.get('/api/setup-state', async (req, res) => {
    await loadUsers();
    const wasCreated = defaultAdminCreated;
    defaultAdminCreated = false;
    res.json({ defaultAdminCreated: wasCreated });
});

app.get('/api/users', async (req, res) => {
    const users = await loadUsers();
    res.json(users.map(sanitizeUser));
});

app.post('/api/users', async (req, res) => {
    const { username, password, role } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const users = await loadUsers();
    if (findUser(users, username)) {
        return res.status(409).json({ error: 'A user with this username already exists.' });
    }

    const newUser = {
        username,
        password,
        role: role === 'admin' ? 'admin' : 'user',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await saveUsers(users);

    res.status(201).json(sanitizeUser(newUser));
});

app.patch('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const { role, password } = req.body || {};

    if (!role && !password) {
        return res.status(400).json({ error: 'No updates were provided.' });
    }

    const users = await loadUsers();
    const user = findUser(users, username);

    if (!user) {
        return res.status(404).json({ error: `User "${username}" was not found.` });
    }

    if (role) {
        const normalizedRole = role === 'admin' ? 'admin' : 'user';

        if (user.role === 'admin' && normalizedRole !== 'admin' && countAdmins(users) <= 1) {
            return res.status(400).json({ error: 'At least one administrator account is required.' });
        }

        user.role = normalizedRole;
    }

    if (password) {
        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }
        user.password = password;
    }

    await saveUsers(users);
    res.json(sanitizeUser(user));
});

app.post('/api/users/:username/reset-password', async (req, res) => {
    const { username } = req.params;
    const users = await loadUsers();
    const user = findUser(users, username);

    if (!user) {
        return res.status(404).json({ error: `User "${username}" was not found.` });
    }

    if (user.username.toLowerCase() === 'admin') {
        return res.status(400).json({ error: 'The default admin password cannot be reset through this action.' });
    }

    const newPassword = generatePassword();
    user.password = newPassword;
    await saveUsers(users);

    res.json({ username: user.username, newPassword });
});

app.delete('/api/users/:username', async (req, res) => {
    const { username } = req.params;
    const users = await loadUsers();

    if (username.toLowerCase() === 'admin') {
        return res.status(400).json({ error: 'The default admin account cannot be removed.' });
    }

    const user = findUser(users, username);
    if (!user) {
        return res.status(404).json({ error: `User "${username}" was not found.` });
    }

    if (user.role === 'admin' && countAdmins(users) <= 1) {
        return res.status(400).json({ error: 'At least one administrator account is required.' });
    }

    const updatedUsers = users.filter(existing => existing.username.toLowerCase() !== username.toLowerCase());
    await saveUsers(updatedUsers);

    res.status(204).end();
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const users = await loadUsers();
    const user = findUser(users, username);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    res.json(sanitizeUser(user));
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const users = await loadUsers();
    if (findUser(users, username)) {
        return res.status(409).json({ error: 'A user with this username already exists.' });
    }

    const newUser = {
        username,
        password,
        role: 'user',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await saveUsers(users);

    res.status(201).json(sanitizeUser(newUser));
});

app.listen(PORT, () => {
    console.log(`Medical Supply Tracker server is running on http://localhost:${PORT}`);
});
