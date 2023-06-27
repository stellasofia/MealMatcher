function handleFavoritesClick(event) {
    event.preventDefault();

    const sessionId = getCookie("session");
    if (sessionId) {
        // Session exists, redirect to favorites.html
        window.location.href = "favorites.html";
    } else {
        // Session doesn't exist, redirect to login.html
        window.location.href = "login.html";
    }
}

function toggleLoginLogoutButton(isLoggedIn) {
    const navbar = document.querySelector(".navbar-nav");

    // Remove existing login/logout buttons
    const loginButton = navbar.querySelector(".login-btn");
    const logoutButton = navbar.querySelector(".logout-btn");
    if (loginButton) {
        loginButton.remove();
    }
    if (logoutButton) {
        logoutButton.remove();
    }

    if (isLoggedIn) {
        // Add logout button
        navbar.appendChild(createButton("fa-solid fa-sign-out login-btn", "#", logout));
    } else {
        // Add login button
        navbar.appendChild(createButton("fa-solid fa-user logout-btn", "login.html"));
    }
}




function createButton(iconClass, href, clickHandler) {
    const button = document.createElement("a");
    button.className = "nav-link";
    button.href = href;
    button.innerHTML = `<i class="${iconClass}"></i>`;

    if (clickHandler) {
        button.addEventListener("click", clickHandler);
    }

    return button;
}


function logout() {
    fetch("/logout", {
        method: 'POST',
    })
        .then(response => {
            if (response.ok) {
                console.log("Logout Successful")
                toggleLoginLogoutButton(false);
            }
        })
        .catch(error => {
            console.error('Failed to logout:', error);
        });
}

// Helper function to get the value of a cookie by name
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
}
