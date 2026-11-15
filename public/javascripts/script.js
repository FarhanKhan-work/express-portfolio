// public/javascripts/script.js
// my own JavaScript file, it runs on every page because the layout loads it

// I wrapped everything in a function that runs right away
// so my variables don't mess with anything else on the page
(function () {
  'use strict'; // makes JavaScript stricter so it catches mistakes

  // FOOTER YEAR
  // finding the span with id="year" in my footer
  var year = document.getElementById('year');
  // if it exists, put the current year in it so I never have to update it
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // CONTACT FORM CHECKING
  // finding every form with the class needs-validation (only my contact form has it)
  var forms = document.querySelectorAll('.needs-validation');

  // going through each form
  forms.forEach(function (form) {
    // when someone hits submit
    form.addEventListener('submit', function (event) {
      // checkValidity checks all the required fields and the email format
      if (!form.checkValidity()) {
        event.preventDefault();  // stops the form from sending
        event.stopPropagation(); // stops the event from going any further
      }
      // was-validated is a Bootstrap class that shows red or green on the fields
      form.classList.add('was-validated');
    });
  });
  
  // BACK TO TOP BUTTON
  var topBtn = document.getElementById('backToTop');
  if (topBtn) {
    // show the button after you scroll down 300px, hide it when you're near the top
    window.addEventListener('scroll', function () {
      topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    // when you click it, scroll smoothly back to the top
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();