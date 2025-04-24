// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });
  
  // Initialize EmailJS
  // Replace "your_user_id" with your actual EmailJS User ID
  emailjs.init("sWuzBxd-iogYzp37Y");
  
  // Typing animation
  const typed = new Typed('#typing-text', {
    strings: [
      'Penetration Testing',
      'Network Security',
      'Vulnerability Assessment',
      'Forensic Analysis',
      'Ethical Hacking'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
  });
  
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Skills Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Hide all tab contents
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Show the corresponding tab content
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });
  
  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Testimonial Slider
  const track = document.querySelector('.testimonial-track');
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentIndex = 0;
  
  // Check if testimonial elements exist before initializing slider
  if (track && testimonials.length > 0 && dots.length > 0 && prevBtn && nextBtn) {
    // Set initial position
    updateSlider();
    
    // Next button click
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlider();
    });
    
    // Dot click
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
    
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Auto slide testimonials
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    }, 5000);
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  // Contact form submission with EmailJS
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add form status element if it doesn't exist
    let formStatus = document.getElementById('form-status');
    if (!formStatus) {
      formStatus = document.createElement('div');
      formStatus.id = 'form-status';
      contactForm.appendChild(formStatus);
    }
    
    // Get submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Change button text and disable it during submission
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const templateParams = {
        user_name: document.getElementById('name').value,
        user_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Send the email using EmailJS
      // Replace "your_service_id" and "your_template_id" with your actual EmailJS credentials
      emailjs.send('service_zfm9dgz', 'template_q7polc2', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Show success message
          formStatus.innerHTML = '<div class="success-message">Your message has been sent successfully! I\'ll get back to you soon.</div>';
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 5000);
        }, function(error) {
          console.log('FAILED...', error);
          
          // Show error message
          formStatus.innerHTML = '<div class="error-message">Failed to send message. Please try again later or contact me directly at praveenashan862@gmail.com</div>';
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          
          // Clear error message after 5 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 5000);
        });
    });
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== RESUME DOWNLOAD FUNCTIONALITY =====
  const resumeDownloadBtn = document.querySelector('.download-btn');
  
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const resumePath = this.getAttribute('href');
      console.log('Attempting to download resume from:', resumePath);
      
      // Check if file exists
      fetch(resumePath, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Resume file not found');
          }
          return fetch(resumePath);
        })
        .then(response => response.blob())
        .then(blob => {
          // Create a blob URL
          const blobUrl = window.URL.createObjectURL(blob);
          
          // Create a temporary link element
          const tempLink = document.createElement('a');
          tempLink.href = blobUrl;
          tempLink.download = 'PRAVEENA_S_Resume.pdf';
          
          // Append to document, click, and remove
          document.body.appendChild(tempLink);
          tempLink.click();
          
          // Clean up
          setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(tempLink);
          }, 100);
          
          // Show success message
          const downloadMessage = document.createElement('div');
          downloadMessage.className = 'download-message';
          downloadMessage.innerHTML = '<div class="success-message">Resume download started!</div>';
          document.body.appendChild(downloadMessage);
          
          // Remove message after 3 seconds
          setTimeout(() => {
            document.body.removeChild(downloadMessage);
          }, 3000);
        })
        .catch(error => {
          console.error('Error downloading resume:', error);
          
          // Show error message
          const downloadMessage = document.createElement('div');
          downloadMessage.className = 'download-message';
          downloadMessage.innerHTML = '<div class="error-message">Unable to download resume. Please try again later.</div>';
          document.body.appendChild(downloadMessage);
          
          // Remove message after 3 seconds
          setTimeout(() => {
            document.body.removeChild(downloadMessage);
          }, 3000);
          
          // Fallback: Try to open the PDF in a new tab
          window.open(resumePath, '_blank');
        });
    });
  }
});