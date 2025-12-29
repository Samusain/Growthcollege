// ENHANCED JAVASCRIPT WITH MOTION EFFECTS

// Create floating particles
function createParticles() {
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const size = Math.random() * 60 + 20;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation
    const duration = Math.random() * 20 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Add to body
    document.body.appendChild(particle);
  }
}

// Enhanced scroll animation
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add specific animations based on element type
        if (entry.target.classList.contains('program-card')) {
          setTimeout(() => {
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, 100);
        }
        
        if (entry.target.classList.contains('step')) {
          entry.target.style.transitionDelay = '0.1s';
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observe all elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Enhanced hero image hover effect
function enhanceHeroImage() {
  const heroImage = document.querySelector('.hero-image-container');
  if (!heroImage) return;
  
  heroImage.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = heroImage.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    heroImage.style.transform = `
      perspective(1000px)
      rotateY(${x * 5}deg)
      rotateX(${y * -5}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  });
  
  heroImage.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
  });
}

// Enhanced program card interactions
function enhanceProgramCards() {
  const programCards = document.querySelectorAll('.program-card');
  
  programCards.forEach(card => {
    // Tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      card.style.transform = `
        translateY(-15px)
        rotateY(${x * 5}deg)
        rotateX(${y * -5}deg)
        scale(1.02)
      `;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateY(0) rotateX(0) scale(1)';
    });
    
    // Click animation
    card.addEventListener('click', function(e) {
      if (!e.target.closest('a')) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });
}

// Dynamic counter animation for stats
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// Enhanced navigation scroll effect
function enhanceNavigation() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNav();
  });
  
  // Enhanced mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.innerHTML = navMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
  }
  
  // Close menu on link click
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      document.body.style.overflow = 'auto';
    });
  });
}

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Enhanced form submission with animation
function enhanceForm() {
  const form = document.getElementById('leadForm');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'translateY(-5px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateY(0)';
    });
    
    // Add floating label effect
    if (input.value) {
      input.parentElement.classList.add('has-value');
    }
    
    input.addEventListener('input', function() {
      if (this.value) {
        this.parentElement.classList.add('has-value');
      } else {
        this.parentElement.classList.remove('has-value');
      }
    });
  });
  
  // Enhanced submit animation
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Animate button
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call with success animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success animation
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
    submitBtn.style.background = 'linear-gradient(135deg, #1dd1a1, #17b68f)';
    
    // Show confetti effect
    showConfetti();
    
    // Reset form
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.background = '';
      showNotification('Thank you! We\'ll contact you soon. 🚀', 'success');
    }, 2000);
  });
}

// Confetti effect
function showConfetti() {
  const confettiCount = 50;
  const container = document.querySelector('.cta-final') || document.body;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎉';
    confetti.style.position = 'absolute';
    confetti.style.fontSize = '20px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    // Random position
    const x = Math.random() * window.innerWidth;
    confetti.style.left = `${x}px`;
    confetti.style.top = '-30px';
    
    // Random animation
    const duration = Math.random() * 3 + 2;
    const rotation = Math.random() * 720 - 360;
    
    confetti.style.animation = `
      confettiFall ${duration}s ease-in forwards,
      confettiSpin ${duration/2}s linear infinite
    `;
    
    container.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, duration * 1000);
  }
  
  // Add confetti styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(${Math.random() * 360}deg); opacity: 0; }
    }
    @keyframes confettiSpin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  const timeout = setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease forwards';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
  
  // Manual close
  notification.querySelector('.notification-close').addEventListener('click', () => {
    clearTimeout(timeout);
    notification.style.animation = 'slideOutRight 0.5s ease forwards';
    setTimeout(() => notification.remove(), 500);
  });
}

// Smooth scrolling with offset
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 100;
        const targetPosition = targetElement.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Parallax effect for hero
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const quote = document.querySelector('.motivational-quote');
    
    if (hero) {
      hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
    
    if (quote) {
      quote.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Create particles
  createParticles();
  
  // Initialize animations
  initScrollAnimations();
  initParallax();
  initSmoothScroll();
  
  // Enhance components
  enhanceHeroImage();
  enhanceProgramCards();
  enhanceNavigation();
  enhanceForm();
  
  // Start counter animation when stats are visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
  
  // Add motivational messages randomly
  setTimeout(() => {
    const messages = [
      "Your future in tech starts today! 💻",
      "Dream it. Code it. Live it. 🚀",
      "The best investment is in yourself! 💪",
      "Ready to transform your career? Let's go! ✨"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'info');
  }, 10000);
});

// Enhanced schedule call function
function scheduleCall() {
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
    
    // Add attention animation
    leadForm.style.animation = 'pulse 2s ease-in-out';
    setTimeout(() => {
      leadForm.style.animation = '';
    }, 2000);
    
    // Focus on name field
    const nameInput = leadForm.querySelector('input[type="text"]');
    nameInput.focus();
    
    // Show motivational message
    showNotification('Great choice! Let\'s build your future together. 🎯', 'info');
  }
}