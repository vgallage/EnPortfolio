// Environmental Education Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change navbar opacity based on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate cards within the section
                const cards = entry.target.querySelectorAll('.image-card, .example-card, .topic-card, .competency-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
        
        // Initially hide cards for animation
        const cards = section.querySelectorAll('.image-card, .example-card, .topic-card, .competency-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });

    // Enhanced image card interactions
    const imageCards = document.querySelectorAll('.image-card');
    imageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Visual cards subtle hover effects only (removed problematic parallax)
    const visualCards = document.querySelectorAll('.visual-card');
    
    visualCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Quote animations
    const quotes = document.querySelectorAll('blockquote');
    
    const quoteObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    quotes.forEach(quote => {
        quote.style.opacity = '0';
        quote.style.transform = 'translateX(-20px)';
        quote.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        quoteObserver.observe(quote);
    });

    // Simple fade-in effect for hero title (removed typing effect to avoid layout issues)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Create hamburger button if it doesn't exist
            let hamburger = document.querySelector('.hamburger');
            if (!hamburger) {
                hamburger = document.createElement('button');
                hamburger.className = 'hamburger';
                hamburger.innerHTML = '☰';
                hamburger.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #2f855a;
                    cursor: pointer;
                    display: block;
                `;
                navContainer.appendChild(hamburger);
                
                hamburger.addEventListener('click', () => {
                    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.background = 'white';
                    navMenu.style.padding = '1rem';
                    navMenu.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                });
            }
        }
    };

    // Progress bar
    const createProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #48bb78, #38a169);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };

    // Initialize features
    createMobileMenu();
    createProgressBar();

    // Easter egg: Konami code for nature sounds
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            
            // Create nature sounds effect
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDiH0/LNeSsFJHTD8N+SQwoSWLLl76tXFghEmt/zu2sgBjiGz/Pu0j7yLFjA7eCZSAoWTKfj0bFhGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            audio.volume = 0.1;
            audio.play().catch(() => {}); // Ignore if audio doesn't play
            
            // Show nature message
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(72, 187, 120, 0.95);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                font-family: 'Playfair Display', serif;
                font-size: 1.2rem;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            `;
            message.innerHTML = '🌿 You\'ve connected with the more-than-human world! 🌿<br><small>Nature sees you.</small>';
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
            
            konamiCode = [];
        }
    });

    // Enhanced image loading with error handling
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                
                // Error handling for failed image loads
                newImg.onerror = () => {
                    console.warn('Failed to load image:', img.src);
                    // Set a placeholder or try alternative
                    img.alt = 'Image temporarily unavailable - ' + img.alt;
                    img.style.opacity = '1';
                    img.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
                    img.style.color = 'white';
                    img.style.display = 'flex';
                    img.style.alignItems = 'center';
                    img.style.justifyContent = 'center';
                    img.style.fontSize = '1rem';
                    img.style.textAlign = 'center';
                    img.style.padding = '2rem';
                };
                
                newImg.src = img.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        // Add loading state
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add error handling for immediate failures
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            this.style.color = 'white';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.fontSize = '1rem';
            this.style.textAlign = 'center';
            this.style.padding = '2rem';
            this.innerHTML = `<div>🌱<br>Environmental<br>Image</div>`;
        });
        
        imageObserver.observe(img);
    });

    // Add hover effects to reference items
    const referenceItems = document.querySelectorAll('.reference-item');
    referenceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.borderLeftColor = '#38a169';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftColor = '#48bb78';
        });
    });

    console.log('🌱 Environmental Education Portfolio loaded successfully! 🌿');
    console.log('Created with care for the more-than-human world 🌍');
}); 