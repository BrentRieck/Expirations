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

function getStorageNamespace() {
    const session = getSession();
    if (!session || session.readOnly) {
        return 'public';
    }
    return session.username;
}

function getOfficesStorageKey() {
    const namespace = getStorageNamespace();
    return namespace === 'public'
        ? 'medicalSupplyOffices_public'
        : `medicalSupplyOffices_${namespace}`;
}

function getCurrentOfficeStorageKey() {
    const namespace = getStorageNamespace();
    return namespace === 'public'
        ? 'currentOfficeId_public'
        : `currentOfficeId_${namespace}`;
}

function getStoredOffices() {
    const officesData = localStorage.getItem(getOfficesStorageKey());
    if (!officesData) {
        return null;
    }

    try {
        const parsed = JSON.parse(officesData);
        return Array.isArray(parsed) ? parsed : null;
    } catch (error) {
        console.error('Failed to parse stored offices from localStorage:', error);
        return null;
    }
}

let offices = [];

function migrateLegacyDataIfNeeded() {
    const namespace = getStorageNamespace();
    const officesKey = getOfficesStorageKey();
    const currentOfficeKey = getCurrentOfficeStorageKey();

    if (!localStorage.getItem(officesKey)) {
        if (namespace !== 'public') {
            const legacyUserKey = `medicalSupplyOffices_${namespace}`;
            const legacyUserData = localStorage.getItem(legacyUserKey);
            if (legacyUserData) {
                localStorage.setItem(officesKey, legacyUserData);
            } else {
                const legacySharedData = localStorage.getItem('medicalSupplyOffices');
                const publicData = localStorage.getItem('medicalSupplyOffices_public');
                if (legacySharedData) {
                    localStorage.setItem(officesKey, legacySharedData);
                } else if (publicData) {
                    localStorage.setItem(officesKey, publicData);
                }
            }
        } else {
            const legacySharedData = localStorage.getItem('medicalSupplyOffices');
            if (legacySharedData) {
                localStorage.setItem(officesKey, legacySharedData);
            }
        }
    }

    if (!localStorage.getItem(currentOfficeKey)) {
        const legacyCurrent = localStorage.getItem('currentOfficeId');
        const publicCurrent = localStorage.getItem('currentOfficeId_public');
        const fallback = legacyCurrent || publicCurrent || 'default';
        localStorage.setItem(currentOfficeKey, fallback);
    }
}

function ensureOfficesLoaded() {
    migrateLegacyDataIfNeeded();
    const stored = getStoredOffices();

    if (stored && stored.length > 0) {
        offices = stored;
    } else {
        offices = [createDefaultOffice()];
        saveOffices();
    }
}

// Save offices to localStorage
function saveOffices() {
    localStorage.setItem(getOfficesStorageKey(), JSON.stringify(offices));
}

