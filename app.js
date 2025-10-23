const medicalItems = [
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

// Category definitions
const categories = {
    'tablet-capsule': 'Tablet/Capsule',
    'topical': 'Topical',
    'ophthalmic': 'Ophthalmic',
    'liquids': 'Liquids',
    'nasal': 'Nasal',
    'respiratory': 'Respiratory',
    'insulin': 'Insulin',
    'emergency': 'Emergency Drug Box',
    'injectable': 'Injectable',
    'vaccine': 'Vaccine'
};

// Initialize the application
let items = [];
let currentFilter = 'all';
let currentCategory = 'all';
let currentSearch = '';
let currentOffice = null;
let offices = [];

// Check authentication
function checkAuth() {
    const session = JSON.parse(localStorage.getItem('userSession'));
    
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
    } else {
        userInfo.textContent = `Logged in as: ${session.username} (${session.role || 'user'})`;
    }
    
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

// Load offices from localStorage
function loadOffices() {
    const savedOffices = localStorage.getItem('medicalSupplyOffices');
    if (savedOffices) {
        offices = JSON.parse(savedOffices);
    } else {
        // Initialize with default office
        offices = [
            { 
                id: 'default', 
                name: 'MVHS New Hartford Medical Office', 
                items: medicalItems.map(item => ({
                    ...item,
                    expirationDates: [],
                    id: generateId()
                }))
            }
        ];
        saveOffices();
    }
}

// Save offices to localStorage
function saveOffices() {
    localStorage.setItem('medicalSupplyOffices', JSON.stringify(offices));
}

// Load data for current office
function loadOfficeData() {
    const currentOfficeId = localStorage.getItem('currentOfficeId') || 'default';
    
    // Find the current office
    currentOffice = offices.find(office => office.id === currentOfficeId);
    
    if (!currentOffice) {
        // If office not found, use default
        currentOffice = offices.find(office => office.id === 'default');
        if (!currentOffice) {
            // If no default office, create one
            currentOffice = {
                id: 'default',
                name: 'MVHS New Hartford Medical Office',
                items: medicalItems.map(item => ({
                    ...item,
                    expirationDates: [],
                    id: generateId()
                }))
            };
            offices.push(currentOffice);
            saveOffices();
        }
        localStorage.setItem('currentOfficeId', currentOffice.id);
    }
    
    // Migrate old item names to new ones
    if (currentOffice.items) {
        currentOffice.items.forEach(item => {
            if (item.name === 'SENSODYNE 2 OZ') {
                item.name = 'BENZOIN COMPOUND 2 OZ';
                item.stockNumber = '4089088';
            }
        });
        saveOffices();
    }
    
    // Update office header
    document.getElementById('officeName').textContent = currentOffice.name;
    
    items = currentOffice.items;
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save data to localStorage
function saveData() {
    // Update current office items
    currentOffice.items = items;
    
    // Find and update the office in the offices array
    const officeIndex = offices.findIndex(office => office.id === currentOffice.id);
    if (officeIndex !== -1) {
        offices[officeIndex] = currentOffice;
    } else {
        offices.push(currentOffice);
    }
    
    saveOffices();
}

// Calculate days until expiration
function getDaysUntilExpiration(expirationDate) {
    if (!expirationDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Get item status based on the earliest expiration date
function getItemStatus(expirationDates) {
    if (!expirationDates || expirationDates.length === 0) return 'no-date';
    
    // Find the earliest expiration date
    const earliestDate = expirationDates.reduce((earliest, current) => {
        const currentDays = getDaysUntilExpiration(current.date);
        const earliestDays = getDaysUntilExpiration(earliest.date);
        return currentDays < earliestDays ? current : earliest;
    });
    
    const days = getDaysUntilExpiration(earliestDate.date);
    if (days < 0) return 'expired';
    if (days <= 30) return 'expiring-soon';
    return 'good';
}

// Update statistics
function updateStats() {
    const total = items.length;
    let expired = 0;
    let expiringSoon = 0;
    let good = 0;

    items.forEach(item => {
        const status = getItemStatus(item.expirationDates);
        if (status === 'expired') expired++;
        else if (status === 'expiring-soon') expiringSoon++;
        else if (status === 'good') good++;
    });

    document.getElementById('totalItems').textContent = total;
    document.getElementById('expiredItems').textContent = expired;
    document.getElementById('expiringSoonItems').textContent = expiringSoon;
    document.getElementById('goodItems').textContent = good;
}

// Render items
function renderItems() {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';

    // Filter items
    let filteredItems = items.filter(item => {
        // Category filter
        if (currentCategory !== 'all' && item.category !== currentCategory) {
            return false;
        }

        // Search filter
        if (currentSearch) {
            const searchLower = currentSearch.toLowerCase();
            if (!item.name.toLowerCase().includes(searchLower) && 
                !item.stockNumber.toLowerCase().includes(searchLower)) {
                return false;
            }
        }

        // Status filter
        if (currentFilter !== 'all') {
            const status = getItemStatus(item.expirationDates);
            if (currentFilter !== status) {
                return false;
            }
        }

        return true;
    });

    // Group by category
    const categories = {
        'tablet-capsule': 'Tablet/Capsule',
        'topical': 'Topical',
        'ophthalmic': 'Ophthalmic',
        'liquids': 'Liquids',
        'nasal': 'Nasal',
        'respiratory': 'Respiratory',
        'insulin': 'Insulin',
        'emergency': 'Emergency Drug Box Meds',
        'injectable': 'Injectable',
        'vaccine': 'Vaccine',
        'miscellaneous': 'Miscellaneous',
        'seasonal-flu': 'Seasonal Flu'
    };

    const groupedItems = {};
    filteredItems.forEach(item => {
        if (!groupedItems[item.category]) {
            groupedItems[item.category] = [];
        }
        groupedItems[item.category].push(item);
    });

    // Render each category
    Object.keys(groupedItems).forEach(categoryKey => {
        const categoryItems = groupedItems[categoryKey];
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';

        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `
            <h2>${categories[categoryKey]}</h2>
            <span class="category-count">${categoryItems.length} items</span>
        `;
        categorySection.appendChild(categoryHeader);

        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'items-grid';

        categoryItems.forEach(item => {
            const status = getItemStatus(item.expirationDates);
            
            // Create expiration dates list
            let expirationDatesHTML = '';
            if (item.expirationDates && item.expirationDates.length > 0) {
                expirationDatesHTML = '<div class="expiration-dates-list">';
                item.expirationDates.forEach((exp, index) => {
                    const days = getDaysUntilExpiration(exp.date);
                    let daysText = '';
                    if (days !== null) {
                        if (days < 0) {
                            daysText = `Expired ${Math.abs(days)} days ago`;
                        } else if (days === 0) {
                            daysText = 'Expires today';
                        } else if (days === 1) {
                            daysText = 'Expires tomorrow';
                        } else {
                            daysText = `${days} days remaining`;
                        }
                    }
                    
                    const session = JSON.parse(localStorage.getItem('userSession'));
                    const removeButton = session && !session.readOnly ? 
                        `<button class="btn btn-danger btn-small" onclick="removeExpirationDate('${item.id}', ${index})">Remove</button>` : 
                        '';
                    
                    expirationDatesHTML += `
                        <div class="expiration-date-item">
                            <span class="exp-date">${exp.date}</span>
                            <span class="exp-days ${status}">${daysText}</span>
                            ${removeButton}
                        </div>
                    `;
                });
                expirationDatesHTML += '</div>';
            } else {
                expirationDatesHTML = '<div class="no-expiration-dates">No expiration dates set</div>';
            }

            const itemCard = document.createElement('div');
            itemCard.className = `item-card ${status}`;
            itemCard.innerHTML = `
                <div class="item-header">
                    <div class="item-name">${item.name}</div>
                    <span class="status-badge ${status}">
                        ${status === 'expired' ? '⚠️ Expired' : 
                          status === 'expiring-soon' ? '⏰ Soon' : 
                          status === 'good' ? '✓ Good' : '📅 No Date'}
                    </span>
                </div>
                <div class="item-details">
                    <div class="item-detail">
                        <label>Stock #:</label>
                        <span>${item.stockNumber || 'N/A'}</span>
                    </div>
                    <div class="item-detail">
                        <label>Form:</label>
                        <span>${item.form || 'N/A'}</span>
                    </div>
                    <div class="item-detail">
                        <label>Pack Size:</label>
                        <span>${item.packSize || 'N/A'}</span>
                    </div>
                    <div class="item-detail">
                        <label>Par:</label>
                        <span>${item.par || 'N/A'}</span>
                    </div>
                </div>
                ${expirationDatesHTML}
                <div class="add-expiration-section" id="add-section-${item.id}">
                    <div class="expiration-input-container">
                        <input type="date" class="expiration-input" id="exp-input-${item.id}">
                        <button class="btn btn-secondary btn-small scan-btn" onclick="scanQRCode('${item.id}')">📷 Scan</button>
                    </div>
                    <button class="btn btn-primary btn-small" onclick="addExpirationDate('${item.id}')">➕ Add Expiration Date</button>
                </div>
            `;
            itemsGrid.appendChild(itemCard);
        });

        categorySection.appendChild(itemsGrid);
        container.appendChild(categorySection);
    });

    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 4em; margin-bottom: 20px;">📦</div>
                <h3>No items found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
    }

    updateStats();
    
    // Disable editing controls if in read-only mode
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (session && session.readOnly) {
        // Disable all date inputs and add buttons
        document.querySelectorAll('.expiration-input').forEach(input => {
            input.disabled = true;
        });
        document.querySelectorAll('.add-expiration-section .btn-primary').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
        
        // Disable export and clear buttons
        const clearBtn = document.querySelector('button[onclick="clearAllData()"]');
        if (clearBtn) {
            clearBtn.disabled = true;
            clearBtn.style.opacity = '0.5';
            clearBtn.style.cursor = 'not-allowed';
        }
    }
}

// Add expiration date to an item
function addExpirationDate(itemId) {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (session && session.readOnly) {
        alert('You do not have permission to add expiration dates. Please login with an admin account.');
        return;
    }
    
    const item = items.find(i => i.id === itemId);
    if (item) {
        const dateInput = document.getElementById(`exp-input-${item.id}`);
        const dateValue = dateInput.value;
        
        if (!dateValue) {
            alert('Please select a date');
            return;
        }
        
        // Initialize expirationDates array if it doesn't exist
        if (!item.expirationDates) {
            item.expirationDates = [];
        }
        
        // Add new expiration date
        item.expirationDates.push({
            date: dateValue,
            id: generateId()
        });
        
        // Clear the input
        dateInput.value = '';
        
        saveData();
        renderItems();
    }
}

// Remove expiration date from an item
function removeExpirationDate(itemId, index) {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (session && session.readOnly) {
        alert('You do not have permission to remove expiration dates. Please login with an admin account.');
        return;
    }
    
    const item = items.find(i => i.id === itemId);
    if (item && item.expirationDates) {
        item.expirationDates.splice(index, 1);
        saveData();
        renderItems();
    }
}

// QR Code scanning functionality
function scanQRCode(itemId) {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (session && session.readOnly) {
        alert('You do not have permission to scan QR codes. Please login to use this feature.');
        return;
    }
    
    // Check if browser supports media devices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your browser does not support camera access. Please try a different browser.');
        return;
    }
    
    // Create modal for QR scanning
    const modal = document.createElement('div');
    modal.id = 'qrScannerModal';
    modal.className = 'qr-scanner-modal';
    modal.innerHTML = `
        <div class="qr-scanner-content">
            <div class="qr-scanner-header">
                <h2>Scan QR Code</h2>
                <button class="btn btn-danger btn-small" onclick="closeQRScanner()">✕</button>
            </div>
            <div class="qr-scanner-body">
                <video id="qrVideo" playsinline style="width: 100%; max-width: 400px; border: 2px solid #dee2e6; border-radius: 8px;"></video>
                <canvas id="qrCanvas" style="display: none;"></canvas>
                <div class="qr-scanner-instructions">
                    <p>Point your camera at the QR code on the medical supply item</p>
                </div>
                <div id="qrResult" class="qr-result"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Get video stream
    const video = document.getElementById('qrVideo');
    const canvas = document.getElementById('qrCanvas');
    const ctx = canvas.getContext('2d');
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            
            // Start scanning
            scanFrame(itemId, video, canvas, ctx);
        })
        .catch(err => {
            console.error("Camera access error:", err);
            alert('Could not access the camera. Please ensure you have granted camera permissions.');
            closeQRScanner();
        });
}

// Scan frame for QR code
function scanFrame(itemId, video, canvas, ctx) {
    if (document.getElementById('qrScannerModal')) {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Draw video frame to canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Get image data from canvas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // Try to decode QR code
            let code = null;
            if (typeof jsQR !== 'undefined') {
                code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: "dontInvert",
                });
            } else {
                console.error('jsQR library not loaded');
            }
            
            if (code) {
                // Successfully decoded QR code
                console.log('QR Code detected:', code.data);
                
                // Try to extract expiration date from QR code content
                const expirationDate = extractExpirationDate(code.data);
                
                if (expirationDate) {
                    document.getElementById('qrResult').innerHTML = `
                        <div class="scan-success">
                            <p>✅ QR Code Scanned Successfully!</p>
                            <p><strong>Expiration Date:</strong> ${expirationDate}</p>
                            <button class="btn btn-primary" onclick="useScannedDate('${itemId}', '${expirationDate}')">Use This Date</button>
                            <button class="btn btn-secondary" onclick="closeQRScanner()">Cancel</button>
                        </div>
                    `;
                    return; // Stop scanning
                } else {
                    document.getElementById('qrResult').innerHTML = `
                        <div class="scan-error">
                            <p>⚠️ QR Code Scanned!</p>
                            <p><strong>Content:</strong> ${code.data}</p>
                            <p>Could not extract expiration date from QR code.</p>
                            <p>Please enter the date manually or scan a different code.</p>
                            <button class="btn btn-secondary" onclick="closeQRScanner()">Close</button>
                        </div>
                    `;
                    return; // Stop scanning
                }
            }
        }
        
        // Continue scanning if modal is still open
        setTimeout(() => scanFrame(itemId, video, canvas, ctx), 100);
    }
}

// Extract expiration date from QR code content
function extractExpirationDate(qrContent) {
    // This function attempts to extract an expiration date from QR code content
    // In a real implementation, this would depend on the format of QR codes used by the medical supplies
    
    // Try common date formats
    const datePatterns = [
        /expir(ation|y)\s*date[:\s]*([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i,
        /([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4})/i,
        /([0-9]{4}[\/\-][0-9]{1,2}[\/\-][0-9]{1,2})/i
    ];
    
    for (const pattern of datePatterns) {
        const match = qrContent.match(pattern);
        if (match) {
            let dateStr = match[2] || match[1];
            
            // Try to parse the date
            let date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                // Try different date formats
                const parts = dateStr.split(/[-\/]/);
                if (parts.length === 3) {
                    // Try MM/DD/YYYY format
                    date = new Date(parts[2], parts[0] - 1, parts[1]);
                    if (isNaN(date.getTime())) {
                        // Try YYYY-MM-DD format
                        date = new Date(parts[0], parts[1] - 1, parts[2]);
                    }
                }
            }
            
            if (!isNaN(date.getTime())) {
                // Format as YYYY-MM-DD for input field
                return date.toISOString().split('T')[0];
            }
        }
    }
    
    return null;
}

// Use scanned date
function useScannedDate(itemId, date) {
    const dateInput = document.getElementById(`exp-input-${itemId}`);
    if (dateInput) {
        dateInput.value = date;
        closeQRScanner();
        addExpirationDate(itemId);
    }
}

// Close QR scanner
function closeQRScanner() {
    const modal = document.getElementById('qrScannerModal');
    if (modal) {
        // Stop video stream
        const video = document.getElementById('qrVideo');
        if (video && video.srcObject) {
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        modal.remove();
    }
}

// Export to CSV
function exportToCSV() {
    let csv = 'Stock Number,Item Name,Category,Form,Pack Size,Par,Expiration Dates,Status,Days Until Expiration\n';
    
    items.forEach(item => {
        const status = getItemStatus(item.expirationDates);
        const expDates = item.expirationDates ? item.expirationDates.map(exp => exp.date).join('; ') : '';
        const days = item.expirationDates && item.expirationDates.length > 0 ? 
            getDaysUntilExpiration(item.expirationDates[0].date) : 'N/A';
        csv += `"${item.stockNumber}","${item.name}","${item.category}","${item.form}","${item.packSize}","${item.par}","${expDates}","${status}","${days !== null ? days : 'N/A'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-supplies-${currentOffice.name.replace(/[^a-z0-9]/gi, '_')}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// Export to JSON
function exportToJSON() {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-supplies-${currentOffice.name.replace(/[^a-z0-9]/gi, '_')}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// Clear all data
function clearAllData() {
    const session = JSON.parse(localStorage.getItem('userSession'));
    if (session && session.readOnly) {
        alert('You do not have permission to clear data. Please login with an admin account.');
        return;
    }
    
    if (confirm('Are you sure you want to clear all expiration dates? This action cannot be undone.')) {
        items = medicalItems.map(item => ({
            ...item,
            expirationDates: [],
            id: generateId()
        }));
        saveData();
        renderItems();
    }
}

// Populate category selector dropdown
function populateCategorySelector() {
    const selector = document.getElementById('categorySelector');
    
    // Clear existing options except the first one
    selector.innerHTML = '<option value="">-- Select a category first --</option>';
    
    // Add category options
    Object.keys(categories).forEach(categoryKey => {
        const categoryItems = items.filter(item => item.category === categoryKey);
        
        if (categoryItems.length > 0) {
            const option = document.createElement('option');
            option.value = categoryKey;
            option.textContent = `${categories[categoryKey]} (${categoryItems.length} items)`;
            selector.appendChild(option);
        }
    });
}

// Populate item selector dropdown based on selected category
function populateItemSelector(selectedCategory) {
    const selector = document.getElementById('itemSelector');
    
    if (!selectedCategory) {
        selector.innerHTML = '<option value="">-- Select a category first --</option>';
        selector.disabled = true;
        return;
    }
    
    // Clear existing options
    selector.innerHTML = '<option value="">-- Select an item --</option>';
    selector.disabled = false;
    
    // Filter items by selected category and sort by name
    const categoryItems = items
        .filter(item => item.category === selectedCategory)
        .sort((a, b) => a.name.localeCompare(b.name));
    
    // Add item options
    categoryItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        selector.appendChild(option);
    });
}

// Handle category selection
function handleCategorySelection(categoryKey) {
    populateItemSelector(categoryKey);
    // Reset item selector
    document.getElementById('itemSelector').value = '';
}

// Handle item selection from dropdown
function handleItemSelection(itemId) {
    if (!itemId) return;
    
    // Find the item card in the DOM
    const itemCards = document.querySelectorAll('.item-card');
    let targetCard = null;
    
    itemCards.forEach(card => {
        // Find card with matching item ID
        const item = items.find(i => i.id === itemId);
        if (item) {
            const itemNameElement = card.querySelector('.item-name');
            if (itemNameElement && itemNameElement.textContent === item.name) {
                targetCard = card;
            }
        }
    });
    
    if (targetCard) {
        // Scroll to the item with smooth animation
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Highlight the card temporarily
        targetCard.style.transform = 'scale(1.05)';
        targetCard.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
        
        setTimeout(() => {
            targetCard.style.transform = '';
            targetCard.style.boxShadow = '';
        }, 2000);
        
        // Focus on the expiration date input
        const input = targetCard.querySelector('.expiration-input');
        if (input) {
            setTimeout(() => input.focus(), 500);
        }
    }
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderItems();
});

document.getElementById('categoryFilter').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    renderItems();
});

document.querySelectorAll('.filter-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        currentFilter = tag.dataset.filter;
        renderItems();
    });
});

// Event listener for category selector
document.getElementById('categorySelector').addEventListener('change', (e) => {
    handleCategorySelection(e.target.value);
});

// Event listener for item selector
document.getElementById('itemSelector').addEventListener('change', (e) => {
    handleItemSelection(e.target.value);
});

// Set default active filter
document.querySelector('.filter-tag[data-filter="all"]').classList.add('active');

// Initialize app
checkAuth(); // Check authentication first
loadOffices();
loadOfficeData();
populateCategorySelector();
renderItems();