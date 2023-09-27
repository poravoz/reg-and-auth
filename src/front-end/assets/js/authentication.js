window.onload = function() {
    const form = document.getElementById("form");
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); 
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
  
      const data = {
        email: email,
        password: password
      };
  
      try {
        const response = await fetch('http://localhost:3000/authentication/log-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          console.log('Successfully authenticated:', responseData);
          window.location.href = '../index.html';
        } else {
          alert('Authentication failed');
        }
      } catch (error) {
        console.error('Authentication error:', error);
      }
    });
  };