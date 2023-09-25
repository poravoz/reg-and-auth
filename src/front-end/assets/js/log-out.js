window.onload = function() {
    const logoutButton = document.getElementById('logoutButton'); 
  
    logoutButton.addEventListener('click', async function(event) {
      event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3000/authentication/log-out', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          console.log('Successfully logged out');
          window.location.href = '../authentication.html'; 
        } else {
          alert('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  };