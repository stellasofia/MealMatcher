document.addEventListener('DOMContentLoaded', function() {

    if (document.querySelector('#form2Example17')) { //code läuft nur in login page(sonst error in favorites page)
        const loginButton = document.querySelector('.btn-dark');
        loginButton.addEventListener('click', async function(event) {
            event.preventDefault();

            // Get the username and password values from the form
            const username = document.querySelector('#form2Example17').value;
            const password = document.querySelector('#form2Example27').value;

            // Send a POST request to the server to perform the login
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.ok) {
                    // Login successful
                    window.location.href = 'index.html'; // Redirect to the home page
                } else {
                    // Login failed
                    const error = await response.text();
                    console.error(error);
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            }
        });
    }


});

document.addEventListener("DOMContentLoaded", () => {

    const favoritesButton = document.querySelector(".fa-heart");
    if(favoritesButton){
        favoritesButton.addEventListener("click", handleFavoritesClick);
    }
});

