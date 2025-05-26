
// Sonodol - Main JavaScript File
// Sistema completo de landing page com analytics e conversões

// Configurações globais
const CONFIG = {
    PHONE_NUMBER: "5511983415469",
    WHATSAPP_MESSAGE: "Olá! Tenho dúvidas sobre o Sonodol. Podem me ajudar?",
    ANALYTICS_ID: "GA_MEASUREMENT_ID",
    COUNTDOWN_DURATION: {
        hours: 4,
        minutes: 27,
        seconds: 33
    },
    FINAL_COUNTDOWN_DURATION: {
        hours: 3,
        minutes: 47,
        seconds: 28
    },
    VIEWER_COUNT_RANGE: {
        min: 2500,
        max: 3000
    },
    STATS_UPDATE_INTERVAL: 5000,
    VIDEO_CTA_DELAY: 30000
};

// Dados dos depoimentos
const TESTIMONIALS_DATA = [
    {
        name: "Ana Carolina M.",
        age: 34,
        city: "Belo Horizonte",
        rating: 5,
        text: "Sofria de insônia há 8 anos. Em 15 dias usando Sonodol, volto a dormir como criança. Minha pressão normalizou e me sinto 10 anos mais nova!",
        before: "3-4h de sono fragmentado",
        after: "8h de sono profundo",
        avatar: "/images/women-35.jpg"
    },
    {
        name: "Roberto Silva",
        age: 48,
        city: "Porto Alegre",
        rating: 5,
        text: "Meu cardiologista ficou impressionado! Em 2 meses, meus exames cardíacos melhoraram drasticamente. Sonodol literalmente salvou minha vida.",
        before: "Risco alto de infarto",
        after: "Coração saudável",
        avatar: "/images/man-40.webp"
    },
    {
        name: "Fernanda Costa",
        age: 41,
        city: "Brasília",
        rating: 5,
        text: "Depois de um AVC aos 39, descobri Sonodol. Hoje durmo tranquila, minha recuperação acelerou e voltei a trabalhar com energia total!",
        before: "Sequelas do AVC",
        after: "Recuperação completa",
        avatar: "/images/women-38.jpeg"
    }
];

// Dados das histórias completas
const STORIES_DATA = [
    {
        name: "João Silva",
        age: 42,
        city: "São Paulo",
        image: "/placeholder.svg",
        preview: "Executivo sofreu infarto súbito aos 42 anos após meses de insônia crônica...",
        fullStory: `João Silva, executivo de uma multinacional em São Paulo, sempre foi uma pessoa ativa e saudável. Aos 42 anos, começou a ter dificuldades para dormir devido ao estresse do trabalho.

Durante 8 meses, dormia apenas 3-4 horas por noite. Ignorou os sinais: palpitações, cansaço extremo, irritabilidade. "Achei que era só estresse", relembra.

Em uma manhã de terça-feira, enquanto tomava café, sentiu uma dor forte no peito. Foi direto para o hospital: infarto do miocárdio. Os médicos foram claros: a insônia crônica havia sobrecarregado seu coração.

"Quase morri por ignorar meu sono. Hoje durmo 7-8 horas e minha vida mudou completamente. Meu cardiologista disse que eu tive sorte - muitos não têm uma segunda chance."`,
        quote: "Quase morri por ignorar meu sono. Sonodol me deu uma segunda chance de viver."
    },
    {
        name: "Maria Santos",
        age: 38,
        city: "Rio de Janeiro",
        image: "/placeholder.svg",
        preview: "Mãe de 2 filhos teve AVC aos 38 após 1 ano sem dormir adequadamente...",
        fullStory: `Maria Santos, professora e mãe de duas crianças pequenas, desenvolveu insônia severa após o nascimento do segundo filho. Durante mais de um ano, dormia apenas 2-3 horas fragmentadas por noite.

"Eu achava que era normal, que toda mãe passava por isso", conta Maria. Mas os sintomas foram se agravando: esquecimentos, pressão alta, dores de cabeça constantes.

Aos 38 anos, enquanto dava aula, teve um AVC. Ficou 2 semanas no hospital, com sequelas na fala e movimento. Os médicos explicaram: a privação crônica de sono havia causado hipertensão severa e coágulos.

"Meus filhos quase ficaram órfãos porque eu não cuidei do meu sono. Hoje uso Sonodol religiosamente e durmo profundamente. Recuperei minha saúde e posso cuidar da minha família."`,
        quote: "Meus filhos quase ficaram órfãos. Sonodol me devolveu para minha família."
    }
];

