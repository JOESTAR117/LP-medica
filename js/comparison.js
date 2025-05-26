// Intersection Observer para animações no scroll
document.addEventListener('DOMContentLoaded', function() {

    // Observer para fade-in dos elementos
    const sonodolComparisonObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sonodolComparisonObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Trigger counter animations if element has counters
                const counters = entry.target.querySelectorAll('.sonodol-comparison-counter');
                counters.forEach(counter => {
                    sonodolComparisonAnimateCounter(counter);
                });
            }
        });
    }, sonodolComparisonObserverOptions);

    // Observar elementos que devem animar
    const sonodolComparisonAnimatedElements = document.querySelectorAll('.sonodol-comparison-statistics, .sonodol-comparison-table-container, .sonodol-comparison-before-after, .sonodol-comparison-timeline');
    sonodolComparisonAnimatedElements.forEach(element => {
        sonodolComparisonObserver.observe(element);
    });

    // Animação de hover para cards
    const sonodolComparisonHoverCards = document.querySelectorAll('.sonodol-comparison-stat-item, .sonodol-comparison-testimonial-card, .sonodol-comparison-medical-testimonial');
    sonodolComparisonHoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de hover na tabela
    const sonodolComparisonTableRows = document.querySelectorAll('.sonodol-comparison-table-row');
    sonodolComparisonTableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 0, 0, 0.02)';
            this.style.transform = 'scale(1.01)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        row.addEventListener('mouseleave', function() {
            this.style.background = '';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });

    // CTA Button click effect
    const sonodolComparisonCtaButton = document.getElementById('sonodolComparisonCtaButton');
    if (sonodolComparisonCtaButton) {
        sonodolComparisonCtaButton.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Aqui você pode adicionar a lógica para redirecionar para a oferta
            console.log('SONODOL - Usuário clicou para trocar por SONODOL');

            // Exemplo de redirecionamento (descomente se necessário):
            // window.location.href = '#oferta';
        });
    }

    // Animação de warning box
    const sonodolComparisonWarningBox = document.querySelector('.sonodol-comparison-warning-box');
    if (sonodolComparisonWarningBox) {
        setInterval(() => {
            sonodolComparisonWarningBox.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.5)';
            setTimeout(() => {
                sonodolComparisonWarningBox.style.boxShadow = '';
            }, 1000);
        }, 5000);
    }

    // Console log para debug
    console.log('SONODOL - Seção de Comparação carregada com sucesso!');
});

// Função para animar números (contadores)
function sonodolComparisonAnimateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const start = 0;
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (target - start) + start);
        element.textContent = current;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target; // Garantir valor final correto
        }
    };

    window.requestAnimationFrame(step);
}

// Função para smooth scroll (caso queira usar em navegação)
function sonodolComparisonSmoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Função para detectar se elemento está visível
function sonodolComparisonIsElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para adicionar efeito de typewriter em textos (caso queira usar)
function sonodolComparisonTypewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;

    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

// Função para tracking de eventos (para analytics)
function sonodolComparisonTrackEvent(eventName, eventData = {}) {
    console.log('SONODOL Comparison - Event:', eventName, eventData);

    // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
    // Exemplo:
    // gtag('event', eventName, eventData);
    // fbq('track', eventName, eventData);
}

// Event listeners para tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    sonodolComparisonTrackEvent('comparison_section_viewed');

    // Track CTA clicks
    const ctaButton = document.getElementById('sonodolComparisonCtaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            sonodolComparisonTrackEvent('cta_comparison_clicked', {
                button_text: this.textContent,
                section: 'comparison'
            });
        });
    }

    // Track table interactions
    const tableRows = document.querySelectorAll('.sonodol-comparison-table-row');
    tableRows.forEach((row, index) => {
        row.addEventListener('mouseenter', function() {
            sonodolComparisonTrackEvent('comparison_row_hover', {
                row_index: index,
                criteria: row.querySelector('.sonodol-comparison-criteria')?.textContent
            });
        });
    });
});

// Função para destacar diferenças importantes
function sonodolComparisonHighlightDifferences() {
    const negativeElements = document.querySelectorAll('.sonodol-comparison-controlled-cell');

    negativeElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(239, 68, 68, 0.2)';
            this.style.border = '2px solid var(--sonodol-comparison-red)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.background = 'var(--sonodol-comparison-red-light)';
            this.style.border = '';
        });
    });
}

// Inicializar highlighting quando página carrega
document.addEventListener('DOMContentLoaded', sonodolComparisonHighlightDifferences);

// Função para criar efeito de "piscar" em elementos importantes
function sonodolComparisonBlinkElement(element, times = 3) {
    let count = 0;
    const originalOpacity = element.style.opacity || '1';

    const blinkInterval = setInterval(() => {
        element.style.opacity = element.style.opacity === '0.5' ? originalOpacity : '0.5';
        count++;

        if (count >= times * 2) {
            clearInterval(blinkInterval);
            element.style.opacity = originalOpacity;
        }
    }, 300);
}

// Auto-destacar elementos críticos após 5 segundos
setTimeout(() => {
    const criticalElements = document.querySelectorAll('.sonodol-comparison-icon-negative');
    criticalElements.forEach((element, index) => {
        setTimeout(() => {
            sonodolComparisonBlinkElement(element.parentElement, 2);
        }, index * 500);
    });
}, 5000);
