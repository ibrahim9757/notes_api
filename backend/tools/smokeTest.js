const BASE = process.env.BASE_URL || 'http://127.0.0.1:5000';

async function waitForServer(timeout = 10000, interval = 500) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`${BASE}/`, { method: 'GET' });
      if (res.ok) return true;
    } catch (err) {
      // ignore and retry
    }
    await new Promise(r => setTimeout(r, interval));
  }
  throw new Error('Server did not respond within timeout');
}

async function run(){
  try{
    console.log('Starting smoke test against', BASE);
      // wait until server responds
      await waitForServer();

    const uname = 'smoke' + Date.now();
    const email = `${uname}@example.com`;
    const password = 'password123';

    // Register
    let res = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: uname, email, password })
    });
    let json = await res.json();
    if(!res.ok){
      console.error('Register failed', json); return; }
    const token = json.data.token;
    console.log('Registered user:', email);

    // Create category
    res = await fetch(`${BASE}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name: 'Smoke Category' })
    });
    json = await res.json();
    if(!res.ok){console.error('Create category failed', json); return}
    const categoryId = json.data.category._id;
    console.log('Created category', categoryId);

    // Create 12 notes
    for(let i=1;i<=12;i++){
      res = await fetch(`${BASE}/api/notes`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title: `Note ${i}`, content: `Content ${i}`, category: categoryId })
      });
      json = await res.json();
      if(!res.ok){ console.error('Create note failed', json); return;} 
    }
    console.log('Created 12 notes');

    // Fetch page 2 limit 5
    res = await fetch(`${BASE}/api/notes?page=2&limit=5`, {
      method: 'GET', headers: { 'Authorization': `Bearer ${token}` }
    });
    json = await res.json();
    console.log('Page 2, limit 5:', json.count, 'notes returned out of total', json.total);

    // Done
    console.log('Smoke test finished');
  } catch (err){
    console.error('Smoke test error', err);
  }
}

run();
