
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the contact form
  initContactForm();
});

// Handle contact form submission
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        companyName: document.getElementById('companyName').value,
        country: document.getElementById('country').value,
        jobTitle: document.getElementById('jobTitle').value,
        message: document.getElementById('message').value,
        date: new Date().toISOString().split('T')[0],
        status: 'new'
      };
      
      // UI elements
      const submitButton = document.getElementById('submitButton');
      const submitText = document.getElementById('submitText');
      const submitSpinner = document.getElementById('submitSpinner');
      
      // Show loading state
      submitButton.disabled = true;
      submitText.textContent = 'Submitting...';
      submitSpinner.classList.remove('d-none');
      
      // Simulate form submission (in a real application this would be an API call)
      setTimeout(function() {
        // Store in localStorage for demo purposes
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        formData.id = Date.now(); // Use timestamp as unique ID
        inquiries.push(formData);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        
        // Reset form
        form.reset();
        
        // Reset button state
        submitButton.disabled = false;
        submitText.textContent = 'Submit Inquiry';
        submitSpinner.classList.add('d-none');
        
        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
      }, 1500);
    });
  }
  
  // Initialize newsletter form on the contact page
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = document.getElementById('newsletterEmail').value;
      const submitBtn = document.getElementById('newsletterSubmit');
      const originalBtnText = submitBtn.textContent;
      
      // Disable the button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
      
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
        newsletterForm.reset();
        
        // Show success message
        showToast('Success!', 'Thanks for subscribing to our newsletter!', 'success');
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }, 1500);
    });
  }
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
