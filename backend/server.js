const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require('./config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Car Inventory API');
});

app.get('/cars', (req, res) => {
    const sqlQuery = 'SELECT * FROM cars;';
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Error in the SQL statement. Please check.', Details: err.message });
        }
        res.setHeader('SQLQuery', sqlQuery);
        return res.status(200).json(result);
    });
});

app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'SELECT * FROM cars WHERE id = ?;';
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Error in the SQL statement. Please check.', Details: err.message });
        }
        return res.status(200).json(result);
    });
});

app.get('/cars/:id/modifications', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'SELECT * FROM modifications WHERE car_id = ?;';
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Error retrieving modifications.', Details: err.message });
        }
        return res.status(200).json(result);
    });
});

app.post('/cars', (req, res) => {
    const sqlQuery = 'INSERT INTO cars (manufacturer, model, year, price, mileage, color) VALUES (?, ?, ?, ?, ?, ?);';
    const values = [req.body.manufacturer, req.body.model, req.body.year, req.body.price, req.body.mileage, req.body.color];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Record was not added.', Details: err.message });
        }
        return res.status(200).json({ Success: 'Successful: Record was added!' });
    });
});

app.post('/modifications', (req, res) => {
    const { car_id, modification } = req.body;
    const insertModificationQuery = 'INSERT INTO modifications (car_id, modification) VALUES (?, ?);';
    const updateCarQuery = 'UPDATE cars SET inWorkshop = 1 WHERE id = ?;';

    dbConnection.query(insertModificationQuery, [car_id, modification], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Modification was not added.', Details: err.message });
        }

        dbConnection.query(updateCarQuery, [car_id], (err, updateResult) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.status(400).json({ Error: 'Failed: Car was not moved to workshop.', Details: err.message });
            }
            return res.status(200).json({ Success: 'Successful: Modification added and car moved to workshop!' });
        });
    });
});

app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'UPDATE cars SET manufacturer = ?, model = ?, year = ?, price = ?, mileage = ?, color = ? WHERE id = ?;';
    const values = [req.body.manufacturer, req.body.model, req.body.year, req.body.price, req.body.mileage, req.body.color, id];
    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Record was not updated.', Details: err.message });
        }
        return res.status(200).json({ Success: 'Successful: Record was updated!' });
    });
});

app.put('/cars/:id/workshop', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'UPDATE cars SET inWorkshop = 1 WHERE id = ?;';
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Record was not moved to workshop.', Details: err.message });
        }
        return res.status(200).json({ Success: 'Successful: Record was moved to workshop!' });
    });
});

app.put('/cars/:id/complete', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'UPDATE cars SET inWorkshop = 0 WHERE id = ?;';
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Record was not completed.', Details: err.message });
        }
        return res.status(200).json({ Success: 'Successful: Record was completed!' });
    });
});

app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'DELETE FROM cars WHERE id = ?;';
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Record was not deleted.', Details: err.message });
        }
        return res.status(200).json({ Success: 'Successful: Record was deleted!' });
    });
});

app.delete('/modifications/:id', (req, res) => {
    const id = req.params.id;
    const sqlQuery = 'DELETE FROM modifications WHERE id = ?;';
    dbConnection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(400).json({ Error: 'Failed: Modification was not deleted.', Details: err.message });
        }
        return res.status(200).json({ Success: 'Successful: Modification was deleted!' });
    });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Express server is running and listening on port ${PORT}.`);
});
