// ============================
// MOBILE MENU
// ============================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// ============================
// THEME TOGGLE
// ============================

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Сохраняем предпочтение пользователя
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// ============================
// SMOOTH SCROLL
// ============================

function scrollToConsultation() {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
        consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================
// FORM SUBMISSION
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Применяем сохраненную тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Инициализация toggle для карточек услуг на мобильных
    initServiceCardsToggle();
    
    // Обработка формы
    const form = document.getElementById('consultationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(form);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Здесь можно добавить отправку данных на сервер
            // Например, через fetch API или XMLHttpRequest
            
            // Для демонстрации просто покажем alert
            alert('Спасибо за обращение, ' + name + '! Я свяжусь с вами в ближайшее время.');
            
            // Очищаем форму
            form.reset();
        });
    }
});

// ============================
// HEADER SCROLL EFFECT
// ============================

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================
// CLOSE MOBILE MENU ON OUTSIDE CLICK
// ============================

document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// ============================
// PHONE NUMBER FORMATTING
// ============================

const phoneInput = document.querySelector('input[type="tel"]');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            let formatted = '+';
            if (value.length > 0) formatted += value.substring(0, 1);
            if (value.length > 1) formatted += ' ' + value.substring(1, 4);
            if (value.length > 4) formatted += ' ' + value.substring(4, 7);
            if (value.length > 7) formatted += ' ' + value.substring(7, 9);
            if (value.length > 9) formatted += ' ' + value.substring(9, 11);
            
            e.target.value = formatted;
        }
    });
}

// ============================
// ANIMATE ON SCROLL (optional)
// ============================

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

// Наблюдаем за элементами для анимации
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .review-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================
// TOGGLE MORE ADVANTAGES
// ============================

function toggleMoreAdvantages() {
    const moreAdvantages = document.getElementById('moreAdvantages');
    const button = event.currentTarget;
    const icon = button.querySelector('.show-more-icon');
    const text = button.querySelector('.show-more-text');
    
    if (moreAdvantages.style.display === 'none' || moreAdvantages.style.display === '') {
        moreAdvantages.style.display = 'grid';
        text.textContent = 'Скрыть';
        icon.style.transform = 'rotate(180deg)';
    } else {
        moreAdvantages.style.display = 'none';
        text.textContent = 'И еще много чего...';
        icon.style.transform = 'rotate(0deg)';
    }
}

// ============================
// SERVICE CARDS TOGGLE (MOBILE)
// ============================

function initServiceCardsToggle() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const header = card.querySelector('.service-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Проверяем, что мы на мобильном устройстве
                if (window.innerWidth <= 480) {
                    card.classList.toggle('expanded');
                }
            });
        }
    });
}

// ============================
// REVIEWS SLIDER
// ============================

let currentSlide = 0;

function slideReviews(direction) {
    const reviewsGrid = document.querySelector('.reviews-grid');
    const reviewCards = document.querySelectorAll('.review-card');
    const totalSlides = reviewCards.length;
    
    // Определяем сколько карточек показывать одновременно
    let slidesPerView = 3; // Desktop по умолчанию
    if (window.innerWidth <= 768) {
        slidesPerView = 1; // Mobile
    } else if (window.innerWidth <= 1024) {
        slidesPerView = 2; // Tablet
    }
    
    const maxSlide = totalSlides - slidesPerView;
    
    currentSlide += direction;
    
    // Ограничиваем границы
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide > maxSlide) {
        currentSlide = maxSlide;
    }
    
    // Вычисляем смещение
    const cardWidth = reviewCards[0].offsetWidth;
    const gap = 30;
    const offset = -(currentSlide * (cardWidth + gap));
    
    reviewsGrid.style.transform = `translateX(${offset}px)`;
}

// ============================
// YANDEX MAPS INITIALIZATION
// ============================

function initMap() {
    if (typeof ymaps === 'undefined') {
        console.log('Яндекс.Карты не загружены');
        return;
    }
    
    ymaps.ready(function () {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;
        
        const myMap = new ymaps.Map('map', {
            center: [54.872345, 69.125501],
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        const myPlacemark = new ymaps.Placemark([54.872345, 69.125501], {
            balloonContent: '<strong>Адвокат Поляков Егор Андреевич</strong><br>ул. Конституции Казахстана, 4<br>офис №1 "Адвокат"',
            hintContent: 'Офис адвоката'
        }, {
            preset: 'islands#blueGovernmentCircleIcon'
        });
        
        myMap.geoObjects.add(myPlacemark);
    });
}

// Инициализация карты при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
