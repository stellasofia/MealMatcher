document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#form2Example17')) {
        const loginButton = document.querySelector('.btn-dark');
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();

            // Get the username and password values from the form
            const username = document.querySelector('#form2Example17').value;
            const password = document.querySelector('#form2Example27').value;

            // Send a POST request to the server to perform the login
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then(function(response) {
                    if (response.ok) {
                        // Login successful
                        window.location.href = 'index.html'; // Redirect to the home page
                    } else {
                        // Login failed
                        response.json().then(function(errorResponse) {
                            const { usernameError, passwordError } = errorResponse;

                            showError(usernameError, passwordError);
                        });
                    }
                })
                .catch(function(error) {
                    console.error('An error occurred during login:', error);
                });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const favoritesButton = document.querySelector(".fa-heart");
    if(favoritesButton){
        favoritesButton.addEventListener("click", handleFavoritesClick);
    }
});

function showError(usernameErrorMessage, passwordErrorMessage) {
    const usernameErrorElement = document.querySelector('.username-error-message');
    const passwordErrorElement = document.querySelector('.password-error-message');

    usernameErrorElement.textContent = usernameErrorMessage;
    passwordErrorElement.textContent = passwordErrorMessage;

    usernameErrorElement.style.color = 'red';
    passwordErrorElement.style.color = 'red';
}