// Sistema de Estado Global
class AppState {
    constructor() {
        this.viewers = CONFIG.VIEWER_COUNT_RANGE.min + Math.floor(Math.random() * (CONFIG.VIEWER_COUNT_RANGE.max - CONFIG.VIEWER_COUNT_RANGE.min));
        this.countdownTime = { ...CONFIG.COUNTDOWN_DURATION };
        this.finalCountdownTime = { ...CONFIG.FINAL_COUNTDOWN_DURATION };
        this.checkedSymptoms = [];
        this.currentTestimonial = 0;
        this.stats = {
            heartAttacks: 47,
            dementia: 312,
            strokes: 128,
            deaths: 23
        };
        this.stockCount = 47;
        this.exitIntentShown = false;
        this.whatsappMessageVisible = false;
    }

    updateViewers() {
        const change = Math.floor(Math.random() * 10) - 5;
        this.viewers = Math.max(
            CONFIG.VIEWER_COUNT_RANGE.min,
            Math.min(CONFIG.VIEWER_COUNT_RANGE.max, this.viewers + change)
        );
        return this.viewers;
    }

    updateStats() {
        this.stats.heartAttacks += Math.floor(Math.random() * 3) + 1;
        this.stats.dementia += Math.floor(Math.random() * 5) + 2;
        this.stats.strokes += Math.floor(Math.random() * 2) + 1;
        this.stats.deaths += Math.floor(Math.random() * 2);
        return this.stats;
    }

    decrementCountdown(type = 'main') {
        const countdown = type === 'main' ? this.countdownTime : this.finalCountdownTime;

        countdown.seconds--;
        if (countdown.seconds < 0) {
            countdown.seconds = 59;
            countdown.minutes--;
            if (countdown.minutes < 0) {
                countdown.minutes = 59;
                countdown.hours--;
                if (countdown.hours < 0) {
                    countdown.hours = 23;
                    countdown.minutes = 59;
                    countdown.seconds = 59;
                }
            }
        }
        return countdown;
    }
}

// Instância global do estado
const appState = new AppState();

// Sistema de Analytics
class Analytics {
    static track(eventName, parameters = {}) {
        try {
            if (typeof gtag === 'function') {
                gtag('event', eventName, {
                    event_category: parameters.category || 'engagement',
                    event_label: parameters.label || '',
                    value: parameters.value || 0,
                    ...parameters
                });
            }
            console.log('Analytics:', eventName, parameters);
        } catch (error) {
            console.error('Analytics error:', error);
        }
    }

    static trackPageView() {
        try {
            if (typeof gtag === 'function') {
                gtag('event', 'page_view', {
                    page_title: 'Sonodol Landing Page',
                    page_location: window.location.href
                });
            }
        } catch (error) {
            console.error('Analytics page view error:', error);
        }
    }

    static trackScroll(percentage) {
        this.track('scroll', {
            category: 'engagement',
            label: `${percentage}%`,
            value: percentage
        });
    }

    static trackCTA(location) {
        this.track('cta_click', {
            category: 'conversion',
            label: location,
            value: 1
        });
    }

    static trackQuiz(symptomsCount) {
        this.track('quiz_interaction', {
            category: 'engagement',
            label: `symptoms_${symptomsCount}`,
            value: symptomsCount
        });
    }
}

// Sistema de Contadores
class CountdownManager {
    constructor() {
        this.intervals = new Map();
    }

    start(elementId, type = 'main') {
        if (this.intervals.has(elementId)) {
            clearInterval(this.intervals.get(elementId));
        }

        const interval = setInterval(() => {
            const time = appState.decrementCountdown(type);
            this.updateDisplay(elementId, time);
        }, 1000);

        this.intervals.set(elementId, interval);
    }

