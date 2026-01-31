/**
 * Simple Calculator API
 * Demo project for GitHub Actions tutorial
 */

const http = require('http');

// Calculator functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Simple HTTP server
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  res.setHeader('Content-Type', 'application/json');

  if (url.pathname === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: 'Calculator API',
      version: '1.0.0',
      endpoints: ['/add', '/subtract', '/multiply', '/divide']
    }));
    return;
  }

  if (url.pathname === '/health') {
    res.statusCode = 200;
    res.end(JSON.stringify({ status: 'healthy' }));
    return;
  }

  const a = parseFloat(url.searchParams.get('a'));
  const b = parseFloat(url.searchParams.get('b'));

  if (isNaN(a) || isNaN(b)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Parameters a and b are required' }));
    return;
  }

  try {
    let result;
    switch (url.pathname) {
      case '/add':
        result = add(a, b);
        break;
      case '/subtract':
        result = subtract(a, b);
        break;
      case '/multiply':
        result = multiply(a, b);
        break;
      case '/divide':
        result = divide(a, b);
        break;
      default:
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
    }
    res.statusCode = 200;
    res.end(JSON.stringify({ result }));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: error.message }));
  }
});

const PORT = process.env.PORT || 3000;

// Only start server if this file is run directly
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for testing
module.exports = { add, subtract, multiply, divide, server };
