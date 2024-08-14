const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shifts_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

// Route to handle shift updates
app.post('/updateShift', (req, res) => {
    const action = req.body.action;

    let query;
    if (action === 'start') {
        query = "INSERT INTO shifts (start_time) VALUES (NOW())"; // Example query for start shift
    } else {
        query = "INSERT INTO shifts (stop_time) VALUES (NOW())"; // Example query for stop shift
    }

    db.query(query, (err, result) => {
        if (err) throw err;
        res.json({
            message: 'Shift updated successfully',
            result
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});