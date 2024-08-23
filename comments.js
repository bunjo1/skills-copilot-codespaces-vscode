// Create web server
// Start server
// Listen for requests
// Parse request body
// Read comments from file
// Write comments to file
// Send comments back to client

// Web server
const express = require('express');
const app = express();
const fs = require('fs');

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Listen for requests
app.use(express.static('public'));
app.use(express.json());

// Read comments from file
function readComments() {
  const comments = fs.readFileSync('comments.json');
  return JSON.parse(comments);
}

// Write comments to file
function writeComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Send comments back to client
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comments = readComments();
  comments.push(req.body);
  writeComments(comments);
  res.json(req.body);
});
