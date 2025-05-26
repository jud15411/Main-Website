// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    // Replace 'your-secure-password' with your chosen password
    if (password === 'Judson07190715!') {
        // Set authentication token
        localStorage.setItem('isAuthenticated', 'true');
        // Redirect to projects page
        window.location.href = 'projects.html';
    } else {
        alert('Incorrect password');
    }
}); 