document.addEventListener('DOMContentLoaded', function () {
    // Make sure Bootstrap JS is loaded
    const checkBootstrap = setInterval(function () {
        if (typeof bootstrap !== 'undefined') {
            clearInterval(checkBootstrap);
            initNavbar();
        } else {
            // If Bootstrap JS is not loaded, add it dynamically
            if (!document.getElementById('bootstrap-js')) {
                const bootstrapScript = document.createElement('script');
                bootstrapScript.id = 'bootstrap-js';
                bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';
                bootstrapScript.integrity = 'sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN';
                bootstrapScript.crossOrigin = 'anonymous';
                document.body.appendChild(bootstrapScript);
            }
        }
    }, 100);

    function initNavbar() {
        // Apply active class to nav links based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar .nav-link');

        // Handle navbar background on scroll
        window.addEventListener('scroll', function () {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link on scroll
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Close mobile menu when clicking a nav link
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });

        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('light-theme');

            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                document.body.classList.remove('light');
                document.body.classList.add('dark');
            }
        });

        // Add touch-friendly interaction for submenu items on mobile
        const hasSubmenu = document.querySelectorAll('.nav-item.dropdown');
        if (hasSubmenu.length > 0) {
            hasSubmenu.forEach(item => {
                const dropdownToggle = item.querySelector('.dropdown-toggle');
                const dropdownMenu = item.querySelector('.dropdown-menu');

                dropdownToggle.addEventListener('click', function (e) {
                    if (window.innerWidth < 992) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdownMenu.classList.toggle('show');
                    }
                });
            });
        }
    }
});

// Fallback to ensure navbar works if Bootstrap JS fails to load
window.addEventListener('load', function () {
    setTimeout(function () {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse && typeof bootstrap === 'undefined') {
            navbarToggler.addEventListener('click', function () {
                navbarCollapse.classList.toggle('show');
            });

            document.querySelectorAll('.navbar .nav-link').forEach(link => {
                link.addEventListener('click', function () {
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                });
            });
        }
    }, 1000);
});
