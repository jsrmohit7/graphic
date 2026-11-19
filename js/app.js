/**
 * Vexoo Portfolio Script - Mona Rani (Graphic Designer)
 * Exact 1:1 Reference Interactive Mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Ranchi, India Clock
  const timeDisplay = document.getElementById('ranchi-time');
  function updateRanchiTime() {
    if (!timeDisplay) return;
    const now = new Date();
    // Use Asia/Kolkata timezone for Ranchi, Jharkhand
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    timeDisplay.textContent = now.toLocaleTimeString('en-US', options);
  }
  updateRanchiTime();
  setInterval(updateRanchiTime, 1000);

  // 2. Dark / Light Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('vexoo-theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('vexoo-theme', theme);
  }

  // 3. Kinetic Giant Hero Center Typography Switcher
  const heroBigTitle = document.getElementById('hero-big-title');
  const navCards = document.querySelectorAll('.hero-nav-card, .hero-stack-card');
  const defaultTitle = 'MONA RANI';

  if (heroBigTitle && navCards.length > 0) {
    navCards.forEach(card => {
      const targetTitle = card.getAttribute('data-title-preview');
      if (targetTitle) {
        card.addEventListener('mouseenter', () => {
          heroBigTitle.style.opacity = '0';
          heroBigTitle.classList.add('skew-active');
          setTimeout(() => {
            heroBigTitle.textContent = targetTitle;
            heroBigTitle.style.opacity = '1';
          }, 150);
        });

        card.addEventListener('mouseleave', () => {
          heroBigTitle.style.opacity = '0';
          heroBigTitle.classList.remove('skew-active');
          setTimeout(() => {
            heroBigTitle.textContent = defaultTitle;
            heroBigTitle.style.opacity = '1';
          }, 150);
        });
      }
    });
  }

  // 4. View Routing (Single-Page Seamless View Navigation)
  const views = {
    home: document.getElementById('view-home'),
    about: document.getElementById('view-about'),
    portfolio: document.getElementById('view-portfolio'),
    contact: document.getElementById('view-contact')
  };

  const navLinks = document.getElementById('nav-links');
  const brandLink = document.getElementById('brand-link');

  function showView(viewName) {
    window.scrollTo(0, 0);

    Object.keys(views).forEach(key => {
      if (views[key]) {
        if (key === viewName) {
          views[key].classList.add('active');
        } else {
          views[key].classList.remove('active');
        }
      }
    });

    // Update active state in nav pills
    document.querySelectorAll('.nav-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-view') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update URL hash without reload
    if (window.location.hash !== `#${viewName}` && (viewName !== 'home' || window.location.hash)) {
      window.history.pushState(null, '', `#${viewName}`);
    }

    // Toggle nav pills visibility (show when not on home)
    if (navLinks) {
      if (viewName === 'home') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
      }
    }
  }

  // Handle hash changes (back/forward or deep link)
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (views[hash]) {
      showView(hash);
    } else {
      showView('home');
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();

  // Attach click listeners to all view triggers
  document.querySelectorAll('[data-view-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-view-target');
      if (views[target]) {
        showView(target);
      }
    });
  });

  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      e.preventDefault();
      showView('home');
    });
  }

  // 5. Portfolio Category Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // 6. Portfolio Lightbox Modal
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalTools = document.getElementById('modal-tools');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-modal-img');
      const title = card.getAttribute('data-modal-title');
      const category = card.getAttribute('data-modal-category');
      const desc = card.getAttribute('data-modal-desc');
      const tools = card.getAttribute('data-modal-tools') || '';

      if (modal && modalImg && modalTitle) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDesc.textContent = desc;

        if (modalTools) {
          modalTools.innerHTML = '';
          tools.split(',').forEach(tool => {
            const badge = document.createElement('span');
            badge.className = 'modal-tool-badge';
            badge.textContent = tool.trim();
            modalTools.appendChild(badge);
          });
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // 7. Interactive Form Selection Pills
  const projectTypePills = document.querySelectorAll('#project-types-group .choice-pill');
  projectTypePills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
    });
  });

  const budgetPills = document.querySelectorAll('#budget-types-group .choice-pill');
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
    });
  });

  // 8. Contact Form Submission Feedback
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value || 'Client';

      // Show toast
      if (toast) {
        toast.textContent = `Thank you ${name}! Your inquiry has been sent to Mona Rani.`;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4500);
      }

      contactForm.reset();
      projectTypePills.forEach(p => p.classList.remove('selected'));
      budgetPills.forEach(p => p.classList.remove('selected'));
    });
  }
});
