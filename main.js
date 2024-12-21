// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active navigation state on scroll
const handleScroll = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', handleScroll);

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    const cardInner = card.querySelector('.project-card-inner');
    const cardShine = card.querySelector('.project-card-shine');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / 10;

        // Apply transforms
        card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Update shine effect
        if (cardShine) {
            cardShine.style.opacity = '1';
            cardShine.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        if (cardShine) {
            cardShine.style.opacity = '0';
        }
    });
});

// Mouse glow effect
const createMouseGlow = () => {
    const mouseGlow = document.createElement('div');
    mouseGlow.classList.add('mouse-glow');
    document.body.appendChild(mouseGlow);

    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.transform = `translate(${e.clientX - 50}px, ${e.clientY - 50}px)`;
    });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createMouseGlow();
    handleScroll(); // Initial check for active nav item
});

// Form submission handling
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
            console.error('Form submission error:', error);
        }
    });
}
