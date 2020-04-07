// Retrieve Environement Variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env.local' });
}
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express')

const app = express()
app.use(cors());
app.options('*', cors());

// Connect to Watcher Database
const db = new sqlite3.Database('./Watcher.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the Watcher database.');
});


app.use((request, response, next) => {
    console.log(request.method, request.path);

    // Check for API_KEY
    let api_key = request.query.api_key;
    if (!api_key) {
        response.status(500).json({
            error: 'API_KEY parameter not found.'
        })
        return;
    }
    if (api_key !== process.env.WATCHER_BACKEND_API_KEY) {
        response.status(500).json({
            error: 'Invalid API_KEY.'
        })
        return;
    }
    next()
})

app.get('/api/watched', (request, response) => {
    let user = request.query.user;
    if (!user) {
        response.status(500).json({
            error: 'User parameter not found.'
        })
        return;
    }
    let query = `SELECT m.id, m.title, m.poster_path, m.release_date, m.media_type
                    FROM user_watched u
                    LEFT JOIN movies m
                    ON u.movie = m.id
                    WHERE u.user = '${user}'`;

    db.all(query, [], (err, rows) => {
        if (err) {
            response.status(500);
            throw err;
        }
        response.status(200).json({
            user: user,
            watched: rows
        });
    })
})

app.get('/api/towatch', (request, response) => {
    let user = request.query.user;
    if (!user) {
        response.status(500).json({
            error: 'User parameter not found.'
        })
        return;
    }
    let query = `SELECT m.id, m.title, m.poster_path, m.release_date, m.media_type
                    FROM user_towatch u
                    LEFT JOIN movies m
                    ON u.movie = m.id
                    WHERE u.user = '${user}'`;

    db.all(query, [], (err, rows) => {
        if (err) {
            response.status(500);
            throw err;
        }
        response.status(200).json({
            user: user,
            towatch: rows
        });
    })
})

app.listen(3000)
