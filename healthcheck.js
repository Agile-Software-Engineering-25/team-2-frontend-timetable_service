import http from 'http';

const PORT = process.env.PORT || 3000;
const TIMEOUT = 3000;

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/health',
  method: 'GET',
  timeout: TIMEOUT,
  headers: {
    'User-Agent': 'Docker-Health-Check'
  }
};

console.log(`Health check: Checking http://localhost:${PORT}/health`);

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const healthData = JSON.parse(data);
        console.log(`Health check passed: ${healthData.status}`);
        process.exit(0);
      } catch (e) {
        console.log('Health check passed (non-JSON response)');
        process.exit(0);
      }
    } else {
      console.error(`Health check failed: HTTP ${res.statusCode}`);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error(`Health check error: ${error.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error(`Health check timeout after ${TIMEOUT}ms`);
  req.destroy();
  process.exit(1);
});

req.setTimeout(TIMEOUT);
req.end();
