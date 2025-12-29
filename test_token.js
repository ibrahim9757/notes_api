const http = require('http');

// Create a simple test token manually (won't be valid but will test the error path)
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkyMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/categories',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${testToken}`
  }
};

const req = http.request(options, (res) => {
  let data = '';
  console.log('Status:', res.statusCode);
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    process.exit(0);
  });
});

req.on('error', err => {
  console.error('Error:', err.message);
  process.exit(1);
});

req.end();
