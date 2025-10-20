// Botón hamburguesa
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Submenús móviles
const dropdowns = document.querySelectorAll(".dropdown > a");

dropdowns.forEach(link => {
  link.addEventListener("click", e => {
    if (window.innerWidth <= 850) {
      e.preventDefault();
      const submenu = link.nextElementSibling;
      submenu.classList.toggle("show");
    }
  });
});
// SCRIPT: animación por IntersectionObserver (más fiable)
document.addEventListener('DOMContentLoaded', () => {
  const secciones = document.querySelectorAll('.actividad');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target); // animar solo una vez
        }
      });
    }, {
      threshold: 0.18 // ajustar según cuándo quieres que aparezca
    });

    secciones.forEach(s => observer.observe(s));
  } else {
    // Fallback simple: mostrar todo si no hay soporte
    secciones.forEach(s => s.classList.add('visible'));
  }
});
// menú móvil (toggle)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('show'));
  }

  // IntersectionObserver para actividades
  const items = document.querySelectorAll('.actividad');
  if ('IntersectionObserver' in window && items.length) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          o.unobserve(e.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach(i => obs.observe(i));
  } else {
    // fallback
    items.forEach(i => i.classList.add('visible'));
  }

 // script.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Toggle menú móvil
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('show'));
  }

  // =============================
// REINICIAR AL REFRESCAR
// =============================
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// =============================
// ANIMACIÓN GLOBAL DE ENTRADA (FADE-UP)
// =============================
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("page-enter");
});

// =============================
// MENÚ MÓVIL (HAMBURGUESA)
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('show'));
  }
});

  document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elementos.forEach(el => observer.observe(el));
  } else {
    elementos.forEach(el => el.classList.add('visible'));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll(".galeria-grid img");

  imagenes.forEach(img => {
    img.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modal-img");
      modal.innerHTML = `
        <div class="modal-contenido">
          <img src="${img.src}">
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener("click", () => modal.remove());
    });
  });
});
// Menú híbrido: panel derecho en desktop, dropdown hacia abajo en mobile
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const sideMenu = document.getElementById('sideMenu');
  const mobileDropdown = document.getElementById('mobileDropdown');
  const closeSide = document.getElementById('closeSide');
  const overlay = document.getElementById('pageOverlay');

  // detectar tamaño
  function isMobileView() {
    return window.matchMedia('(max-width: 899px)').matches;
  }

  // Abrir menú: decide side o mobile
  function openMenu() {
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    if (isMobileView()) {
      mobileDropdown.classList.add('open');
      mobileDropdown.setAttribute('aria-hidden','false');
      // scroll to top of header so user sees dropdown
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      sideMenu.classList.add('open');
      sideMenu.setAttribute('aria-hidden','false');
    }
    document.body.style.overflow = 'hidden'; // evitar scroll mientras abierto
  }

  function closeMenu() {
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    mobileDropdown.classList.remove('open');
    mobileDropdown.setAttribute('aria-hidden','true');
    sideMenu.classList.remove('open');
    sideMenu.setAttribute('aria-hidden','true');
    document.body.style.overflow = ''; // restaurar scroll
  }

  // abrir con el botón
  menuBtn.addEventListener('click', openMenu);
  // cerrar con X
  closeSide.addEventListener('click', closeMenu);
  // cerrar al pulsar overlay (fuera del panel)
  overlay.addEventListener('click', closeMenu);

  // cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // si el usuario redimensiona, cerramos menús para evitar inconsistencias
  window.addEventListener('resize', () => {
    closeMenu();
  });

  // accesibilidad: permitir click en links que lleven a anclas y cerrar menu
  document.querySelectorAll('.side-menu a, .mobile-dropdown a').forEach(a => {
    a.addEventListener('click', (e) => {
      // si el enlace apunta a un ancla en la misma página (empieza con #), hacemos scroll suave
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // cerrar primero
          closeMenu();
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 260);
        } else {
          closeMenu();
        }
      } else {
        // enlace externo o a otra página: dejamos que navegue (abrirá en la misma pestaña o nueva según target)
        closeMenu();
      }
    });
  });
});

