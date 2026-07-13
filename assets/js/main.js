const header = document.querySelector('.page-header__wrapper');
const nav = document.getElementById('mobile-nav');
const burger = document.getElementById('header-burger');

const headings = document.querySelectorAll('.article__texts h2');
const tocLists = document.querySelectorAll('.article__content-list ol');
const article_sidebar = document.querySelector(".article__sidebar:not(.article__sidebar--mobile)")

// ======================================
// Mobile Menu: Toggle & Outside Click
// ======================================
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
      if (article_sidebar) article_sidebar.classList.add('active');
    } else {
      header.classList.remove('is-hidden');
      if (article_sidebar) article_sidebar.classList.remove('active');
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

// =========
// Auto Table of Contents
// =========
document.addEventListener('DOMContentLoaded', () => {
  if (!headings.length || !tocLists) return;

  tocLists.forEach(list => list.innerHTML = '');

  headings.forEach((heading, index) => {
    const id = `heading-${index + 1}`;
    heading.id = id;

    tocLists.forEach(list => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      
      link.className = 'h3';
      link.href = '#' + id;
      link.textContent = heading.textContent;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        heading.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        history.pushState(null, null, window.location.pathname + window.location.search + `#${id}`);
      });

      li.appendChild(link);
      list.appendChild(li);
    });
  });
});

// =========
// Footer button scroll to top
// =========
const scrollTopButton = document.querySelector('.scroll-to-top');

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    window.scrollTo({
      top: 0
    });
  });
}