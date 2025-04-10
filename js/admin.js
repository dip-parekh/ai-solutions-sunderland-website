
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication status
  checkAuth();
  
  // Initialize admin login form
  initLoginForm();
  
  // Initialize logout functionality
  initLogout();
  
  // Initialize sidebar toggle
  initSidebarToggle();
  
  // Initialize password visibility toggle
  initPasswordToggle();
  
  // Load admin data if authenticated
  if (isAuthenticated()) {
    loadAdminData();
  }
});

// Check if user is authenticated
function checkAuth() {
  const isAuth = isAuthenticated();
  const loginContainer = document.getElementById('loginContainer');
  const dashboardContainer = document.getElementById('dashboardContainer');
  
  if (isAuth) {
    loginContainer.classList.add('d-none');
    dashboardContainer.classList.remove('d-none');
  } else {
    loginContainer.classList.remove('d-none');
    dashboardContainer.classList.add('d-none');
  }
}

// Check if authenticated from session storage
function isAuthenticated() {
  return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Initialize the login form
function initLoginForm() {
  const form = document.getElementById('loginForm');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const loginError = document.getElementById('loginError');
      const loginButton = document.querySelector('#loginForm button[type="submit"]');
      const loginSpinner = document.getElementById('loginSpinner');
      const loginButtonText = document.getElementById('loginButtonText');
      
      // Show loading state
      loginButton.disabled = true;
      loginButtonText.textContent = 'Logging in...';
      loginSpinner.classList.remove('d-none');
      
      // Hide any previous error
      loginError.classList.add('d-none');
      
      // Simulate login process
      setTimeout(function() {
        // In a real app, this would be a server authentication check
        if (username === 'admin' && password === 'password123') {
          // Store authentication status
          sessionStorage.setItem('adminAuthenticated', 'true');
          
          // Redirect to dashboard
          checkAuth();
          loadAdminData();
        } else {
          // Show error
          loginError.classList.remove('d-none');
          
          // Reset button state
          loginButton.disabled = false;
          loginButtonText.textContent = 'Log In';
          loginSpinner.classList.add('d-none');
        }
      }, 1000);
    });
  }
}

// Initialize logout functionality
function initLogout() {
  const logoutBtn = document.getElementById('logoutButton');
  const dropdownLogout = document.getElementById('dropdownLogout');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
  
  if (dropdownLogout) {
    dropdownLogout.addEventListener('click', logout);
  }
}

// Logout function
function logout(e) {
  if (e) e.preventDefault();
  
  sessionStorage.removeItem('adminAuthenticated');
  checkAuth();
}

// Initialize sidebar toggle functionality
function initSidebarToggle() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      
      // For mobile devices, add/remove backdrop and show/hide classes
      if (window.innerWidth < 992) {
        if (sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
          removeSidebarBackdrop();
        } else {
          sidebar.classList.add('show');
          createSidebarBackdrop();
        }
      }
    });
    
    // Adjust for window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 992) {
        sidebar.classList.remove('show');
        removeSidebarBackdrop();
      }
    });
  }
}

// Create sidebar backdrop for mobile
function createSidebarBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'admin-sidebar-backdrop';
  document.body.appendChild(backdrop);
  
  backdrop.addEventListener('click', function() {
    const sidebar = document.querySelector('.admin-sidebar');
    sidebar.classList.remove('show');
    removeSidebarBackdrop();
  });
}

// Remove sidebar backdrop
function removeSidebarBackdrop() {
  const backdrop = document.querySelector('.admin-sidebar-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
}

// Initialize password visibility toggle
function initPasswordToggle() {
  const toggleBtn = document.getElementById('togglePassword');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const icon = this.querySelector('i');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  }
}

