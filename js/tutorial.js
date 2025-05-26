// Intersection Observer para animações no scroll
document.addEventListener('DOMContentLoaded', function() {

    // Observer para fade-in dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.sonodol-text-content, .sonodol-illustration-container, .sonodol-steps-section');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Efeito de hover nos cards de credibilidade
    const credibilityItems = document.querySelectorAll('.sonodol-credibility-item');
    credibilityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Efeito de hover nos step cards
    const stepCards = document.querySelectorAll('.sonodol-step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
            this.style.borderColor = 'rgba(64, 224, 208, 0.4)';
            this.style.boxShadow = '0 10px 20px rgba(64, 224, 208, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.borderColor = 'rgba(64, 224, 208, 0.2)';
            this.style.boxShadow = 'none';
        });
    });

    // Efeito parallax suave no fundo de estrelas
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const starsBackground = document.querySelector('.sonodol-stars-bg');

        if (starsBackground) {
            const rate = scrolled * -0.5;
            starsBackground.style.transform = `translateY(${rate}px)`;
        }
    });

    // Console log para debug
    console.log('SONODOL - Seção Como Usar carregada com sucesso!');
});

// Função para smooth scroll (caso queira usar em navegação)
function sonodolSmoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para detectar se elemento está visível
function sonodolIsElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para animar números (caso queira usar futuramente)
function sonodolAnimateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
