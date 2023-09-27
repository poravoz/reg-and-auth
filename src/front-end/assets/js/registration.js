window.onload = function() {
  const form = document.getElementById('form');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeat_password').value;
    const phone = document.getElementById('phone').value; 
    const age = document.getElementById('age').value;

    if (!name || !email || !password || !repeatPassword || !phone || !age) {
      alert('Please fill in all fields');
      return;
    } else if (password.length < 8) {
      alert('Password should be at least 8 characters long');
      return;
    } else if (password !== repeatPassword) {
      alert('Password mismatch');
      return;
    } else if (!/^[a-zA-Zа-яА-Я]+$/.test(name)) {
      alert('Name should only contain letters');
      return;
    } else if (name.length < 2) {
      alert('Name should be at least 2 characters long');
      return;
    } else if (age < 18 || age > 80) {
      alert('Age should be between 18 and 80');
      return;
    } else if (!/^\d{10}$/.test(phone)) {
      alert('Phone number should be 10 digits long');
      return;
    } else if (!/^.{5,}@gmail\.com$/.test(email)) {
      alert('Email should have at least 5 characters before @gmail.com');
      return;
    }

    const response = await fetch('http://localhost:3000/authentication/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    try {
      const data = await response.json();
      if (data.emailExists) {
        alert('User with this email already exists');
        return;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }

    const responseCheckPhone = await fetch('http://localhost:3000/authentication/check-phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: phone })
    });

    if (!responseCheckPhone.ok) {
      throw new Error('Network response was not ok');
    }

    try {
      const dataCheckPhone = await responseCheckPhone.json();
      if (dataCheckPhone.phoneExists) {
        alert('User with this phone number already exists');
        return;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }

    const dataToServer = {
      name: name,
      email: email,
      password: password,
      phone: phone, 
      age: age
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