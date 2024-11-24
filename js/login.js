const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Toggle form
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Validasi form registrasi
document.addEventListener("DOMContentLoaded", function() {
    const registerButton = document.getElementById("register-bttn");

    registerButton.addEventListener("click", function(event) {
        event.preventDefault(); // Mencegah form di-submit
        
        // Ambil nilai input
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Cek apakah semua kolom terisi
        if (username && email && password) {
            // Validasi apakah email mengandung '@'
            if (email.includes('@')) {
                alert("Anda telah terdaftar");
                
                // Reset form registrasi
                document.getElementById("register-form").reset();
                
                // Kembali ke tampilan login
                container.classList.remove('active');
            } else {
                alert("Silakan masukkan email yang valid dengan tanda '@'.");
            }
        } else {
            alert("Silakan isi semua kolom terlebih dahulu.");
        }
    });
});
