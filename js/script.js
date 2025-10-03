// Safe execution with error handling
document.addEventListener('DOMContentLoaded', function() {
    
    // Text area functionality (only if elements exist)
    const textArea = document.querySelector("#text_input");
    const wordCount = document.querySelector("#word_count");
    if (textArea && wordCount) {
        textArea.addEventListener("input", (e) => {
            const str = textArea.value;
            const matches = str.match(/[^ \t\n\r,.!?;:()"'`[\]{}<>\\/|@#$%^&*-+=~]/g);
            if (matches) {
                wordCount.textContent = matches.length + "/250";
            } else {
                wordCount.textContent = "0/250";
            }
            if (matches && matches.length > 250) {
                wordCount.style.color = "red";
                textArea.setCustomValidity("Must be less than 250 words");
            } else {
                wordCount.style.color = "";
                textArea.setCustomValidity("");
            }
        });
    }

    // Form validation with preventDefault
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
        });
    });

    // Burger Menu Functionality
    console.log('DOM loaded - initializing burger menu');
    
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    const html = document.documentElement;
    const footer = document.querySelector('footer');

    // Debug: Check if elements exist
    console.log('Burger menu element:', burgerMenu);
    console.log('Mobile menu element:', mobileMenu);

    if (!burgerMenu || !mobileMenu) {
        console.log('Burger menu elements not found on this page');
        return;
    }

    // Check screen size and hide/show footer
    function handleFooterVisibility() {
        if (window.innerWidth <= 834) {
            if (footer) {
                footer.style.display = 'none';
            }
        } else {
            if (footer && !body.classList.contains('menu-open')) {
                footer.style.display = '';
            }
        }
    }

    // Reset body styles - აბრუნებს body-ს default მდგომარეობაში
    function resetBodyStyles() {
        body.style.overflow = '';      // აბრუნებს scroll-ს
        body.style.height = '';         // აშორებს fixed height-ს
        body.style.position = '';       // აშორებს fixed position-ს
        body.style.width = '';          // აშორებს fixed width-ს
        html.style.overflow = '';       // აბრუნებს html scroll-ს
    }

    // Initial check
    handleFooterVisibility();

    // Toggle burger menu
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('Burger menu clicked');
        
        // Toggle active classes
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle body class
        body.classList.toggle('menu-open');
        
        console.log('Burger active:', this.classList.contains('active'));
        console.log('Mobile menu active:', mobileMenu.classList.contains('active'));
        console.log('Body menu-open:', body.classList.contains('menu-open'));
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            // მენიუ ღიაა - ვკეტავთ scroll-ს
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.position = 'fixed';
            body.style.width = '100%';
            html.style.overflow = 'hidden';
        } else {
            // მენიუ დახურულია - ვაბრუნებთ scroll-ს
            resetBodyStyles();
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.mobile-menu a');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu');
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            resetBodyStyles();
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        handleFooterVisibility();
        
        if (window.innerWidth > 834) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            resetBodyStyles();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            console.log('Escape key pressed, closing menu');
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            resetBodyStyles();
        }
    });

    // Prevent touchmove when menu is open
    if (mobileMenu) {
        mobileMenu.addEventListener('touchmove', function(e) {
            if (mobileMenu.classList.contains('active')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});