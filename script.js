// Esperar a que el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Menú de navegación móvil (toggle)
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    // Cerrar el menú al hacer clic en un enlace (en modo móvil)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  
    // Tarjetas de proyectos: expandir/colapsar al hacer clic
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('expanded');
      });
    });
  
    // Animación en scroll para secciones ocultas
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target); // Dejar de observar una vez que se muestra
        }
      });
    }, { threshold: 0.1 });
    hiddenElements.forEach(el => observer.observe(el));
  });
  