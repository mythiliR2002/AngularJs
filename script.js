// Save the user info in localStorage to use on another page
let userInfo = {};

document.getElementById('signInBtn').addEventListener('click', () => {
    location.reload(); // Refresh the page when "Sign In" is clicked
});

document.getElementById('myInfoBtn').addEventListener('click', () => {
    window.location.href = 'myinfo.html'; // Navigate to My Info page
});

function validateForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const favouriteFood = document.getElementById('favouriteFood').value;

    // Validate favourite food number (L1 to L10)
    const isValidFoodNumber = favouriteFood.startsWith('L') && !isNaN(favouriteFood.substring(1)) && parseInt(favouriteFood.substring(1)) >= 1 && parseInt(favouriteFood.substring(1)) <= 10;

    if (isValidFoodNumber) {
        // Store user information in localStorage
        userInfo = {
            name: name,
            phone: phone,
            email: email,
            favouriteFood: favouriteFood
        };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        document.getElementById('message').innerText = "Your information has been saved.";

    } else {
        document.getElementById('message').innerText = "No such menu number exists.";
    }

    // Prevent form submission to keep the page intact
    return false;
}
