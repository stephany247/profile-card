document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.getElementById("current-time");
  if (timeEl) {
    function updateTime() {
      timeEl.textContent = `${Date.now()}ms`;
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      (currentPath === "/" && linkPath === "/index.html") ||
      currentPath.includes(linkPath)
    ) {
      link.classList.add("active");
    }
  });

  const form = document.getElementById("contact-form");
  if (!form) return;

  const successMsg = document.getElementById("test-contact-success");

  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message"),
  };

  const errors = {
    name: document.getElementById("test-contact-error-name"),
    email: document.getElementById("test-contact-error-email"),
    subject: document.getElementById("test-contact-error-subject"),
    message: document.getElementById("test-contact-error-message"),
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    successMsg.hidden = true;
    Object.values(errors).forEach((el) => (el.textContent = ""));

    // Name
    if (fields.name.value.trim() === "") {
      errors.name.textContent = "Please enter your full name.";
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fields.email.value.trim() === "") {
      errors.email.textContent = "Please enter your email address.";
      isValid = false;
    } else if (!emailPattern.test(fields.email.value.trim())) {
      errors.email.textContent =
        "Please enter a valid email (name@example.com).";
      isValid = false;
    }

    // Subject
    if (fields.subject.value.trim() === "") {
      errors.subject.textContent = "Please enter a subject.";
      isValid = false;
    }

    // Message
    if (fields.message.value.trim().length < 10) {
      errors.message.textContent =
        "Your message must be at least 10 characters long.";
      isValid = false;
    }

    if (isValid) {
      form.reset();
      successMsg.hidden = false;
    }
  });
});

const successToast = document.getElementById("test-contact-success");

function showSuccessToast() {
  successToast.classList.add("show");
  setTimeout(() => {
    successToast.classList.remove("show");
  }, 3000); // disappears after 3 seconds
}

// Example usage (after form submission success)
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // simulate successful send
  showSuccessToast();
});
