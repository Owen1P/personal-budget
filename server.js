// Budget API

const express = require('express');
// const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs')

// app.use(cors());
app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});




app.get('/budget', (req, res) => {
    fs.readFile('budget-data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the budget-data.json:', err);
            return res.status(500).send('Error reading budget data');
        }

        const budget = JSON.parse(data);
        res.json(budget);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// app.listen(port, () => {
//     console.log(`API served at http://localhost:${port}`);
// });