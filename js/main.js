
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the navigation
  initNavigation();
  
  // Initialize the newsletter form
  initNewsletterForm();
  
  // Initialize the testimonial carousel
  initTestimonialCarousel();
});

// Navigation scroll behavior
function initNavigation() {
  const nav = document.getElementById('mainNav');
  
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('navbar-shrink');
      } else {
        nav.classList.remove('navbar-shrink');
      }
    });
  }
}

// Newsletter form submission
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.getElementById('newsletter-email').value;
      const submitBtn = document.getElementById('newsletter-submit');
      const originalBtnText = submitBtn.innerHTML;
      
      // Disable the button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Subscribing...';
      
      // Simulate form submission
      setTimeout(function() {
        // Store the email in localStorage for demo purposes
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        subscribers.push({
          email: email,
          date: new Date().toISOString().split('T')[0],
          status: 'active'
        });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        // Reset form
        form.reset();
        
        // Show success message
        showToast('Success!', 'Thanks for subscribing to our newsletter!', 'success');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1500);
    });
  }
}

// Testimonial carousel
function initTestimonialCarousel() {
  const testimonials = document.querySelectorAll('.testimonial-item');
  const navBtns = document.querySelectorAll('.testimonial-nav');
  
  if (testimonials.length > 0) {
    let currentIndex = 0;
    
    // Set up navigation buttons
    navBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const direction = this.getAttribute('data-direction');
        
        if (direction === 'prev') {
          currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        } else {
          currentIndex = (currentIndex + 1) % testimonials.length;
        }
        
        showTestimonial(currentIndex);
      });
    });
    
    // Auto-rotate testimonials
    if (testimonials.length > 1) {
      setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
      }, 5000);
    }
  }
}

// Show a specific testimonial
function showTestimonial(index) {
  const testimonials = document.querySelectorAll('.testimonial-item');
  
  testimonials.forEach((item, i) => {
    if (i === index) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Toast notification system
function showToast(title, message, type = 'info') {
  // Check if toast container exists, if not create it
  let toastContainer = document.querySelector('.toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  // Create the toast element
  const toastId = 'toast-' + Date.now();
  const toast = document.createElement('div');
  toast.className = `toast align-items-center border-0`;
  toast.id = toastId;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  
  // Set toast background color based on type
  let bgColor;
  switch (type) {
    case 'success':
      bgColor = 'bg-success text-white';
      break;
    case 'error':
      bgColor = 'bg-danger text-white';
      break;
    case 'warning':
      bgColor = 'bg-warning';
      break;
    default:
      bgColor = 'bg-primary text-white';
  }
  
  // Create toast content
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <strong>${title}</strong> ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  toast.classList.add(bgColor);
  
  // Append toast to container
  toastContainer.appendChild(toast);
  
  // Initialize Bootstrap toast and show it
  const bsToast = new bootstrap.Toast(toast, {
    delay: 5000,
    autohide: true
  });
  bsToast.show();
  
  // Remove toast from DOM after it's hidden
  toast.addEventListener('hidden.bs.toast', function() {
    toast.remove();
  });
}
