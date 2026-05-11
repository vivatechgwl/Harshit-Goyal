document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Sticky Navbar Effect on Scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // --- 2. Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Switch Icon
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // --- 3. Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    // Intersection Observer to start counting when visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + (target > 50 ? "+" : "");
                    }
                };
                updateCount();
                observer.unobserve(counter); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 4. Form Validation ---
    const form = document.getElementById('inquiry-form');
    const nameInput = document.getElementById('name');
    const contactInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission for demo
        
        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === '') {
            setError(nameInput, 'Name cannot be blank');
            isValid = false;
        } else {
            setSuccess(nameInput);
        }

        // Validate Contact Number
        if (contactInput.value.trim() === '') {
            setError(contactInput, 'Contact Number cannot be blank');
            isValid = false;
        } else if (!isContactValid(contactInput.value.trim())) {
            setError(contactInput, 'Please enter a valid Contact Number');
            isValid = false;
        } else {
            setSuccess(contactInput);
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            setError(messageInput, 'Message cannot be blank');
            isValid = false;
        } else {
            setSuccess(messageInput);
        }

        // If form is valid
        if(isValid) {
            alert("Thank you! Your message has been sent successfully.");
            form.reset();
        }
    });

    // Helper Functions for Validation
    function setError(input, message) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('small');
        formGroup.classList.add('error');
        small.innerText = message;
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }

    function isContactValid(contact) {
        // Basic Regex for contact number validation
        return /^\+?\d{10,15}$/.test(contact);
    }
});
function sync() {
    // LocalStorage se booked seats uthana
    const bookings = JSON.parse(localStorage.getItem('libData')) || {};
    const totalSeats = 143; 
    const bookedCount = Object.keys(bookings).length;
    const availableCount = totalSeats - bookedCount;

    // Counter update karna
    const availableElement = document.getElementById('available-count');
    if (availableElement) {
        availableElement.innerText = availableCount;
    }

    // Seat Layout sync karna (Color Change)
    document.querySelectorAll('.seat').forEach(seat => {
        const id = seat.innerText.trim();
        if (bookings[id]) {
            seat.classList.add('booked'); // Orange
        } else {
            seat.classList.remove('booked'); // Green/White
        }
    });
}

// Initial Call and Auto Refresh
setInterval(sync, 3000);