// Load admin dashboard data
function loadAdminData() {
  // Load inquiries
  loadInquiries();
  
  // Load newsletter subscribers
  loadSubscribers();
  
  // Set up refresh buttons
  const refreshInquiries = document.getElementById('refreshInquiries');
  const refreshSubscribers = document.getElementById('refreshSubscribers');
  
  if (refreshInquiries) {
    refreshInquiries.addEventListener('click', loadInquiries);
  }
  
  if (refreshSubscribers) {
    refreshSubscribers.addEventListener('click', loadSubscribers);
  }
  
  // Set up inquiry filters
  const filterLinks = document.querySelectorAll('[data-filter]');
  filterLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const filter = this.getAttribute('data-filter');
      loadInquiries(filter);
    });
  });
  
  // Set up inquiry detail modal functionality
  initInquiryDetailModal();
}

// Load inquiries data
function loadInquiries(filter = 'all') {
  const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  const inquiriesTable = document.getElementById('inquiriesTable');
  const recentInquiriesTable = document.getElementById('recentInquiriesTable');
  const inquiryBadge = document.getElementById('inquiryBadge');
  const overviewInquiryCount = document.getElementById('overviewInquiryCount');
  
  // Filter inquiries if needed
  const filteredInquiries = filter === 'all' ? 
    inquiries : 
    inquiries.filter(inquiry => inquiry.status === filter);
  
  // Update badge count (showing new inquiries count)
  const newInquiriesCount = inquiries.filter(inquiry => inquiry.status === 'new').length;
  if (inquiryBadge) {
    inquiryBadge.textContent = newInquiriesCount;
    inquiryBadge.classList.toggle('d-none', newInquiriesCount === 0);
  }
  
  if (overviewInquiryCount) {
    overviewInquiryCount.textContent = newInquiriesCount;
  }
  
  // Update main inquiries table
  if (inquiriesTable) {
    if (filteredInquiries.length === 0) {
      inquiriesTable.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-5 text-muted">No inquiries found</td>
        </tr>
      `;
    } else {
      inquiriesTable.innerHTML = filteredInquiries.map(inquiry => `
        <tr>
          <td>${inquiry.name}</td>
          <td>${inquiry.email}</td>
          <td>${inquiry.companyName}</td>
          <td>${getCountryName(inquiry.country)}</td>
          <td>${formatDate(inquiry.date)}</td>
          <td>
            <span class="status-badge status-${inquiry.status}">
              ${capitalizeFirst(inquiry.status)}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary view-inquiry-btn" data-inquiry-id="${inquiry.id}">
              View
            </button>
          </td>
        </tr>
      `).join('');
      
      // Add event listeners to view buttons
      document.querySelectorAll('.view-inquiry-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const id = this.getAttribute('data-inquiry-id');
          showInquiryDetail(id);
        });
      });
    }
  }
  
  // Update recent inquiries table on overview page
  if (recentInquiriesTable) {
    const recentInquiries = [...inquiries].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    
    if (recentInquiries.length === 0) {
      recentInquiriesTable.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-4 text-muted">No inquiries yet</td>
        </tr>
      `;
    } else {
      recentInquiriesTable.innerHTML = recentInquiries.map(inquiry => `
        <tr>
          <td>${inquiry.name}</td>
          <td>${inquiry.companyName}</td>
          <td>${formatDate(inquiry.date)}</td>
          <td>
            <span class="status-badge status-${inquiry.status}">
              ${capitalizeFirst(inquiry.status)}
            </span>
          </td>
        </tr>
      `).join('');
    }
  }
}

