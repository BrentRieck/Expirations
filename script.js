// Medical Supply Items Database - Updated from user's list
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
    { stockNumber: '', name: 'SENSODYNE 2 OZ', category: 'topical', form: 'TN', packSize: '1', par: '1' },
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

// Initialize the application
let items = [];
let currentFilter = 'all';
let currentCategory = 'all';
let currentSearch = '';

// Load data from localStorage or initialize with default items
function initializeData() {
    const savedData = localStorage.getItem('medicalSupplyData');
    if (savedData) {
        items = JSON.parse(savedData);
    } else {
        items = medicalItems.map(item => ({
            ...item,
            expirationDate: null,
            id: generateId()
        }));
        saveData();
    }
    
    // Ensure all items have IDs (in case of older saved data)
    items = items.map(item => {
        if (!item.id) {
            return {
                ...item,
                id: generateId()
            };
        }
        return item;
    });
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('medicalSupplyData', JSON.stringify(items));
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

// Get item status
function getItemStatus(expirationDate) {
    if (!expirationDate) return 'no-date';
    const days = getDaysUntilExpiration(expirationDate);
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
        const status = getItemStatus(item.expirationDate);
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
            const status = getItemStatus(item.expirationDate);
            if (currentFilter !== status) {
                return false;
            }
        }

        return true;
    });

    // Use the global categories object

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
            const status = getItemStatus(item.expirationDate);
            const days = getDaysUntilExpiration(item.expirationDate);
            
            let daysText = '';
            if (item.expirationDate) {
                if (days < 0) {
                    daysText = `Expired ${Math.abs(days)} days ago`;
                } else if (days === 0) {
                    daysText = 'Expires today';
                } else if (days === 1) {
                    daysText = 'Expires tomorrow';
                } else {
                    daysText = `${days} days remaining`;
                }
            } else {
                daysText = 'No expiration date set';
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
                <input type="date" 
                       class="expiration-input" 
                       value="${item.expirationDate || ''}"
                       onchange="updateExpiration('${item.id}', this.value)">
                <div class="days-remaining ${status}">
                    ${daysText}
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
}

// Update expiration date
function updateExpiration(itemId, date) {
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.expirationDate = date || null;
        saveData();
        renderItems();
    }
}

// Export to CSV
function exportToCSV() {
    let csv = 'Stock Number,Item Name,Category,Form,Pack Size,Par,Expiration Date,Status,Days Until Expiration\n';
    
    items.forEach(item => {
        const status = getItemStatus(item.expirationDate);
        const days = getDaysUntilExpiration(item.expirationDate);
        csv += `"${item.stockNumber}","${item.name}","${item.category}","${item.form}","${item.packSize}","${item.par}","${item.expirationDate || ''}","${status}","${days !== null ? days : 'N/A'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-supplies-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

// Export to JSON
function exportToJSON() {
    const dataStr = JSON.stringify(items, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-supplies-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all expiration dates? This action cannot be undone.')) {
        items = medicalItems.map(item => ({
            ...item,
            expirationDate: null,
            id: generateId()
        }));
        saveData();
        renderItems();
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

// Set default active filter
document.querySelector('.filter-tag[data-filter="all"]').classList.add('active');

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

// Initialize app
initializeData();
populateCategorySelector();
renderItems();

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
        const input = card.querySelector('.expiration-input');
        if (input && input.getAttribute('onchange').includes(itemId)) {
            targetCard = card;
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

// Event listener for category selector
document.getElementById('categorySelector').addEventListener('change', (e) => {
    handleCategorySelection(e.target.value);
});

// Event listener for item selector
document.getElementById('itemSelector').addEventListener('change', (e) => {
    handleItemSelection(e.target.value);
});

// Initialize app
initializeData();
populateCategorySelector();
renderItems();
</script>
</body>
</html>