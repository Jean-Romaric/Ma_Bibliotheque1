    'use client';
        import React, { useState } from 'react';
    import axios from 'axios';

    function LoginForm() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear previous errors

        try {
          const response = await axios.post('http://localhost:8000/login', { // Replace with your actual API endpoint
            email,
            password,
          });

          // Handle successful login (e.g., save token, redirect)
          console.log('Login successful:', response.data);
          // Example: localStorage.setItem('token', response.data.token);
          // Example: router.push('/dashboard'); 

        } catch (err) {
          console.error('Login error:', err);
          if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
          } else {
            setError('An unexpected error occurred during login.');
          }
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
      );
    }

    export default LoginForm;