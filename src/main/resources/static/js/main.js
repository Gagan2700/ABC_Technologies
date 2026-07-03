document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Responsive navigation toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Form Validation & Contact Submission ---------- */
  var forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(function (form) {

    form.addEventListener('submit', function (e) {

      e.preventDefault();

      var valid = true;
      var fields = form.querySelectorAll('[required]');

      fields.forEach(function (field) {

        var group = field.closest('.form-group');
        var value = field.value.trim();
        var fieldValid = true;

        if (!value) {
          fieldValid = false;
        } else if (
          field.type === 'email' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          fieldValid = false;
        } else if (
          field.type === 'tel' &&
          value.length < 7
        ) {
          fieldValid = false;
        }

        if (group) {
          group.classList.toggle('error', !fieldValid);
        }

        if (!fieldValid) {
          valid = false;
        }
      });

      var successBox = form.querySelector('.form-success');

      if (valid) {

        const formData = {
          name: form.querySelector('[name="name"]')?.value || '',
          company: form.querySelector('[name="company"]')?.value || '',
          email: form.querySelector('[name="email"]')?.value || '',
          phone: form.querySelector('[name="phone"]')?.value || '',
          subject: form.querySelector('[name="subject"]')?.value || '',
          message: form.querySelector('[name="message"]')?.value || ''
        };

        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server Error');
          }
          return response.text();
        })
        .then(data => {

          console.log(data);

          if (successBox) {
            successBox.classList.add('visible');
          }

          form.reset();

          form.querySelectorAll('.form-group.error').forEach(function (g) {
            g.classList.remove('error');
          });

        })
        .catch(error => {
          console.error(error);

          if (successBox) {
            successBox.classList.remove('visible');
          }

          alert('Unable to submit form. Please try again.');
        });
      } else {

        if (successBox) {
          successBox.classList.remove('visible');
        }

      }

    });

  });

  /* ---------- Gallery filtering ---------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  if (filterButtons.length && galleryItems.length) {

    filterButtons.forEach(function (btn) {

      btn.addEventListener('click', function () {

        filterButtons.forEach(function (b) {
          b.classList.remove('active');
        });

        btn.classList.add('active');

        var category = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {

          var itemCategory = item.getAttribute('data-category');

          var show =
            category === 'all' ||
            category === itemCategory;

          item.style.display = show ? '' : 'none';

        });

      });

    });

  }

});