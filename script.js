// Configuración de tsParticles
tsParticles.load("particles-js", {
    particles: {
        number: {
            value: 300,
            density: {
                enable: true,
                value_area: 1200
            }
        },
        color: {
            value: "#ffffff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.6,
            random: true,
            animation: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.3,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                size_min: 2,
                sync: false
            }
        },
        links: {
            enable: true,
            distance: 120,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
                default: "out"
            },
            bounce: true,
            attract: {
                enable: false
            }
        }
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            onHover: {
                enable: true,
                mode: "repulse"
            },
            onClick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.3
            },
            push: {
                quantity: 4
            }
        }
    },
    retina_detect: true
});

// Esperar a que el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Menú móvil
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Animaciones de scroll mejoradas
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Animaciones específicas para diferentes elementos
                if (entry.target.classList.contains('about-container')) {
                    entry.target.classList.add('slide-up');
                } else if (entry.target.classList.contains('contact-form')) {
                    entry.target.classList.add('slide-left');
                } else if (entry.target.classList.contains('contact-info')) {
                    entry.target.classList.add('slide-right');
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('scale-in');
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.hidden, .about-container, .contact-form, .contact-info, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Animación de scroll suave para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
