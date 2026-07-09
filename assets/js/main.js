// ======================================
// 1. Mobile Menu: Toggle & Outside Click
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
// 2. Accessibility: Close Menu on 'Escape'
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
// 3. Smart Header: Hide on Scroll Down
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

    lastScrollTop = Math.max(0, scrollTop);
    
  }, { passive: true });
}