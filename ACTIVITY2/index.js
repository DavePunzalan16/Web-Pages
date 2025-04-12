// index.js

// DOM Elements
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const backToTopButton = document.getElementById('back-to-top');
const subscribeForm = document.getElementById('subscribe-form');
const formSuccessMessage = document.querySelector('.form-success');
const footerYear = document.querySelector('.footer-bottom p');
const categoryCards = document.querySelectorAll('.category-card');
const newsCards = document.querySelectorAll('.news-card');
const breakingAlert = document.querySelector('.breaking-alert');

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Back to Top Button Visibility
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Back to Top Button Scroll
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Subscribe Form Validation and Submission
subscribeForm.addEventListener('submit', event => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = nameInput.nextElementSibling;
    const emailError = emailInput.nextElementSibling;

    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Show Success Message if Valid
    if (isValid) {
        formSuccessMessage.style.display = 'block';
        subscribeForm.reset();
        setTimeout(() => {
            formSuccessMessage.style.display = 'none';
        }, 5000);
    }
});

// Update Footer Year
const currentYear = new Date().getFullYear();
footerYear.innerHTML = `&copy; ${currentYear} NewsFlash Media Network. All rights reserved.`;

// Filter News by Category
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category');
        newsCards.forEach(newsCard => {
            const newsCategory = newsCard.querySelector('.tag').textContent.toLowerCase();
            if (newsCategory === category || category === 'all') {
                newsCard.style.display = 'block';
            } else {
                newsCard.style.display = 'none';
            }
        });
    });
});

// Dismiss Breaking News Alert
if (breakingAlert) {
    const dismissButton = document.createElement('button');
    dismissButton.textContent = 'Dismiss';
    dismissButton.classList.add('btn', 'alert-btn');
    breakingAlert.querySelector('.alert-content').appendChild(dismissButton);

    dismissButton.addEventListener('click', () => {
        breakingAlert.style.display = 'none';
    });
}