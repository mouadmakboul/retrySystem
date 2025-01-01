const express = require('express');
const path = require('path');
const app = express();

// Serve static files from Angular's dist directory
app.use(express.static(path.join(__dirname, 'dist/retry-app/browser')));

// All other routes should return the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/retry-app/browser/index.html'));
});

const port = process.env.PORT || 8014;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
