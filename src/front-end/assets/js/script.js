document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function(event) {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const repeatPassword = document.getElementById('repeat_password').value;
  
      if (!name || !email || !password || !repeatPassword) {
        alert('Please fill in all fields');
        event.preventDefault();
      } else if (password !== repeatPassword) {
        alert('Password mismatch');
        event.preventDefault(); 
      } else {
        event.preventDefault(); 
  
        const data = {
          name: name,
          email: email,
          password: password
        };
  
        fetch('http://localhost:3000/authentication/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log('Successfully registered:', data);
            window.location.href = './authentication.html';
          })
          .catch(error => {
            console.error('Registration error:', error);
          });
      }
    });
  });