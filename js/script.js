document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxiLTVKTsee6-QA-4Br4RnwTDL5xvnfNXgQqjnaTiTppeniLWpAuGgH3-qvJftiM2a-Mg/exec'; // <--- Paste your App Script URL here

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.querySelector('.btn-submit-modern');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Processing...";
        submitBtn.disabled = true;

        const formData = new FormData(registrationForm);
        formData.append('location', 'Dammam');

        // Collect schedule radio values
        const wedChecked = document.querySelector('input[name="wednesday_schedule"]:checked');
        if (wedChecked) formData.set('wednesday_schedule', wedChecked.value);

        const satChecked = document.querySelector('input[name="saturday_schedule"]:checked');
        if (satChecked) formData.set('saturday_schedule', satChecked.value);

        fetch(scriptURL, { 
            method: 'POST', 
            body: formData 
        })
        .then(response => {
            alert('Registration Successful!');
            registrationForm.reset();
            // Reset schedule dropdown placeholders
            document.querySelectorAll('.schedule-dropdown .placeholder-text').forEach(el => {
                el.textContent = 'Select your schedule';
            });
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Submission failed. Please try again.');
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });

    // Close schedule dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.schedule-dropdown').forEach(function(dropdown) {
            if (!dropdown.contains(e.target)) {
                dropdown.querySelector('.checkboxes-container').style.display = 'none';
                dropdown.querySelector('.arrow').classList.remove('open');
            }
        });
    });

    // Update placeholder text when radio selection changes and close dropdown
    document.querySelectorAll('.schedule-dropdown input[type="radio"]').forEach(function(rb) {
        rb.addEventListener('change', function() {
            const dropdown = this.closest('.schedule-dropdown');
            const placeholder = dropdown.querySelector('.placeholder-text');
            placeholder.textContent = this.value;
            // Auto-close dropdown after selection
            dropdown.querySelector('.checkboxes-container').style.display = 'none';
            dropdown.querySelector('.arrow').classList.remove('open');
        });
    });
});

function toggleScheduleDropdown(id) {
    event.stopPropagation();
    var dropdown = document.getElementById(id);
    var container = dropdown.querySelector('.checkboxes-container');
    var arrow = dropdown.querySelector('.arrow');
    var isOpen = container.style.display === 'block';

    // Close all other dropdowns
    document.querySelectorAll('.schedule-dropdown').forEach(function(d) {
        if (d.id !== id) {
            d.querySelector('.checkboxes-container').style.display = 'none';
            d.querySelector('.arrow').classList.remove('open');
        }
    });

    container.style.display = isOpen ? 'none' : 'block';
    arrow.classList.toggle('open', !isOpen);
}
