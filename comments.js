// Create web server
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Function to read comments
function readComments() {
    return JSON.parse(fs.readFileSync('./comments.json'));
}

// Function to write comments
function writeComments(comments) {
    fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 4));
}

// Function to add a comment
function addComment(comment) {
    const comments = readComments();
    comments.push(comment);
    writeComments(comments);
}

// Function to delete a comment
function deleteComment(id) {
    const comments = readComments();
    const newComments = comments.filter(comment => comment.id !== id);
    writeComments(newComments);
}

// Middleware to parse the body of the request
app.use(bodyParser.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to get comments
app.get('/comments', (req, res) => {
    res.json(readComments());
});

// Route to add a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    addComment(comment);
    res.json(readComments());
});

// Route to delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    deleteComment(id);
    res.json(readComments());
});

// Start the web server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});