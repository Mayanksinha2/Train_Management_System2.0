function validateRegistrationForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const aadharNumber = document.getElementById('aadharNumber').value;

    const usernameRegex = /^[a-zA-Z]{6,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileNumberRegex = /^\d{10}$/;

    if (!usernameRegex.test(username)) {
        alert('Username must be at least 6 characters long and contain no special characters or numbers.');
        return false;
    }
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, contain at least one special character, one number, and one uppercase letter.');
        return false;
    }
    if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match.');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Invalid email format.');
        return false;
    }
    if (!mobileNumberRegex.test(mobileNumber)) {
        alert('Mobile Number must be 10 digits long and contain no alphabets.');
        return false;
    }
    if (!aadharNumber) {
        alert('Aadhar Number cannot be null.');
        return false;
    }

    // Store user details in local storage
    const user = {
        username: username,
        password: password,
        email: email,
        mobileNumber: mobileNumber,
        aadharNumber: aadharNumber
    };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful! Redirecting to login page...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);

    return false;
}