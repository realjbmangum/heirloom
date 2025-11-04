// ================================
// Heirloom — Main JavaScript
// ================================

// ================================
// Smooth Scroll for Anchor Links
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Skip if it's just "#"
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ================================
// Fade-in Animation on Scroll
// ================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: Stop observing after animation
      // fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach(el => fadeInObserver.observe(el));
});

// ================================
// Header Scroll Effect
// ================================

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add shadow when scrolled
  if (currentScroll > 50) {
    header.style.boxShadow = '0 2px 10px rgba(12, 59, 46, 0.08)';
  } else {
    header.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// ================================
// Form Handling
// ================================

// Function to handle form submission
async function handleFormSubmit(event, formId) {
  event.preventDefault();

  const form = event.target;
  const formMessage = form.querySelector('#formMessage');
  const submitButton = form.querySelector('button[type="submit"]');
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');

  // Get form values
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  // Basic validation
  if (!name || !email) {
    showFormMessage(formMessage, 'Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage(formMessage, 'Please enter a valid email address.', 'error');
    return;
  }

  // Disable button during submission
  submitButton.disabled = true;
  submitButton.textContent = 'Joining...';

  try {
    // For now, we'll use a placeholder submission
    // In production, replace with actual Supabase endpoint
    const response = await submitToWaitlist(name, email, formId);

    if (response.success) {
      showFormMessage(
        formMessage,
        '🎉 Welcome to Heirloom! Check your email for next steps.',
        'success'
      );
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    showFormMessage(
      formMessage,
      'Something went wrong. Please try again or email us directly.',
      'error'
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = formId === 'foundingCircleForm'
      ? 'Join the Founding Circle'
      : 'Join the Waitlist';
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form message
function showFormMessage(messageElement, text, type) {
  messageElement.textContent = text;
  messageElement.className = `form-message ${type}`;
  messageElement.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

// Placeholder submission function
// Replace this with actual Supabase integration
async function submitToWaitlist(name, email, formType) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Log to console for now
  console.log('Waitlist Submission:', {
    name,
    email,
    formType,
    timestamp: new Date().toISOString()
  });

  // TODO: Replace with actual Supabase submission
  // Example Supabase code:
  /*
  const { data, error } = await supabase
    .from('waitlist')
    .insert([
      {
        name: name,
        email: email,
        form_type: formType,
        created_at: new Date()
      }
    ]);

  if (error) throw error;
  return { success: true, data };
  */

  // For now, always return success
  return { success: true };
}

// Attach form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Home page waitlist form
  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => handleFormSubmit(e, 'waitlistForm'));
  }

  // About page founding circle form
  const foundingCircleForm = document.getElementById('foundingCircleForm');
  if (foundingCircleForm) {
    foundingCircleForm.addEventListener('submit', (e) => handleFormSubmit(e, 'foundingCircleForm'));
  }
});

// ================================
// Optional: Add cursor effect for luxury feel
// ================================

// Uncomment if you want to add a subtle cursor glow effect
/*
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor-glow');
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});
*/

// ================================
// Performance optimization
// ================================

// Lazy load images if added in the future
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ================================
// Console message (optional easter egg)
// ================================

console.log(
  '%cHeirloom',
  'font-size: 2rem; font-family: "Cormorant Garamond", serif; color: #C4A464; font-style: italic;'
);
console.log(
  '%cPreserving memories for generations.',
  'font-size: 1rem; color: #0C3B2E; font-family: "Inter", sans-serif;'
);
console.log(
  '%cInterested in joining our team? Reach out to us!',
  'font-size: 0.9rem; color: #666;'
);
