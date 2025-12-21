document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const svgGrid = document.querySelector('.svg-choice-place svg:nth-child(1)');
    const svgRows = document.querySelector('.svg-choice-place svg:nth-child(2)');
    const mainSection = document.querySelector('.main-choice-section');
    
    let currentView = 'square';
    let currentCategory = 'shkaf';
    
    const cardGroups = {
        'shkaf': mainSection.querySelectorAll('.card-choice:not(.gost):not(.gost-two)'),
        'prikhozhia': mainSection.querySelectorAll('.gost'),
        'kukhni': mainSection.querySelectorAll('.gost-two')
    };
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-toggle');
        const dropdownItems = dropdown.querySelectorAll('.dropdown-items');
        const checkboxes = dropdown.querySelectorAll('.active');
        
        const isCategoryFilter = button.textContent.includes('Что хотите купить');
        const isSorting = button.textContent.includes('Сортировка');
        
        if (isSorting && checkboxes.length > 0) {
            checkboxes[0].checked = true;
            const firstText = dropdownItems[0].querySelector('.nav-text-all').textContent;
            button.textContent = 'Сортировка: ' + firstText;
        }
        
        if (isCategoryFilter && checkboxes.length > 0) {
            checkboxes[0].checked = true;
            const firstText = dropdownItems[0].querySelector('.nav-text-all').textContent;
            button.textContent = firstText;
        }
        
        dropdownItems.forEach(item => {
            const link = item.querySelector('.dropdown-item');
            const checkbox = item.querySelector('.active');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (isCategoryFilter) {
                    dropdown.querySelectorAll('.active').forEach(cb => {
                        cb.checked = false;
                    });
                    checkbox.checked = true;
                    button.textContent = link.textContent;
                    
                    if (link.textContent === 'Шкаф') currentCategory = 'shkaf';
                    if (link.textContent === 'Прихожии') currentCategory = 'prikhozhia';
                    if (link.textContent === 'Кухни') currentCategory = 'kukhni';
                    
                    showCards(currentCategory, currentView);
                } else {
                    dropdown.querySelectorAll('.active').forEach(cb => {
                        cb.checked = false;
                    });
                    checkbox.checked = true;
                    
                    if (isSorting) {
                        button.textContent = 'Сортировка: ' + link.textContent;
                    } else {
                        button.textContent = link.textContent;
                    }
                }
                
                const bootstrapDropdown = bootstrap.Dropdown.getInstance(button);
                if (bootstrapDropdown) {
                    bootstrapDropdown.hide();
                }
            });
            
            item.style.cursor = 'pointer';
            item.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    link.click();
                }
            });
        });
    });
    
    function showCards(category, view) {
        Object.values(cardGroups).forEach(group => {
            group.forEach(card => {
                card.style.display = 'none';
            });
        });
        
        if (cardGroups[category]) {
            cardGroups[category].forEach(card => {
                card.style.display = view === 'square' ? 'block' : 'flex';
                card.classList.toggle('col-8', view === 'horizontal');
                card.classList.toggle('col-4', view === 'square');
                
                if (view === 'horizontal') {
                    card.style.width = '100%';
                    card.style.maxWidth = '100%';
                } else {
                    card.style.width = '18rem';
                    card.style.maxWidth = '18rem';
                }
            });
        }
    }
    
    svgGrid.addEventListener('click', function() {
        currentView = 'square';
        svgGrid.style.opacity = '1';
        svgRows.style.opacity = '0.5';
        showCards(currentCategory, currentView);
    });
    
    svgRows.addEventListener('click', function() {
        currentView = 'horizontal';
        svgGrid.style.opacity = '0.5';
        svgRows.style.opacity = '1';
        showCards(currentCategory, currentView);
    });
    
    svgGrid.style.cursor = 'pointer';
    svgRows.style.cursor = 'pointer';
    svgGrid.style.opacity = '1';
    svgRows.style.opacity = '0.5';
    
    showCards(currentCategory, currentView);
});