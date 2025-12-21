document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const svgGrid = document.querySelector('.svg-choice-place svg:nth-child(1)');
    const svgRows = document.querySelector('.svg-choice-place svg:nth-child(2)');
    const mainSection = document.querySelector('.main-choice-section');
    
    let currentView = 'square'; // Только квадратный вид по умолчанию
    let currentCategory = 'shkaf'; // Шкафы выбраны по умолчанию
    
    const allSquareCards = mainSection.querySelectorAll('.card-choice:not(.card-choice-gorizontal)');
    const allHorizontalCards = mainSection.querySelectorAll('.card-choice-gorizontal');
    
    const cardGroups = {
        'shkaf': {
            square: Array.from(allSquareCards).filter(card => !card.classList.contains('gost') && !card.classList.contains('gost-two')),
            horizontal: Array.from(allHorizontalCards).filter(card => !card.classList.contains('gost') && !card.classList.contains('gost-two'))
        },
        'prikhozhia': {
            square: Array.from(allSquareCards).filter(card => card.classList.contains('gost')),
            horizontal: Array.from(allHorizontalCards).filter(card => card.classList.contains('gost'))
        },
        'kukhni': {
            square: Array.from(allSquareCards).filter(card => card.classList.contains('gost-two')),
            horizontal: Array.from(allHorizontalCards).filter(card => card.classList.contains('gost-two'))
        }
    };
    
    function hideAllCards() {
        allSquareCards.forEach(card => card.style.display = 'none');
        allHorizontalCards.forEach(card => card.style.display = 'none');
    }
    
    function showCards(category, view) {
        hideAllCards(); // Сначала скрываем ВСЕ карточки
        
        const cardsToShow = cardGroups[category];
        
        if (cardsToShow) {
            if (view === 'square') {
                cardsToShow.square.forEach(card => {
                    card.style.display = 'block';
                });
            } else if (view === 'horizontal') {
                // Для горизонтального вида показываем только горизонтальные карточки
                cardsToShow.horizontal.forEach(card => {
                    card.style.display = 'flex';
                });
            }
        }
    }
    
    function updateView(view) {
        currentView = view;
        showCards(currentCategory, currentView);
        
        // Обновляем стили SVG
        if (view === 'square') {
            svgGrid.style.opacity = '1';
            svgRows.style.opacity = '0.5';
        } else if (view === 'horizontal') {
            svgGrid.style.opacity = '0.5';
            svgRows.style.opacity = '1';
        }
    }
    
    // Инициализация: скрываем все горизонтальные карточки по умолчанию
    allHorizontalCards.forEach(card => {
        card.style.display = 'none';
    });
    
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
                    
                    // Обновляем текущую категорию
                    if (link.textContent === 'Шкаф') currentCategory = 'shkaf';
                    if (link.textContent === 'Прихожии') currentCategory = 'prikhozhia';
                    if (link.textContent === 'Кухни') currentCategory = 'kukhni';
                    
                    // Всегда показываем квадратный вид при смене категории
                    currentView = 'square';
                    svgGrid.style.opacity = '1';
                    svgRows.style.opacity = '0.5';
                    
                    // Показываем карточки выбранной категории
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
    
    svgGrid.addEventListener('click', function() {
        updateView('square');
    });
    
    svgRows.addEventListener('click', function() {
        // Для категории "Шкафы" горизонтальные карточки будут показаны только при нажатии
        updateView('horizontal');
    });
    
    svgGrid.style.cursor = 'pointer';
    svgRows.style.cursor = 'pointer';
    svgGrid.style.opacity = '1';
    svgRows.style.opacity = '0.5';
    
    // Инициализация: показываем только шкафы в квадратном виде
    showCards(currentCategory, currentView);
});