    updateDisplay(elementId, time) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
        }
    }

    startFinalCountdown() {
    if (this.intervals.has('final')) {
        clearInterval(this.intervals.get('final'));
    }

    const interval = setInterval(() => {
        const time = appState.decrementCountdown('final');

        const hoursEl = document.getElementById('final-hours');
        const minutesEl = document.getElementById('final-minutes');
        const secondsEl = document.getElementById('final-seconds');

        if (hoursEl) hoursEl.textContent = String(time.hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(time.minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(time.seconds).padStart(2, '0');

        // Quando chegar em 00:00:00, parar o intervalo
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            clearInterval(interval);
            this.intervals.delete('final');
        }
    }, 1000);

    this.intervals.set('final', interval);
}

    stop(elementId) {
        if (this.intervals.has(elementId)) {
            clearInterval(this.intervals.get(elementId));
            this.intervals.delete(elementId);
        }
    }

    stopAll() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals.clear();
    }
}

// Sistema de Quiz
class QuizManager {
    constructor() {
        this.symptoms = [];
        this.riskLevels = {
            0: { level: "BAIXO", color: "low", message: "Continue monitorando sua saúde" },
            1: { level: "BAIXO", color: "low", message: "Continue monitorando sua saúde" },
            2: { level: "MODERADO", color: "moderate", message: "CUIDADO: Sintomas preocupantes detectados" },
            3: { level: "ALTO", color: "high", message: "ATENÇÃO: Você está no grupo de risco!" },
            4: { level: "ALTÍSSIMO", color: "critical", message: "URGENTE: Procure ajuda imediatamente!" },
            5: { level: "ALTÍSSIMO", color: "critical", message: "URGENTE: Procure ajuda imediatamente!" },
            6: { level: "ALTÍSSIMO", color: "critical", message: "URGENTE: Procure ajuda imediatamente!" }
        };
    }

    init() {
        const checkboxes = document.querySelectorAll('input[name="symptom"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleSymptomChange(e));
        });
    }

    handleSymptomChange(event) {
        const symptom = event.target.value;

        if (event.target.checked) {
            if (!this.symptoms.includes(symptom)) {
                this.symptoms.push(symptom);
            }
        } else {
            this.symptoms = this.symptoms.filter(s => s !== symptom);
        }

        this.updateDisplay();
        Analytics.trackQuiz(this.symptoms.length);
    }

    updateDisplay() {
        const countElement = document.getElementById('checked-count');
        const riskElement = document.getElementById('risk-assessment');
        const urgentCTA = document.getElementById('urgent-cta');

        if (countElement) {
            countElement.textContent = this.symptoms.length;
        }

        const risk = this.riskLevels[this.symptoms.length];
        if (riskElement) {
            riskElement.className = `risk-box risk-${risk.color}`;
            riskElement.innerHTML = `
                <div class="risk-level">RISCO ${risk.level}</div>
                <div class="risk-message">${risk.message}</div>
            `;
        }

        if (urgentCTA) {
            if (this.symptoms.length >= 3) {
                urgentCTA.classList.remove('hidden');
                urgentCTA.classList.add('fade-in');
            } else {
                urgentCTA.classList.add('hidden');
            }
        }

        // Salvar estado
        appState.checkedSymptoms = [...this.symptoms];
    }

    getRiskLevel() {
        return this.riskLevels[this.symptoms.length];
    }
}

// Sistema de Ingredientes (Accordion)
class IngredientsManager {
    constructor() {
        this.activeIngredient = null;
    }

    init() {
        // A função toggleIngredient é chamada diretamente do HTML
        // Nenhuma inicialização adicional necessária
    }

    toggle(index) {
        const items = document.querySelectorAll('.ingredient-item');
        const item = items[index];

        if (!item) return;

        const details = item.querySelector('.ingredient-details');
        const toggle = item.querySelector('.ingredient-toggle');

        if (this.activeIngredient === index) {
            // Fechar ingrediente ativo
            details.classList.add('hidden');
            toggle.textContent = '+';
            item.classList.remove('active');
            this.activeIngredient = null;
        } else {
            // Fechar ingrediente anterior
            if (this.activeIngredient !== null) {
                const prevItem = items[this.activeIngredient];
                if (prevItem) {
                    prevItem.querySelector('.ingredient-details').classList.add('hidden');
                    prevItem.querySelector('.ingredient-toggle').textContent = '+';
                    prevItem.classList.remove('active');
                }
            }

            // Abrir novo ingrediente
            details.classList.remove('hidden');
            toggle.textContent = '−';
            item.classList.add('active');
            this.activeIngredient = index;
        }

        Analytics.track('ingredient_toggle', {
            category: 'engagement',
            label: `ingredient_${index}`,
            value: 1
        });
    }
}

