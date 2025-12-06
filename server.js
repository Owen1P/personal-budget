// Budget API

const express = require('express'); const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


//import budget model
const Budget = require('./models/Budget');


app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));


//MongoDB Connection

const mongoURL = 'mongodb://127.0.0.1:27017/personalBudgetDB';


mongoose.connect(mongoURL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});




app.get('/budget', async (req, res) => {
    try {
        const budget = await Budget.find(); // returns all documents
        res.json(budget);
    } catch (err) {
        console.error('Error fetching budget data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/budget', async (req, res) => {
    try {
        const { title, value, color } = req.body;

        // basic validation before hitting Mongoose
        if (!title || value == null || !color) {
            return res.status(400).json({ error: 'title, value, and color are required' });
        }

        const newItem = new Budget({
            title,
            value,
            color
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        console.error('Error adding budget item:', err);
        // if validation fails or Mongoose throws an error with a message
        res.status(400).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
// app.listen(port, () => {
//     console.log(`API served at http://localhost:${port}`);
// });