function getMedicalItemsTemplate() {
    return [
        // TABLET/CAPSULE
        { stockNumber: '4085010', name: 'ACETAMINOPHEN 325 MG TABLET/CAP', category: 'tablet-capsule', form: 'CL', packSize: '1', par: '4' },
        { stockNumber: '4085117', name: 'ASPIRIN 81 MG CHEWABLE', category: 'tablet-capsule', form: 'CW', packSize: '1', par: '4' },
        { stockNumber: '4085114', name: 'ASPIRIN EC 325 MG TABLET/CAP', category: 'tablet-capsule', form: 'TB', packSize: '1', par: '2' },
        { stockNumber: '4085353', name: 'CLONIDINE 0.1 MG', category: 'tablet-capsule', form: 'TB', packSize: '1', par: '4' },
        { stockNumber: '4085755', name: 'IBUPROFEN 200MG', category: 'tablet-capsule', form: 'TB', packSize: '1', par: '2' },
        { stockNumber: '4085998', name: 'METOPROLOL TARTRATE 50 MG', category: 'tablet-capsule', form: 'TB', packSize: '1', par: '4' },
        { stockNumber: '4086147', name: 'ONDANSETRON ODT 4 MG', category: 'tablet-capsule', form: 'TB', packSize: '1', par: '4' },

        // TOPICAL
        { stockNumber: '4089088', name: 'BENZOIN COMPOUND 2 OZ', category: 'topical', form: 'TN', packSize: '1', par: '1' },
        { stockNumber: '4080435', name: 'ETHYL CHLORIDE MD STREAM', category: 'topical', form: 'SP', packSize: '1', par: '1' },
        { stockNumber: '4080590', name: 'IMEDIHONEY', category: 'topical', form: 'GEL', packSize: '1', par: '1' },
        { stockNumber: '4080817', name: 'SILVER SULFADIAZINE 1% 25 GM', category: 'topical', form: 'CR', packSize: '1', par: '1' },
        { stockNumber: '4086439', name: 'SILVER NITRATE APPLICATOR', category: 'topical', form: 'ST', packSize: '10', par: '2' },

        // OPHTHALMIC
        { stockNumber: '4080464', name: 'EYE WASH 40z', category: 'ophthalmic', form: 'SL', packSize: '1', par: '2' },
        { stockNumber: '4085645', name: 'FLUORESCEIN OPHTH STRIPS', category: 'ophthalmic', form: 'SI', packSize: '1', par: '10' },

        // LIQUIDS
        { stockNumber: '4081137', name: 'ACETAMINOPHEN 160MG/5ML UD CUPS', category: 'liquids', form: 'SS', packSize: '1', par: '3' },
        { stockNumber: '4081142', name: 'DIPHENHYDRAMINE 12.5MG/5ML UD CUP', category: 'liquids', form: 'LQ', packSize: '1', par: '3' },
        { stockNumber: '4081145', name: 'IBUPROFEN 100MG/5 ML UD CUPS', category: 'liquids', form: 'SS', packSize: '1', par: '3' },
        { stockNumber: '4080561', name: 'LIDOCAINE 2% VISCOUS UD CUPS', category: 'liquids', form: 'LQ', packSize: '1', par: '2' },
        { stockNumber: '4080972', name: 'MAALOX PLUS UD CUPS', category: 'liquids', form: 'LQ', packSize: '1', par: '2' },

        // NASAL
        { stockNumber: '4089346', name: 'NASAL EPINEPHRINE 10 ML', category: 'nasal', form: 'LQ', packSize: '1', par: '1' },

        // RESPIRATORY
        { stockNumber: '4080892', name: 'ALBUTEROL SULF 0.083% 3 ML', category: 'respiratory', form: 'SL', packSize: '1', par: '5' },
        { stockNumber: '4080903', name: 'ALBUTEROL/IPRATROPIUM 2.5-0.5 MG/3 ML', category: 'respiratory', form: 'AM', packSize: '1', par: '5' },
        { stockNumber: '4081245', name: 'SODIUM CHLORIDE 0.9% 5 ML', category: 'respiratory', form: 'AM', packSize: '1', par: '10' },

        // INSULIN
        { stockNumber: '4080902', name: 'HUMULIN R 100 U/ML 3 ML', category: 'insulin', form: 'MD', packSize: '1', par: '1' },

        // EMERGENCY DRUG BOX MEDS
        { stockNumber: '4085117-E', name: 'ASPIRIN 81 MG CHEWABLE (Emergency Drug Box)', category: 'emergency', form: 'CW', packSize: '1', par: '4' },
        { stockNumber: '4080111', name: 'DIPHENHYDRAMINE 50 MG/ML 1 ML VIAL', category: 'emergency', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '4085541', name: 'EPIPEN AUTO-INJECTOR 0.3 MG', category: 'emergency', form: 'SY', packSize: '1', par: '2' },
        { stockNumber: '4085540', name: 'EPIPEN JR AUTO-INJECTOR 0.15 MG', category: 'emergency', form: 'SY', packSize: '1', par: '2' },
        { stockNumber: '4085696', name: 'GLUCAGEN 1MG POWDER VIAL', category: 'emergency', form: 'VIAL', packSize: '1', par: '1' },
        { stockNumber: '4085982', name: 'METHYLPREDNISOLONE SOD SUCC 125 MG', category: 'emergency', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '4082007', name: 'NALOXONE 4MG NASAL SPRAY', category: 'emergency', form: 'SPIN', packSize: '1', par: '2' },
        { stockNumber: '4086707', name: 'NITROGLYCERIN 0.4 MG', category: 'emergency', form: 'TB', packSize: 'BTL/25', par: '1' },
        { stockNumber: '4083166', name: 'ORAL GLUCOSE GEL', category: 'emergency', form: 'GEL', packSize: '1', par: '2' },

        // INJECTABLE
        { stockNumber: '', name: 'CEFTRIAXONE 500MG IM/IV', category: 'injectable', form: 'SD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'CEFTRIAXONE 1GM IM/IV', category: 'injectable', form: 'SD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'CYANOCOBALAMIN 1000MCG/ML', category: 'injectable', form: 'SD', packSize: '1', par: '12' },
        { stockNumber: '', name: 'DEXAMETHASONE 4MG/ML 1ML', category: 'injectable', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'KENALOG 10MG/ML 1ML', category: 'injectable', form: 'MD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'KENALOG 40MG/ML 1ML', category: 'injectable', form: 'SD', packSize: '1', par: '10' },
        { stockNumber: '', name: 'KETOROLAC 30MG/ML 1ML', category: 'injectable', form: 'SD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'LIDOCAINE 1% 20ML', category: 'injectable', form: 'MD', packSize: '1', par: '4' },
        { stockNumber: '', name: 'LIDOCAINE 2% 20ML', category: 'injectable', form: 'MD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'LIDOCAINE/EPI 1:100K 1% 20ML', category: 'injectable', form: 'MD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'LIDOCAINE/EPI 1:100K 2% 20ML', category: 'injectable', form: 'MD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'MEDROXYPROGESTERONE 150MG/ML', category: 'injectable', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'METHYLPREDNISOLONE SOD SUCC 40MG', category: 'injectable', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'ONDANSETRON 2MG/ML 2ML', category: 'injectable', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'SODIUM CHLORIDE 0.9% 10ML', category: 'injectable', form: 'SD', packSize: '1', par: '10' },
        { stockNumber: '', name: 'WATER STERILE 10ML', category: 'injectable', form: 'SD', packSize: '1', par: '4' },

        // VACCINE
        { stockNumber: '', name: 'DIPHTHERIA/TETANUS/ACELLULAR PERTUSSIS (DAPTACEL)', category: 'vaccine', form: 'SF', packSize: '1', par: '1' },
        { stockNumber: '', name: 'DTaP-IPV-Hib HepB (VAXELIS)', category: 'vaccine', form: 'SD', packSize: '1', par: '10' },
        { stockNumber: '', name: 'DTaP-IPV (KINRIX)', category: 'vaccine', form: 'SDV', packSize: '1', par: '5' },
        { stockNumber: '', name: 'HAEMOPHILUS b CONJUGATE (ACTHIB)', category: 'vaccine', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'HEPATITIS A 6 U/ML ADULT (HAVRIX)', category: 'vaccine', form: 'SD', packSize: '1', par: '5' },
        { stockNumber: '', name: 'HEPATITIS A 25 U/ML PEDIATRIC (VAQTA)', category: 'vaccine', form: 'SD', packSize: '1', par: '10' },
        { stockNumber: '', name: 'HEPATITIS B 5MCG (RECOMBIVAX)', category: 'vaccine', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'HEPATITIS B 20MCG/ML ADULT (ENGERIX-B)', category: 'vaccine', form: 'SD', packSize: '1', par: '4' },
        { stockNumber: '', name: 'MEASLES/MUMPS/RUBELLA (MMR)', category: 'vaccine', form: 'SD', packSize: '1', par: '5' },
        { stockNumber: '', name: 'MENINGOCOCCAL ACWY (MENVEO)', category: 'vaccine', form: 'SD', packSize: '1', par: '10' },
        { stockNumber: '', name: 'MENINGOCOCCAL A/C/W/Y (PENBRAYA)', category: 'vaccine', form: 'SD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'MENINGOCOCCAL GROUP B (TRUMENBA)', category: 'vaccine', form: 'SD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'NIRSERUMAB-ALIP 50MG/0.5ML (BEYFORTUS)', category: 'vaccine', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'NIRSERUMAB-ALIP 100MG/0.5ML (BEYFORTUS)', category: 'vaccine', form: 'SD', packSize: '1', par: '1' },
        { stockNumber: '', name: 'PAPILLOMAVIRUS 9HPV (GARDASIL 9)', category: 'vaccine', form: 'SF', packSize: '1', par: '10' },
        { stockNumber: '', name: 'PNEUMOCOCCAL CONJUGATE 20 VALENT (PREVNAR 20)', category: 'vaccine', form: 'SD', packSize: '1', par: '30' },
        { stockNumber: '', name: 'ROTAVIRUS (ROTATEQ)', category: 'vaccine', form: 'SS', packSize: '1', par: '10' },
        { stockNumber: '', name: 'RSV ADULT (ABRYSVO)', category: 'vaccine', form: 'SD', packSize: '1', par: '2' },
        { stockNumber: '', name: 'TETANUS/DIPHTHERIA/ACELLULAR PERTUSSIS (ADACEL)', category: 'vaccine', form: 'SD', packSize: '1', par: '30' },
        { stockNumber: '', name: 'TUBERCULIN SC (TUBERSOL)', category: 'vaccine', form: 'MD', packSize: '10dose/vial', par: '2' },
        { stockNumber: '', name: 'MMR & VARICELLA (PROQUAD)', category: 'vaccine', form: 'SD', packSize: '10', par: '2' },
        { stockNumber: '', name: 'VARICELLA (VARIVAX)', category: 'vaccine', form: 'SD', packSize: '10', par: '2' },
        { stockNumber: '', name: 'VARICELLA-ZOSTER GSK (SHINGRIX)', category: 'vaccine', form: 'SD', packSize: '1', par: '10' },
        { stockNumber: '', name: 'COVID VACCINE', category: 'vaccine', form: 'SD', packSize: '1', par: '15' }
    ];
}

function createDefaultOffice(name = 'MVHS New Hartford Medical Office') {
    return {
        id: 'default',
        name,
        items: getMedicalItemsTemplate().map(item => ({
            ...item,
            expirationDates: [],
            id: generateId()
        }))
    };
}

// Add a new office
function addOffice() {
    const officeNameInput = document.getElementById('officeName');
    const officeName = officeNameInput.value.trim();
    
    if (!officeName) {
        alert('Please enter an office name');
        return;
    }
    
    // Check if office already exists
    if (offices.some(office => office.name.toLowerCase() === officeName.toLowerCase())) {
        alert('An office with this name already exists');
        return;
    }
    
    // Add new office with all medical items
    const medicalItems = getMedicalItemsTemplate();

    const newOffice = {
        id: generateOfficeId(),
        name: officeName,
        items: medicalItems.map(item => ({
            ...item,
            expirationDates: [],
            id: generateId()
        }))
    };
    
    offices.push(newOffice);
    saveOffices();
    renderOffices();
    officeNameInput.value = '';
}

// Generate unique office ID
function generateOfficeId() {
    return 'office_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Generate unique item ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Remove an office
function removeOffice(officeId) {
    if (offices.length <= 1) {
        alert('You must have at least one office location');
        return;
    }
    
    if (confirm('Are you sure you want to remove this office and all its data?')) {
        offices = offices.filter(office => office.id !== officeId);
        saveOffices();
        renderOffices();
    }
}

// Navigate to office tracking page
function goToOffice(officeId) {
    localStorage.setItem(getCurrentOfficeStorageKey(), officeId);
    window.location.href = 'index.html';
}

// Render offices
function renderOffices() {
    const container = document.getElementById('officesContainer');
    container.innerHTML = '';
    
    if (offices.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 4em; margin-bottom: 20px;">🏢</div>
                <h3>No offices found</h3>
                <p>Add your first office location to get started</p>
            </div>
        `;
        return;
    }
    
    offices.forEach(office => {
        const officeCard = document.createElement('div');
        officeCard.className = 'office-card';
        officeCard.innerHTML = `
            <div class="item-header">
                <div class="item-name">${office.name}</div>
            </div>
            <div class="item-details">
                <div class="item-detail">
                    <label>Office ID:</label>
                    <span>${office.id}</span>
                </div>
                <div class="item-detail">
                    <label>Items Tracked:</label>
                    <span>${office.items.length}</span>
                </div>
            </div>
            <div class="office-actions">
                <button class="btn btn-primary btn-small" onclick="goToOffice('${office.id}')">📋 Manage Items</button>
                <button class="btn btn-danger btn-small" onclick="removeOffice('${office.id}')">🗑️ Remove</button>
            </div>
        `;
        container.appendChild(officeCard);
    });
}

// Check authentication
function checkAuth() {
    const session = getSession();
    
    if (!session) {
        // No session, redirect to login
        window.location.href = 'login.html';
        return false;
    }
    
    // Update user info
    const userInfo = document.getElementById('userInfo');
    if (session.readOnly) {
        userInfo.textContent = `Logged in as: ${session.username} (Read-Only)`;
        document.getElementById('readOnlyBanner').style.display = 'block';
        
        // Disable add office functionality
        document.getElementById('officeName').disabled = true;
        document.querySelector('.btn-primary').disabled = true;
        document.querySelector('.btn-primary').style.opacity = '0.5';
        document.querySelector('.btn-primary').style.cursor = 'not-allowed';
    } else {
        userInfo.textContent = `Logged in as: ${session.username} (${session.role || 'user'})`;
        
        // Show admin link if user is admin
        if (session.role === 'admin') {
            document.getElementById('adminLink').style.display = 'block';
        }
    }
    
    return session;
}

// Logout function
function logout() {
    localStorage.removeItem('userSession');
    window.location.href = 'login.html';
}

// Navigate to user management
function goToUserManagement() {
    window.location.href = 'user-management.html';
}

// Override add office to check permissions
const originalAddOffice = addOffice;
addOffice = function() {
    const session = getSession();
    if (session && session.readOnly) {
        alert('You do not have permission to add offices. Please login with an admin account.');
        return;
    }
    originalAddOffice();
};

// Override remove office to check permissions
const originalRemoveOffice = removeOffice;
removeOffice = function(officeId) {
    const session = getSession();
    if (session && session.readOnly) {
        alert('You do not have permission to remove offices. Please login with an admin account.');
        return;
    }
    originalRemoveOffice(officeId);
};

// Initialize the office selector
function initializeOfficeSelector() {
    // Check authentication first
    const session = checkAuth();
    if (!session) return;

    ensureOfficesLoaded();
    renderOffices();

    // Add event listener for Enter key in office name input
    document.getElementById('officeName').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addOffice();
        }
    });
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', initializeOfficeSelector);