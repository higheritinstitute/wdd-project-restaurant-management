// Restaurant Management System Script

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all interactive components

  // Update current date and time
  function updateDateTime() {
    const now = new Date();
    const dateTimeStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const dateTimeElement = document.getElementById('current-datetime');
    if (dateTimeElement) {
      dateTimeElement.textContent = dateTimeStr;
    }
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });

  // Order processing buttons
  document.querySelectorAll('.btn-sm').forEach(button => {
    button.addEventListener('click', function () {
      const orderId =
        this.closest('tr').querySelector('td:first-child').textContent;
      const action = this.textContent;

      alert(`Processing ${action} for ${orderId}`);

      // Simulate processing
      this.textContent = 'Processing...';
      this.disabled = true;

      setTimeout(() => {
        this.textContent = 'Completed';
        this.style.background = '#27ae60';
      }, 1500);
    });
  });

  // Reservation buttons
  document.querySelectorAll('.reservation-actions .btn-sm').forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.reservation-card');
      const name = card.querySelector('h3').textContent;
      const action = this.textContent;

      if (action === 'Confirm') {
        alert(`Reservation confirmed for ${name}`);
        card.classList.add('confirmed');
        card.querySelector('.reservation-actions').innerHTML =
          '<span class="confirmed-text">Confirmed</span>';
      } else if (action === 'Cancel') {
        alert(`Reservation cancelled for ${name}`);
        card.style.opacity = '0.5';
        card.querySelector('.reservation-actions').innerHTML =
          '<span class="cancelled-text">Cancelled</span>';
      }
    });
  });

  // Add item functionality
  document
    .querySelector('.btn[data-action="add-item"]')
    ?.addEventListener('click', function () {
      const itemName = prompt('Enter item name:');
      if (itemName) {
        const price = prompt('Enter price:');
        if (price) {
          const category = prompt(
            'Enter category (Appetizer/Main Course/Dessert):'
          );

          const menuGrid = document.querySelector('.menu-grid');
          const newItem = document.createElement('div');
          newItem.className = 'menu-item';
          newItem.innerHTML = `
                  <div class="menu-item-header">
                      <h3>${itemName}</h3>
                      <span class="price">$${parseFloat(price).toFixed(
                        2
                      )}</span>
                  </div>
                  <p>New menu item</p>
                  <div class="menu-tags">
                      <span class="tag category">${category || 'New'}</span>
                  </div>
              `;

          menuGrid.appendChild(newItem);
          alert('Item added successfully!');
        }
      }
    });

  // Initialize stats with random data (for demo purposes)
  function updateStats() {
    const stats = document.querySelectorAll('.stat-card h3');
    stats.forEach(stat => {
      const currentValue = parseInt(stat.textContent);
      const newValue = currentValue + Math.floor(Math.random() * 10) - 5;
      if (newValue > 0) {
        stat.textContent = newValue;
      }
    });
  }

  // Update stats every 30 seconds
  setInterval(updateStats, 30000);

  // Initialize date/time and update every minute
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Add active state to navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);

  // Print menu functionality
  document
    .querySelector('.btn[data-action="print-menu"]')
    ?.addEventListener('click', function () {
      window.print();
    });

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 25px;
          background: ${
            type === 'success'
              ? '#27ae60'
              : type === 'error'
              ? '#e74c3c'
              : '#3498db'
          };
          color: white;
          border-radius: 5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          animation: slideIn 0.3s ease;
      `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
      @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
      }
      .active {
          background-color: var(--accent) !important;
      }
  `;
  document.head.appendChild(style);

  // Demo: Show welcome notification
  setTimeout(() => {
    showNotification('Welcome to Restaurant Management System!', 'success');
  }, 1000);
});
