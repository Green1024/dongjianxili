/* ====== 东鉴西历 官网 JavaScript ====== */

document.addEventListener('DOMContentLoaded', () => {

  // ====== Navbar Scroll Effect ======
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ====== Mobile Menu Toggle ======
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ====== Scroll-Triggered Animations (Intersection Observer) ======
  const animateElements = document.querySelectorAll('.feature-card, .detail-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay')) || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));

  // ====== Smooth Scroll for anchor links ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ====== Parallax effect on hero ======
  const hero = document.getElementById('hero');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      const bg = hero.querySelector('.hero-bg');
      if (bg) {
        bg.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
      const content = hero.querySelector('.hero-content');
      if (content) {
        content.style.transform = `translateY(${scrolled * 0.08}px)`;
        content.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
      }
    }
  });

  // ====== Counter Animation for score ======
  function animateCounter() {
    const scoreNum = document.querySelector('.score-num');
    if (!scoreNum) return;
    const rect = scoreNum.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const target = parseInt(scoreNum.textContent);
      let current = 0;
      const increment = Math.ceil(target / 30);
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        scoreNum.textContent = current;
      }, 50);
      window.removeEventListener('scroll', counterHandler);
    }
  }

  const counterHandler = () => animateCounter();
  window.addEventListener('scroll', counterHandler, { passive: true });

  // ====== Scroll progress indicator (optional) ======
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    z-index: 1001;
    transition: width 0.1s;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ====== Console Easter Egg ======
  console.log('%c☰ 东鉴西历', 'font-size: 24px; font-weight: bold; color: #8B1A1A;');
  console.log('%c东方智慧为鉴，西方运历为伴', 'font-size: 14px; color: #9b8c75;');
  console.log('%c📱 微信搜索「东鉴西历」体验', 'font-size: 12px; color: #7a6e5e;');

});
