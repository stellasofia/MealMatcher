document.addEventListener('DOMContentLoaded', function() {
    // Select the registration form
    const registerForm = document.querySelector('form');

    // Add an event listener to the form submission
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        //username und passwort von form kriegen
        const username = document.querySelector('#form2Example17').value;
        const password = document.querySelector('#form2Example27').value;

        //post request fetchen
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });


            if (response.ok) {
                // Registration success
                window.location.href = "login.html";
            } else {
                // Registration failed
                const error = await response.text();
                console.error(error);
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
        }
    });

    const registerButton = document.querySelector('.btn-dark');
    registerButton.addEventListener('click', function() {
        registerForm.dispatchEvent(new Event('submit'));
    });
});
