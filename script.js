// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Product Filtering Logic
const filterButtons = document.querySelectorAll('.btn-filter');
const collectionItems = document.querySelectorAll('.collection-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        collectionItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                // If filtering 'all', still respect the 'view more' initial hidden state
                if (filterValue === 'all' && item.classList.contains('d-none')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }

                // Trigger reveal for filtered items
                ScrollReveal().reveal(item, {
                    scale: 0.8,
                    duration: 500,
                    easing: 'ease-in-out'
                });
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// View More Collections Toggle
const viewMoreBtn = document.getElementById('viewMoreBtn');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function () {
        const hiddenItems = document.querySelectorAll('.collection-item.d-none');
        hiddenItems.forEach(item => {
            item.classList.remove('d-none');
            item.style.display = 'block';
            ScrollReveal().reveal(item, {
                scale: 0.8,
                duration: 500,
                easing: 'ease-in-out',
                delay: 100
            });
        });
        this.style.display = 'none'; // Hide button after showing all
    });
}

// Scroll Reveal Animations
ScrollReveal().reveal('.reveal-top', {
    delay: 200,
    distance: '50px',
    origin: 'top',
    duration: 1000,
    easing: 'ease-in-out'
});

ScrollReveal().reveal('.reveal-bottom', {
    delay: 400,
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
    easing: 'ease-in-out'
});

ScrollReveal().reveal('.reveal-left', {
    delay: 300,
    distance: '30px', /* Reduced from 100px for mobile safety */
    origin: 'left',
    duration: 1200,
    easing: 'ease-out'
});

ScrollReveal().reveal('.reveal-right', {
    delay: 300,
    distance: '30px', /* Reduced from 100px for mobile safety */
    origin: 'right',
    duration: 1200,
    easing: 'ease-out'
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission (Demo)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';

        setTimeout(() => {
            alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            contactForm.reset();
        }, 1500);
    });
}

// Gallery Lightbox Effect (Simple)
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const imgSrc = this.querySelector('img').src;
        // In a real app, we'd use a library like Lightbox2 or GLightbox
        // For this demo, we can just open the image in a new tab or use a custom modal
        window.open(imgSrc, '_blank');
    });
});


// Hero Background Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-bg-slideshow .slide');
const thumbs = document.querySelectorAll('.slide-thumb');

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    thumbs.forEach(t => t.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (thumbs[currentSlide]) thumbs[currentSlide].classList.add('active');
}

function startSlideshow() {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4500);
}

// Thumbnail click handlers
thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
        showSlide(parseInt(this.getAttribute('data-index')));
    });
});

// Start auto-slideshow if slides exist
if (slides.length > 0) {
    startSlideshow();
}
