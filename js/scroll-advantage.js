
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[scrub-text]');
    
    elements.forEach((element) => {
        const words = element.textContent.split(' ');
        element.textContent = '';
        
        words.forEach((word) => {
            const wordSpan = document.createElement('span');
            const letters = word.split('');
            
            letters.forEach((letter) => {
                const letterSpan = document.createElement('span');
                letterSpan.textContent = letter;
                letterSpan.style.opacity = '0';
                
                wordSpan.appendChild(letterSpan);
            });
            
            wordSpan.innerHTML += ' ';
            element.appendChild(wordSpan);
        });
        
        gsap.fromTo(element.querySelectorAll('span span'), {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            ease: Linear.easeNone,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
                trigger: element,
                start: "top 100%",
                end: "bottom 80%",
                scrub: 2
            }
        });
    });
});
