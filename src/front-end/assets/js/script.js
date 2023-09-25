window.onload = function() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузка страницы)
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const repeatPassword = document.getElementById('repeat_password').value;
  
      if (!name || !email || !password || !repeatPassword) {
        alert('Please fill in all fields');
        return;
      } else if (password.length < 8) {
        alert('Password should be at least 8 characters long');
        return;
      } else if (password !== repeatPassword) {
        alert('Password mismatch');
        return;
      }
  
      // Проверяем, существует ли пользователь с таким email
      const response = await fetch('http://localhost:3000/authentication/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });
  
      const data = await response.json();
      if (data.emailExists) {
        alert('User with this email already exists');
        return;
      }
  
      // Если пользователь с таким email не существует, отправляем запрос на регистрацию
      const dataToServer = {
        name: name,
        email: email,
        password: password
      };
  
      try {
        const response = await fetch('http://localhost:3000/authentication/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToServer)
        });
  
        const responseData = await response.json();
        console.log('Successfully registered:', responseData);
  
        if (responseData.id) {
          window.location.href = './authentication.html';
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    });
  };