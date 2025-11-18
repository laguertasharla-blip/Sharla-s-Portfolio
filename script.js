// Smooth scroll and button functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsBtn = document.getElementById('viewDetailsBtn');
    const detailsSection = document.getElementById('details');
    const aboutSection = document.getElementById('about');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Hamburger Menu Toggle
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Theme Toggle
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Close mobile menu
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
            
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (targetId === '#details') {
                detailsSection.classList.remove('hidden');
                detailsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else if (targetId === '#about') {
                aboutSection.classList.remove('hidden');
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnHamburger = hamburgerBtn.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // View Details Button Click Handler - Navigate through sections
    let currentSection = 0;
    const sections = [
        { id: 'home', element: null, scroll: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { id: 'details', element: detailsSection, scroll: () => {
            detailsSection.classList.remove('hidden');
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }},
        { id: 'about', element: aboutSection, scroll: () => {
            aboutSection.classList.remove('hidden');
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
    ];

    viewDetailsBtn.addEventListener('click', function() {
        currentSection = (currentSection + 1) % sections.length;
        const section = sections[currentSection];
        
        if (section.id === 'home') {
            section.scroll();
            viewDetailsBtn.textContent = 'View Full Details';
        } else {
            section.scroll();
            if (section.id === 'details') {
                viewDetailsBtn.textContent = 'View About';
            } else if (section.id === 'about') {
                viewDetailsBtn.textContent = 'Back to Home';
            }
        }
    });

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.sticky-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(255, 107, 157, 0.5)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(255, 107, 157, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
});

