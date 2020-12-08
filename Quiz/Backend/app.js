const express = require('express')
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const DATABASE_NAME = "quiz";

const app = express()
const port = 3000
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
var database, collection;


 app.get("/getquestions", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/submit", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});




app.listen(port, () => {
  console.log(`Quiz App listening at http://localhost:${port}`)
  MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("questions");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
})
