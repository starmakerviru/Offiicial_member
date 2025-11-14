// Clear input field
function clearInput(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.value = '';
        field.focus();
        
        // Remove error class when clearing username
        if (fieldId === 'username') {
            field.classList.remove('error');
        }
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
}

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the data to your server
    console.log('Login attempt:', { username, password });
    try {
        const prev = localStorage.getItem('login_events');
        const events = Array.isArray(JSON.parse(prev)) ? JSON.parse(prev) : [];
        const entry = { username, ts: Date.now() };
        events.push(entry);
        localStorage.setItem('login_events', JSON.stringify(events));
        localStorage.setItem('last_login', JSON.stringify(entry));
        sessionStorage.setItem('current_user', username);
        // Fire-and-forget backend save (non-blocking)
        try {
            fetch('http://127.0.0.1:8000/api/logins', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry),
            }).catch(() => {});
        } catch (_) {}
    } catch (_) {}
    
    // Simulate login (replace with actual API call)
    alert('Login functionality would be implemented here');
});

// Clear buttons visibility
document.querySelectorAll('.input-field').forEach(field => {
    field.addEventListener('input', function() {
        const clearBtn = this.parentElement.querySelector('.clear-btn');
        if (clearBtn) {
            if (this.value.length > 0) {
                clearBtn.style.display = 'flex';
            } else {
                clearBtn.style.display = 'none';
            }
        }
    });
    
    // Show clear button if field has value on load
    if (field.value && field.value.length > 0) {
        const clearBtn = field.parentElement.querySelector('.clear-btn');
        if (clearBtn) {
            clearBtn.style.display = 'flex';
        }
    }
    
    // Trigger input event on load to set initial state
    field.dispatchEvent(new Event('input'));
});

// Social login handlers
document.querySelector('.facebook-btn').addEventListener('click', function() {
    console.log('Facebook login clicked');
    // Implement Facebook OAuth here
    alert('Facebook login would be implemented here');
});

document.querySelector('.google-btn').addEventListener('click', function() {
    console.log('Google login clicked');
    // Implement Google OAuth here
    alert('Google login would be implemented here');
});

