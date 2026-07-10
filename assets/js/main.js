// ======================================
// Mobile Menu: Toggle & Outside Click
// ======================================
const header = document.querySelector('.page-header__wrapper');
const nav = document.getElementById('mobile-nav');
const burger = document.getElementById('header-burger');

document.addEventListener('click', (e) => {
  if (!nav || !burger) return;

  if (e.target.closest('#header-burger')) {
    const isOpened = nav.classList.toggle('active');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', isOpened);

    if (isOpened) {
      burger.setAttribute('aria-label', 'Закрити меню');
    } else {
      burger.setAttribute('aria-label', 'Відкрити меню');
    }
    return;
  }

  if (!e.target.closest('#mobile-nav')) {
    nav.classList.remove('active');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// ========================================
// Accessibility: Close Menu on 'Escape'
// ========================================
document.addEventListener('keydown', (e) => {
  if (!nav || !burger) return;

  if (e.key === 'Escape' && nav.classList.contains('active')) {
    nav.classList.remove('active');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    
    burger.focus(); 
  }
});

// ====================================
// Smart Header: Hide on Scroll Down
// ====================================
let lastScrollTop = 0;

if (header) {
  window.addEventListener('scroll', () => {
    // Disable header hiding if mobile menu is open
    if (burger && burger.classList.contains('active')) {
      return;
    }
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // iOS bounce fix: always show header at the very top
    if (scrollTop <= 0) {
      header.classList.remove('is-hidden');
      lastScrollTop = 0;
      return;
    }

    // Toggle header visibility based on scroll direction
    if (scrollTop > lastScrollTop) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }

    lastScrollTop = Math.max(32, scrollTop);
    
  }, { passive: true });
}

// =========
//    FAQ
// =========
document.addEventListener('DOMContentLoaded', () => {
  const faqHeaders = Array.from(document.querySelectorAll('.faq-header'));

  faqHeaders.forEach((header, index) => {
    header.addEventListener('click', () => {
      const item = header.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const isActive = item.classList.contains('is-active');

      if (!isActive) {
        item.classList.add('is-active');
        header.setAttribute('aria-expanded', 'true');
      } else {
        item.classList.remove('is-active');
        header.setAttribute('aria-expanded', 'false');
      }
    });

    // Arrow navigation (WAI-ARIA requirement)
    header.addEventListener('keydown', (e) => {
      let targetIndex = null;

      if (e.key === 'ArrowDown') {
        targetIndex = (index + 1) % faqHeaders.length;
      } else if (e.key === 'ArrowUp') {
        targetIndex = (index - 1 + faqHeaders.length) % faqHeaders.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = faqHeaders.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        faqHeaders[targetIndex].focus();
      }
    });
  });
});