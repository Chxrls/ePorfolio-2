// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add active class to nav items on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Project Card Parallax Effect
document.querySelectorAll('.project-card').forEach(card => {
    const cardInner = card.querySelector('.project-card-inner');
    const cardShine = card.querySelector('.project-card-shine');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate center of the card
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // More pronounced rotation effect
        const rotateX = -(y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        // Apply transformation to the entire card
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Inner content and shine effect
        cardInner.style.transform = `translate(${(x - centerX) / 20}px, ${(y - centerY) / 20}px)`;
        cardShine.style.transform = `translate(${x}px, ${y}px)`;
    });

    card.addEventListener('mouseleave', () => {
        // Reset card and inner content
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        cardInner.style.transform = 'translate(0, 0)';
        cardShine.style.transform = 'translate(-50%, -50%)';
    });
});


document.addEventListener('mousemove', (e) => {
    let mouseGlow = document.querySelector('.mouse-glow');
    mouseGlow.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;
});

document.addEventListener('DOMContentLoaded', () => {
    let mouseGlow = document.createElement('div');
    mouseGlow.classList.add('mouse-glow');
    document.body.appendChild(mouseGlow);
});

