require('dotenv').config({path: '../../.env.local'});
const mongo = require('mongodb').MongoClient

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@watcher-kk7tp.mongodb.net/test?retryWrites=true&w=majority`;
const dbName = 'Watcher';

/**
 * @param {string} collectionName Name of the Collection to enter the documents into
 * @param {Array} documents Array of Documents
 */
async function insertMany (collectionName, documents) {
    const client = await mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.insertMany(documents);
        return res;

    } catch (err) {
        console.log(err);

    } finally {
        client.close();
    }
}

/**
 * @param {string} collectionName Name of the Collection to query documents
 * @param {JSON} query Query to retrieve documents
 */
async function find (collectionName, query) {
    const client = await mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.find(query).toArray();
        return res;

    } catch (err) {
        console.log(err);

    } finally {
        client.close();
    }
}

/**
 * @param {string} collectionName Name of the Collection to update documents
 * @param {JSON} filter Filter/Query to identify documents being updated
 * @param {JSON} update Changes to update in the new documents
 */
async function update (collectionName, filter, update) {
    const client = await mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db(dbName);
        let collection = db.collection(collectionName);
        let res = await collection.updateMany(filter, update);
        return res;

    } catch (err) {
        console.log(err);

    } finally {
        client.close();
    }
}
// let tempDocuments = [
// {
//     "user_id": "123",
//     "watched": [{
//         "title": "Star Wars: The Rise of Skywalker",
//         "year": "2020",
//         "poster": "https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"
//     },{
//         "title": "Star Wars: The Rise of Skywalker",
//         "year": "2020",
//         "poster": "https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"
//     }],
//     'to_watch': [{
//         "title": "Star Wars: The Rise of Skywalker",
//         "year": "2020",
//         "poster": "https://image.tmdb.org/t/p/original/db32LaOibwEliAmSL2jjDF6oDdj.jpg"
//     }]
// }
// ]
// insertMany('WatchLists', [{"hello": "World"}]);

// find('WatchLists', { "to_watch.title": "Onward"}).then(res => {
//     console.log(res);
// })

update('WatchLists', {"watched.title": "Iron Man"}, {$set: {"watched.$.title": "Iron Lady"}}).then(res => {
    console.log(res);
})
