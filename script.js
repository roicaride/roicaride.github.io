// Configuración de tsParticles
tsParticles.load("particles-js", {
    particles: {
        number: {
            value: 320,
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
                enable: false
            },
            onClick: {
                enable: false
            },
            resize: true
        }
    },
    retina_detect: true
});

// Esperar a que el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
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

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const offset = 80; // Ajuste para el navbar fijo
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    function updateNavigation() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Ajuste para detección más precisa

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Actualizar en scroll
    window.addEventListener('scroll', updateNavigation);
    // Actualizar al cargar la página
    updateNavigation();

    // Navegación
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Asignar índices para la animación
    links.forEach((link, index) => {
        link.style.setProperty('--i', index);
    });

    // Toggle menú
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Cerrar menú al hacer clic en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
});

// Certificates Modal
let modal = null;
let modalImg = null;
let modalClose = null;

function createModal() {
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img src="" alt="Certificate">
            </div>
        `;
        document.body.appendChild(modal);
        
        modalImg = modal.querySelector('img');
        modalClose = modal.querySelector('.modal-close');
        
        // Eventos para cerrar el modal
        modalClose.addEventListener('click', closeCertificateModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCertificateModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeCertificateModal();
            }
        });
    }
}

function openCertificateModal(src) {
    createModal();
    
    // Verificar si es el certificado de trading avanzado
    if (src.includes('certificado trading avanzado')) {
        const modalContent = modal.querySelector('.modal-content');
        const basePath = src.substring(0, src.lastIndexOf('/') + 1);
        modalContent.innerHTML = `
            <span class="modal-close">&times;</span>
            <div class="certificate-images">
                <img src="${src}" alt="Advanced Trading Certificate">
                <img src="${basePath}certificado trading avanzado_page-0002.jpg" alt="Advanced Trading Certificate - Page 2">
            </div>
        `;
    } else {
        modalImg.src = src;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reasignar los event listeners para el nuevo contenido
    const newClose = modal.querySelector('.modal-close');
    if (newClose) {
        newClose.addEventListener('click', closeCertificateModal);
    }
}

function closeCertificateModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImg.src = '';
    }
}

// Inicializar el modal cuando se carga la página
document.addEventListener('DOMContentLoaded', createModal);
