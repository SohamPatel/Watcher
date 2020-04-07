// Retrieve Environement Variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env.local' });
}
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');


const app = express()
app.use(cors());
app.use(bodyParser());
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
    let api_key = request.headers.api_key;
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
    
    let query = `SELECT m.id, m.title, m.poster_path, m.release_date, m.media_type, u.date_added
                    FROM user_watched u
                    LEFT JOIN movies m
                    ON u.movie = m.id
                    WHERE u.user = ?`;
    let values = [user];

    db.all(query, values, (err, rows) => {
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

app.post('/api/watched', (request, response) => {
    let user = request.body.user;
    let movie = request.body.movie;
    console.log(user);
    console.log(movie);
    if (!user) {
        response.status(500).json({
            error: 'User parameter not found.'
        })
        return;
    }
    
    let moviesQuery = `INSERT OR IGNORE INTO movies(id, title, media_type, release_date, poster_path) values(?,?,?,?,?)`;
    let moviesValues = [movie.id, movie.title, movie.media_type, movie.release_date, movie.poster_path];

    db.run(moviesQuery, moviesValues, (err) => {
        if (err) {
            response.status(500);
            throw err;
        }

        let watchedQuery = `INSERT OR IGNORE INTO user_watched(user, movie, date_added) values(?,?,?)`;
        let watchedValues = [user, movie.id, new Date().toISOString()];

        db.run(watchedQuery, watchedValues, function (err) {
            if (err) {
                response.status(500);
                throw err;
            }
            if (this.changes > 0) {
                response.sendStatus(200);
            } else {
                response.sendStatus(409);
            }
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
    
    let query = `SELECT m.id, m.title, m.poster_path, m.release_date, m.media_type, u.date_added
                    FROM user_towatch u
                    LEFT JOIN movies m
                    ON u.movie = m.id
                    WHERE u.user = ?`;
    let values = [user];

    db.all(query, values, (err, rows) => {
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

app.post('/api/towatch', (request, response) => {
    let user = request.body.user;
    let movie = request.body.movie;
    console.log(user);
    console.log(movie);
    if (!user) {
        response.status(500).json({
            error: 'User parameter not found.'
        })
        return;
    }
    
    let moviesQuery = `INSERT OR IGNORE INTO movies(id, title, media_type, release_date, poster_path) values(?,?,?,?,?)`;
    let moviesValues = [movie.id, movie.title, movie.media_type, movie.release_date, movie.poster_path];

    db.run(moviesQuery, moviesValues, (err) => {
        if (err) {
            response.status(500);
            throw err;
        }

        let toWatchQuery = `INSERT OR IGNORE INTO user_towatch(user, movie, date_added) values(?,?,?)`;
        let toWatchValues = [user, movie.id, new Date().toISOString()];

        db.run(toWatchQuery, toWatchValues, function (err) {
            if (err) {
                response.status(500);
                throw err;
            }
            if (this.changes > 0) {
                response.sendStatus(200);
            } else {
                response.sendStatus(409);
            }
        });
    })
})

app.listen(3000)
