// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animation for hamburger
    const bars = document.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Form styling enhancement
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    // Add focused class for styling when input is focused
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Simple validation
    let isValid = true;
    
    if (nameInput.value.trim() === '') {
        highlightError(nameInput);
        isValid = false;
    } else {
        removeError(nameInput);
    }
    
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        highlightError(emailInput);
        isValid = false;
    } else {
        removeError(emailInput);
    }
    
    if (messageInput.value.trim() === '') {
        highlightError(messageInput);
        isValid = false;
    } else {
        removeError(messageInput);
    }
    
    if (isValid) {
        // In a real implementation, this would send the form data to a server
        // For now, just show a success message and reset the form
        showFormSuccess();
        contactForm.reset();
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function highlightError(input) {
    input.style.borderColor = '#ff6b6b';
    input.style.backgroundColor = 'rgba(255, 107, 107, 0.05)';
}

function removeError(input) {
    input.style.borderColor = '';
    input.style.backgroundColor = '';
}

function showFormSuccess() {
    const formContainer = document.querySelector('.contact-form');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
    successMsg.style.backgroundColor = 'rgba(100, 255, 218, 0.1)';
    successMsg.style.color = 'var(--primary-color)';
    successMsg.style.padding = '15px';
    successMsg.style.borderRadius = 'var(--border-radius)';
    successMsg.style.marginTop = '20px';
    successMsg.style.textAlign = 'center';
    
    formContainer.appendChild(successMsg);
    
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

// Scroll animations
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.about-card, .service-card, .project-card');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize styles for reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.about-card, .service-card, .project-card');
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial reveal for elements in viewport
    setTimeout(() => {
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
    }, 100);
    
    // Change form input styles on focus and typing
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        const label = input.previousElementSibling;
        
        input.addEventListener('focus', () => {
            label.style.color = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', () => {
            label.style.color = '';
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            setTimeout(() => {
                button.style.transition = 'all 0.3s ease';
            }, 300);
        });
    });
    
    // Add typing effect to hero text
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
        }
    }, 100);
});

// Dynamic year for copyright
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = `&copy; ${currentYear} Dave Matthew S. Punzalan. All rights reserved.`;
});