// Load newsletter subscribers data
function loadSubscribers() {
  const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
  const subscribersTable = document.getElementById('subscribersTable');
  const overviewSubscriberCount = document.getElementById('overviewSubscriberCount');
  
  if (overviewSubscriberCount) {
    overviewSubscriberCount.textContent = subscribers.length;
  }
  
  if (subscribersTable) {
    if (subscribers.length === 0) {
      subscribersTable.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-5 text-muted">No subscribers found</td>
        </tr>
      `;
    } else {
      subscribersTable.innerHTML = subscribers.map((subscriber, index) => `
        <tr>
          <td>${subscriber.email}</td>
          <td>${formatDate(subscriber.date)}</td>
          <td>
            <span class="status-badge ${subscriber.status === 'active' ? 'status-contacted' : 'status-closed'}">
              ${capitalizeFirst(subscriber.status)}
            </span>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary subscriber-status-btn" data-index="${index}" data-status="${subscriber.status === 'active' ? 'inactive' : 'active'}">
                ${subscriber.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
              </button>
              <button class="btn btn-outline-danger subscriber-delete-btn" data-index="${index}">
                Delete
              </button>
            </div>
          </td>
        </tr>
      `).join('');
      
      // Add event listeners to subscriber action buttons
      document.querySelectorAll('.subscriber-status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          const newStatus = this.getAttribute('data-status');
          updateSubscriberStatus(index, newStatus);
        });
      });
      
      document.querySelectorAll('.subscriber-delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const index = this.getAttribute('data-index');
          deleteSubscriber(index);
        });
      });
    }
  }
}

// Initialize inquiry detail modal
function initInquiryDetailModal() {
  const saveStatusBtn = document.getElementById('saveInquiryStatus');
  
  if (saveStatusBtn) {
    saveStatusBtn.addEventListener('click', function() {
      const inquiryId = this.getAttribute('data-inquiry-id');
      const newStatus = document.getElementById('detailStatus').value;
      
      updateInquiryStatus(inquiryId, newStatus);
    });
  }
}

// Show inquiry details in modal
function showInquiryDetail(id) {
  const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  const inquiry = inquiries.find(item => item.id == id);
  
  if (inquiry) {
    // Populate modal fields
    document.getElementById('detailName').textContent = inquiry.name;
    document.getElementById('detailEmail').textContent = inquiry.email;
    document.getElementById('detailPhone').textContent = inquiry.phone;
    document.getElementById('detailCompany').textContent = inquiry.companyName;
    document.getElementById('detailCountry').textContent = getCountryName(inquiry.country);
    document.getElementById('detailJobTitle').textContent = inquiry.jobTitle;
    document.getElementById('detailMessage').textContent = inquiry.message;
    document.getElementById('detailDate').textContent = formatDate(inquiry.date);
    document.getElementById('detailStatus').value = inquiry.status;
    
    // Set the inquiry ID on the save button
    document.getElementById('saveInquiryStatus').setAttribute('data-inquiry-id', id);
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('inquiryDetailModal'));
    modal.show();
  }
}

// Update inquiry status
function updateInquiryStatus(id, status) {
  const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
  const index = inquiries.findIndex(item => item.id == id);
  
  if (index !== -1) {
    inquiries[index].status = status;
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    // Hide the modal
    const modalElement = document.getElementById('inquiryDetailModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    
    // Reload inquiries data
    loadInquiries();
    
    // Show success message
    showToast('Updated', 'Inquiry status updated successfully', 'success');
  }
}

// Update subscriber status
function updateSubscriberStatus(index, status) {
  const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
  
  if (subscribers[index]) {
    subscribers[index].status = status;
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    // Reload subscribers data
    loadSubscribers();
    
    // Show success message
    showToast('Updated', 'Subscriber status updated successfully', 'success');
  }
}

// Delete subscriber
function deleteSubscriber(index) {
  const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
  
  if (subscribers[index]) {
    const email = subscribers[index].email;
    subscribers.splice(index, 1);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    // Reload subscribers data
    loadSubscribers();
    
    // Show success message
    showToast('Deleted', `Subscriber ${email} deleted successfully`, 'success');
  }
}

// Helper Functions

// Format date
function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
}

// Get country name from code
function getCountryName(code) {
  const countries = {
    'uk': 'United Kingdom',
    'us': 'United States',
    'ca': 'Canada',
    'au': 'Australia',
    'de': 'Germany',
    'fr': 'France',
    'jp': 'Japan',
    'other': 'Other'
  };
  
  return countries[code] || code;
}

// Capitalize first letter
function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
