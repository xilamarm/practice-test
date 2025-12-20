document.addEventListener('DOMContentLoaded', function() {
    const ourWorksSection = document.querySelector('.our-works');
    let animationTriggered = false;
    
    function isOurWorksInViewport() {
        if (!ourWorksSection) return false;
        
        const rect = ourWorksSection.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    function triggerSvgAnimation() {
        if (animationTriggered) return;
        
        const advantageSections = document.querySelectorAll('.card-advantages');
        
        advantageSections.forEach(section => {
            const svg = section.querySelector('svg');
            if (svg) {
                const animatedContainer = svg.querySelector('.animated-container');
                const diamond = svg.querySelector('.diamond');
                
                if (animatedContainer) {
                    animatedContainer.classList.add('animate');
                    

                    setTimeout(() => {
                        if (diamond) {
                            diamond.classList.add('animate');
                        }
                    }, 1500);
                }
            }
        });
        
        animationTriggered = true;
    }
    
    function checkAndTriggerAnimation() {
        if (isOurWorksInViewport()) {
            triggerSvgAnimation();
        }
    }
    
    if (ourWorksSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationTriggered) {
                    triggerSvgAnimation();
                    observer.unobserve(ourWorksSection);
                }
            });
        }, {
            threshold: 0.3 
        });
        
        observer.observe(ourWorksSection);
    } else {
        window.addEventListener('scroll', checkAndTriggerAnimation);

        checkAndTriggerAnimation();
    }
    window.addEventListener('resize', checkAndTriggerAnimation);
});


document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для модальных окон
    const modalElements = document.querySelectorAll('.modal');
    
    modalElements.forEach(function(modal) {
        modal.addEventListener('show.bs.modal', function(event) {
            // Принудительно устанавливаем стили
            this.style.zIndex = '99999';
            this.style.display = 'block';
            
            // Создаем backdrop если его нет
            let backdrop = document.querySelector('.modal-backdrop');
            if (!backdrop) {
                backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                backdrop.style.zIndex = '99998';
                document.body.appendChild(backdrop);
            }
            
            // Добавляем класс к body
            document.body.classList.add('modal-open');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0';
        });
        
        modal.addEventListener('hidden.bs.modal', function(event) {
            // Убираем backdrop
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            
            // Убираем классы
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        });
    });
});