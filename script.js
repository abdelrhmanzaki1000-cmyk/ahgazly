// Global variables
let currentLanguage = 'ar';
let currentTheme = 'light';
let filteredCars = [...carsData];

// DOM Elements
const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const carsGrid = document.getElementById('carsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚗 Initializing Ahgazly Car Rental Website...');
    initializeApp();
    setupEventListeners();
    renderCars();
    setupAnimations();
    loadUserPreferences();
    console.log('✅ Website loaded successfully!');
});

// Initialize application
function initializeApp() {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const pickupInput = document.getElementById('pickupDate');
    const returnInput = document.getElementById('returnDate');
    const modalPickupInput = document.getElementById('modalPickupDate');
    const modalReturnInput = document.getElementById('modalReturnDate');
    
    if (pickupInput) pickupInput.value = today.toISOString().split('T')[0];
    if (returnInput) returnInput.value = tomorrow.toISOString().split('T')[0];
    if (modalPickupInput) modalPickupInput.value = today.toISOString().split('T')[0];
    if (modalReturnInput) modalReturnInput.value = tomorrow.toISOString().split('T')[0];
}

// Setup event listeners
function setupEventListeners() {
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language toggle clicked');
            toggleLanguage();
        });
    }
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle clicked');
            toggleTheme();
        });
    }
    
    // Mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterCars(e.target.dataset.category);
        });
    });
    
    // Modal controls
    if (closeModal) {
        closeModal.addEventListener('click', closeBookingModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    // Form submissions
    const bookingForm = document.querySelector('.booking-form');
    const contactForm = document.querySelector('.contact-form');
    const modalForm = document.querySelector('.modal-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleSearch);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (modalForm) {
        modalForm.addEventListener('submit', handleBookingForm);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
}

// Language switching functionality
function toggleLanguage() {
    console.log('Toggling language from', currentLanguage);
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    console.log('New language:', currentLanguage);
    
    // Update HTML attributes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update button text
    if (langToggle) {
        langToggle.innerHTML = `<span>${currentLanguage === 'ar' ? 'EN' : 'عربي'}</span>`;
    }
    
    // Update page title
    document.title = currentLanguage === 'ar' ? 'احجزلى - تأجير السيارات' : 'Ahgazly - Car Rental';
    
    // Update all translatable elements
    updateTranslations();
    
    // Re-render cars with new language
    renderCars();
    
    // Save preference
    localStorage.setItem('preferred-language', currentLanguage);
    
    // Add transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
    
    console.log('Language switched successfully to', currentLanguage);
}

// Update translations for all elements
function updateTranslations() {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        const text = currentLanguage === 'ar' ? element.dataset.ar : element.dataset.en;
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]');
    placeholderElements.forEach(element => {
        const placeholder = currentLanguage === 'ar' ? element.dataset.arPlaceholder : element.dataset.enPlaceholder;
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update select options
    updateSelectOptions();
}

// Update select options
function updateSelectOptions() {
    const locationSelect = document.getElementById('location');
    if (locationSelect) {
        const options = locationSelect.querySelectorAll('option');
        
        options.forEach(option => {
            if (option.dataset.ar && option.dataset.en) {
                option.textContent = currentLanguage === 'ar' ? option.dataset.ar : option.dataset.en;
            }
        });
    }
}

// Theme switching functionality
function toggleTheme() {
    console.log('Toggling theme from', currentTheme);
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('New theme:', currentTheme);
    
    // Update theme attribute
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Save preference
    localStorage.setItem('preferred-theme', currentTheme);
    
    // Add smooth transition
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
    
    console.log('Theme switched successfully to', currentTheme);
}

// Mobile menu toggle
function toggleMobileMenu() {
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    }
}

// Car filtering functionality
function filterCars(category) {
    console.log('Filtering cars by category:', category);
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Filter cars
    if (category === 'all') {
        filteredCars = [...carsData];
    } else {
        filteredCars = carsData.filter(car => car.category === category);
    }
    
    console.log('Filtered cars count:', filteredCars.length);
    
    // Re-render cars with animation
    if (carsGrid) {
        carsGrid.style.opacity = '0';
        setTimeout(() => {
            renderCars();
            carsGrid.style.opacity = '1';
        }, 200);
    }
}

// Render cars in the grid
function renderCars() {
    if (!carsGrid) {
        console.error('Cars grid element not found');
        return;
    }
    
    console.log('Rendering', filteredCars.length, 'cars');
    carsGrid.innerHTML = '';
    
    filteredCars.forEach((car, index) => {
        const carCard = createCarCard(car);
        carCard.style.animationDelay = `${index * 0.1}s`;
        carsGrid.appendChild(carCard);
    });
}

// Create individual car card
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card loading';
    
    const name = currentLanguage === 'ar' ? car.name.ar : car.name.en;
    const price = currentLanguage === 'ar' ? car.price.ar : car.price.en;
    const features = currentLanguage === 'ar' ? car.features.ar : car.features.en;
    const transmission = currentLanguage === 'ar' ? car.specs.transmission.ar : car.specs.transmission.en;
    const fuel = currentLanguage === 'ar' ? car.specs.fuel.ar : car.specs.fuel.en;
    
    card.innerHTML = `
        <img src="${car.image}" alt="${name}" class="car-image" loading="lazy">
        <div class="car-info">
            <h3 class="car-name">${name}</h3>
            <div class="car-price">${price}</div>
            <div class="car-features">
                ${features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
            <div class="car-specs">
                <span>${transmission}</span>
                <span>${fuel}</span>
                <span>${car.specs.doors} ${currentLanguage === 'ar' ? 'أبواب' : 'doors'}</span>
            </div>
            <button class="book-btn" onclick="openBookingModal(${car.id})">
                ${currentLanguage === 'ar' ? 'احجز الآن' : 'Book Now'}
            </button>
        </div>
    `;
    
    // Add loading animation
    setTimeout(() => {
        card.classList.add('loaded');
    }, 100);
    
    return card;
}

// Modal functionality
function openBookingModal(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car && bookingModal) {
        const carName = currentLanguage === 'ar' ? car.name.ar : car.name.en;
        const modalTitle = document.querySelector('.modal h2');
        if (modalTitle) {
            modalTitle.textContent = `${currentLanguage === 'ar' ? 'احجز' : 'Book'} ${carName}`;
        }
        bookingModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    if (bookingModal) {
        bookingModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Make openBookingModal globally available
window.openBookingModal = openBookingModal;

// Form handling
function handleSearch(e) {
    e.preventDefault();
    console.log('Search form submitted');
    
    // Simulate search (scroll to cars section)
    const carsSection = document.getElementById('cars');
    if (carsSection) {
        carsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Show success message
    showNotification(
        currentLanguage === 'ar' ? 'تم البحث بنجاح!' : 'Search completed successfully!',
        'success'
    );
}

function handleContactForm(e) {
    e.preventDefault();
    console.log('Contact form submitted');
    
    // Simulate form submission
    setTimeout(() => {
        showNotification(
            currentLanguage === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Your message has been sent successfully!',
            'success'
        );
        e.target.reset();
    }, 1000);
}

function handleBookingForm(e) {
    e.preventDefault();
    console.log('Booking form submitted');
    
    // Simulate booking
    setTimeout(() => {
        showNotification(
            currentLanguage === 'ar' ? 'تم تأكيد حجزك بنجاح!' : 'Your booking has been confirmed successfully!',
            'success'
        );
        closeBookingModal();
        e.target.reset();
    }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        ${currentLanguage === 'ar' ? 'left: 20px;' : 'right: 20px;'}
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-family: ${currentLanguage === 'ar' ? 'Cairo' : 'Poppins'}, sans-serif;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Animation setup
function setupAnimations() {
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(${currentLanguage === 'ar' ? '-100%' : '100%'});
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(${currentLanguage === 'ar' ? '-100%' : '100%'});
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .car-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('loaded');
        }
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = currentTheme === 'dark' 
                ? 'rgba(17, 24, 39, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = currentTheme === 'dark' 
                ? 'rgba(17, 24, 39, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
        }
    }
}

// Load user preferences
function loadUserPreferences() {
    console.log('Loading user preferences...');
    
    // Load language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    console.log('Saved language:', savedLanguage);
    if (savedLanguage && savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('preferred-theme');
    console.log('Saved theme:', savedTheme);
    if (savedTheme && savedTheme !== currentTheme) {
        toggleTheme();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && bookingModal && bookingModal.style.display === 'block') {
        closeBookingModal();
    }
    
    // Language toggle with Ctrl+L
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        toggleLanguage();
    }
    
    // Theme toggle with Ctrl+T
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(handleScrollAnimations, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification(
        currentLanguage === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred',
        'error'
    );
});

console.log('🚗 Ahgazly Car Rental Website Script Loaded Successfully!');