// Sistema de Depoimentos
class TestimonialsManager {
    constructor() {
        this.currentIndex = 0;
        this.testimonials = TESTIMONIALS_DATA;
        this.autoAdvanceInterval = null;
    }

    init() {
        this.render();
        this.startAutoAdvance();
    }

    render() {
        const container = document.querySelector('.testimonials-container');
        if (!container) return;

        // Limpar conteúdo existente
        container.innerHTML = '';

        // Renderizar todos os depoimentos
        this.testimonials.forEach((testimonial, index) => {
            const testimonialElement = this.createTestimonialElement(testimonial, index);
            container.appendChild(testimonialElement);
        });

        this.show(this.currentIndex);
    }

    createTestimonialElement(testimonial, index) {
        const element = document.createElement('div');
        element.className = `testimonial-card ${index === this.currentIndex ? 'active' : ''}`;
        element.id = `testimonial-${index}`;

        element.innerHTML = `
            <div class="testimonial-header">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div class="testimonial-info">
                    <h4 class="testimonial-name">${testimonial.name}</h4>
                    <p class="testimonial-location">${testimonial.age} anos • ${testimonial.city}</p>
                    <div class="testimonial-rating">${'★'.repeat(testimonial.rating)}</div>
                </div>
            </div>

            <blockquote class="testimonial-text">
                "${testimonial.text}"
            </blockquote>

            <div class="testimonial-comparison">
                <div class="comparison-before">
                    <div class="comparison-label">ANTES</div>
                    <div class="comparison-value">${testimonial.before}</div>
                </div>
                <div class="comparison-after">
                    <div class="comparison-label">DEPOIS</div>
                    <div class="comparison-value">${testimonial.after}</div>
                </div>
            </div>
        `;

        return element;
    }

    show(index) {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.nav-dot');

        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentIndex = index;

        Analytics.track('testimonial_view', {
            category: 'engagement',
            label: `testimonial_${index}`,
            value: 1
        });
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.show(nextIndex);
    }

    startAutoAdvance() {
        this.autoAdvanceInterval = setInterval(() => {
            this.next();
        }, 5000);
    }

    stopAutoAdvance() {
        if (this.autoAdvanceInterval) {
            clearInterval(this.autoAdvanceInterval);
            this.autoAdvanceInterval = null;
        }
    }
}

// Sistema de Estatísticas em Tempo Real
class StatsManager {
    constructor() {
        this.updateInterval = null;
    }

    init() {
        this.startUpdating();
    }

    startUpdating() {
        this.updateInterval = setInterval(() => {
            this.updateStats();
            this.updateViewers();
        }, CONFIG.STATS_UPDATE_INTERVAL);
    }

    updateStats() {
        const stats = appState.updateStats();

        const heartAttacksEl = document.getElementById('heart-attacks');
        const dementiaEl = document.getElementById('dementia');
        const strokesEl = document.getElementById('strokes');
        const deathsEl = document.getElementById('deaths');

        if (heartAttacksEl) {
            this.animateNumber(heartAttacksEl, stats.heartAttacks);
        }
        if (dementiaEl) {
            this.animateNumber(dementiaEl, stats.dementia);
        }
        if (strokesEl) {
            this.animateNumber(strokesEl, stats.strokes);
        }
        if (deathsEl) {
            this.animateNumber(deathsEl, stats.deaths);
        }
    }

    updateViewers() {
        const viewers = appState.updateViewers();
        const viewerElement = document.getElementById('viewer-count');

        if (viewerElement) {
            this.animateNumber(viewerElement, viewers);
        }
    }

    animateNumber(element, targetNumber) {
        const currentNumber = parseInt(element.textContent) || 0;
        const increment = targetNumber > currentNumber ? 1 : -1;

        if (currentNumber !== targetNumber) {
            element.textContent = (currentNumber + increment).toLocaleString();
        }
    }

    stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Sistema de WhatsApp
class WhatsAppManager {
    constructor() {
        this.messageVisible = false;
    }

    init() {
        const button = document.querySelector('.whatsapp-button');
        const floatContainer = document.getElementById('whatsapp-float');

        if (floatContainer) {
            floatContainer.addEventListener('mouseenter', () => this.showMessage());
            floatContainer.addEventListener('mouseleave', () => this.hideMessage());
        }
    }

    showMessage() {
        const message = document.getElementById('whatsapp-message');
        if (message && !this.messageVisible) {
            message.classList.remove('hidden');
            message.classList.add('fade-in');
            this.messageVisible = true;
        }
    }

    hideMessage() {
        const message = document.getElementById('whatsapp-message');
        if (message && this.messageVisible) {
            setTimeout(() => {
                message.classList.add('hidden');
                message.classList.remove('fade-in');
                this.messageVisible = false;
            }, 1000);
        }
    }

    toggle() {
        if (this.messageVisible) {
            this.hideMessage();
        } else {
            this.showMessage();
        }
    }

    openChat() {
        const url = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)}`;
        window.open(url, '_blank');

        Analytics.track('whatsapp_click', {
            category: 'engagement',
            label: 'floating_button',
            value: 1
        });
    }
}

// Sistema de Modal de Exit Intent
class ExitIntentManager {
    constructor() {
        this.shown = false;
        this.mouseLeaveHandler = null;
    }

    init() {
        this.mouseLeaveHandler = (e) => this.handleMouseLeave(e);
        document.addEventListener('mouseleave', this.mouseLeaveHandler);
    }

    handleMouseLeave(event) {
        if (event.clientY <= 0 && !this.shown) {
            this.show();
        }
    }

    show() {
        if (this.shown) return;

        const modal = document.getElementById('exit-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('scale-in');
            this.shown = true;

            Analytics.track('exit_intent', {
                category: 'engagement',
                label: 'modal_shown',
                value: 1
            });
        }
    }

    close() {
        const modal = document.getElementById('exit-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('scale-in');
        }
    }

    acceptOffer() {
        Analytics.track('exit_intent_conversion', {
            category: 'conversion',
            label: 'special_offer_accepted',
            value: 1
        });

        this.close();
        scrollToPricing();
    }

    destroy() {
        if (this.mouseLeaveHandler) {
            document.removeEventListener('mouseleave', this.mouseLeaveHandler);
        }
    }
}

// Sistema de Modais de História
class StoryModalManager {
    constructor() {
        this.currentStory = null;
    }

    open(storyIndex) {
        const story = STORIES_DATA[storyIndex];
        if (!story) return;

        const modal = document.getElementById('story-modal');
        const content = document.getElementById('story-modal-content');

        if (modal && content) {
            content.innerHTML = this.renderStoryContent(story);
            modal.classList.remove('hidden');
            modal.classList.add('scale-in');
            this.currentStory = storyIndex;

            Analytics.track('story_modal_open', {
                category: 'engagement',
                label: `story_${storyIndex}`,
                value: 1
            });
        }
    }

    renderStoryContent(story) {
        const paragraphs = story.fullStory.split('\n\n').map(paragraph =>
            paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
        ).join('');

        return `
            <h3 class="story-modal-title">História de ${story.name}</h3>
            <div class="story-modal-body">
                ${paragraphs}
            </div>
        `;
    }

    close() {
        const modal = document.getElementById('story-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('scale-in');
            this.currentStory = null;
        }
    }
}

// Sistema de Scroll Tracking
class ScrollTracker {
    constructor() {
        this.milestones = [25, 50, 75, 100];
        this.tracked = new Set();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollPercent = Math.round(
            (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        this.milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !this.tracked.has(milestone)) {
                this.tracked.add(milestone);
                Analytics.trackScroll(milestone);
            }
        });
    }
}

// Sistema de Video Hero
class VideoManager {
    constructor() {
        this.ctaTimeout = null;
    }

    init() {
        const video = document.getElementById('hero-video');
        if (video) {
            video.addEventListener('play', () => this.onVideoPlay());
            video.addEventListener('pause', () => this.onVideoPause());
        }

        // Mostrar CTA após 30 segundos
        this.ctaTimeout = setTimeout(() => {
            this.showCTA();
        }, CONFIG.VIDEO_CTA_DELAY);
    }

    onVideoPlay() {
        Analytics.track('video_play', {
            category: 'engagement',
            label: 'hero_video',
            value: 1
        });
    }

    onVideoPause() {
        Analytics.track('video_pause', {
            category: 'engagement',
            label: 'hero_video',
            value: 1
        });
    }

    showCTA() {
        const overlay = document.getElementById('video-cta-overlay');
        if (overlay && overlay.classList.contains('hidden')) {
            overlay.classList.remove('hidden');
            overlay.classList.add('fade-in');

            Analytics.track('video_cta_shown', {
                category: 'engagement',
                label: 'hero_video_30s',
                value: 1
            });
        }
    }

    destroy() {
        if (this.ctaTimeout) {
            clearTimeout(this.ctaTimeout);
        }
    }
}

// Instâncias dos gerenciadores
const countdownManager = new CountdownManager();
const quizManager = new QuizManager();
const ingredientsManager = new IngredientsManager();
const testimonialsManager = new TestimonialsManager();
const statsManager = new StatsManager();
const whatsappManager = new WhatsAppManager();
const exitIntentManager = new ExitIntentManager();
const storyModalManager = new StoryModalManager();
const scrollTracker = new ScrollTracker();
const videoManager = new VideoManager();

// Funções globais (chamadas pelo HTML)
function scrollToPricing() {
    const pricingSection = document.querySelector('.sunodol-plans');
    if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });

        Analytics.trackCTA('scroll_to_pricing');
    }
}

function toggleIngredient(index) {
    ingredientsManager.toggle(index);
}

function showTestimonial(index) {
    testimonialsManager.show(index);
}

function openStoryModal(index) {
    storyModalManager.open(index);
}

function closeStoryModal() {
    storyModalManager.close();
}

function toggleWhatsAppMessage() {
    whatsappManager.toggle();
}

function openWhatsApp() {
    whatsappManager.openChat();
}

function closeExitModal() {
    exitIntentManager.close();
}

function acceptSpecialOffer() {
    exitIntentManager.acceptOffer();
}

function purchasePackage(packageType) {
    Analytics.track('package_selection', {
        category: 'conversion',
        label: packageType,
        value: 1
    });

    // Aqui seria integrada a lógica de pagamento
    console.log(`Package selected: ${packageType}`);

    // Por enquanto, mostrar alerta
    alert(`Pacote ${packageType} selecionado! Redirecionando para o checkout...`);
}

// Função de inicialização principal
function initApp() {
    console.log('Initializing Sonodol App...');

    // Inicializar Analytics
    Analytics.trackPageView();

    // Inicializar todos os sistemas
    countdownManager.start('main-countdown');
    countdownManager.startFinalCountdown();

    quizManager.init();
    ingredientsManager.init();
    testimonialsManager.init();
    statsManager.init();
    whatsappManager.init();
    exitIntentManager.init();
    scrollTracker.init();
    videoManager.init();

    // Adicionar event listeners para CTAs
    const ctaButtons = document.querySelectorAll('[onclick*="scrollToPricing"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const location = button.closest('section')?.className || 'unknown';
            Analytics.trackCTA(location);
        });
    });

    console.log('App initialized successfully!');
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Limpeza ao sair da página
window.addEventListener('beforeunload', () => {
    countdownManager.stopAll();
    statsManager.stop();
    testimonialsManager.stopAutoAdvance();
    exitIntentManager.destroy();
    videoManager.destroy();
});

// Exportar para uso global (se necessário)
window.NaturalSleepApp = {
    appState,
    managers: {
        countdown: countdownManager,
        quiz: quizManager,
        ingredients: ingredientsManager,
        testimonials: testimonialsManager,
        stats: statsManager,
        whatsapp: whatsappManager,
        exitIntent: exitIntentManager,
        storyModal: storyModalManager,
        scroll: scrollTracker,
        video: videoManager
    },
    Analytics
};
