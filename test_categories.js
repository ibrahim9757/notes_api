const http = require('http');
const fs = require('fs');

// Read JWT token from a test - we'll use the one stored in localStorage from the frontend
// For now, let's just test without auth first
const makeRequest = (token = null) => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/categories',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
};

(async () => {
  try {
    console.log('Testing GET /api/categories (without auth)...');
    const result1 = await makeRequest();
    console.log('Status:', result1.status);
    console.log('Body:', result1.body);
    console.log('\n---\n');
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
