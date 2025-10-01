// Safe execution with error handling
document.addEventListener('DOMContentLoaded', function() {
    
    // About page functionality (only if elements exist)
    const articlesBox = document.querySelector(".articles_box");
    if (articlesBox) {
        fetch("../db/worked_project.json")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((element) => {
                    const onProjectArticle = document.createElement("article");
                    onProjectArticle.classList.add("on_project_article");
                    const articleTitle = document.createElement("h3");
                    articleTitle.classList.add("article_title");
                    articleTitle.textContent = element.name;
                    const articleSubTitle = document.createElement("h4");
                    articleSubTitle.classList.add("article_subtitle");
                    articleSubTitle.textContent = element.position;
                    const articleIcon = document.createElement("aside");
                    articleIcon.classList.add("article_icon");
                    element.media.forEach((urll) => {
                        const img = document.createElement("img");
                        img.src = urll;
                        img.alt = element.name;
                        articleIcon.appendChild(img);
                    });
                    onProjectArticle.appendChild(articleTitle);
                    onProjectArticle.appendChild(articleSubTitle);
                    onProjectArticle.appendChild(articleIcon);
                    articlesBox.appendChild(onProjectArticle);
                });
            })
            .catch(error => console.error('Error loading project data:', error));
    }

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
            body.style.overflow = 'hidden';
            body.style.height = '100vh';
            body.style.position = 'fixed';
            body.style.width = '100%';
            html.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
            body.style.height = '';
            body.style.position = '';
            body.style.width = '';
            html.style.overflow = '';
        }
    });

    // Handle auth buttons
    const authBtn = document.querySelector('.btn-authorization');
    const regBtn = document.querySelector('.btn-registration');
    
    if (authBtn) {
        authBtn.addEventListener('click', function() {
            console.log('Auth button clicked');
            window.location.href = 'pages/authorization.html';
        });
    }
    
    if (regBtn) {
        regBtn.addEventListener('click', function() {
            console.log('Registration button clicked');
            window.location.href = 'pages/registration.html';
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.mobile-menu a');
    console.log('Found nav links:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu');
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
            body.style.height = '';
            body.style.position = '';
            body.style.width = '';
            html.style.overflow = '';
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        handleFooterVisibility();
        
        if (window.innerWidth > 834) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
            body.style.height = '';
            body.style.position = '';
            body.style.width = '';
            html.style.overflow = '';
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            console.log('Escape key pressed, closing menu');
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
            body.style.height = '';
            body.style.position = '';
            body.style.width = '';
            html.style.overflow = '';
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