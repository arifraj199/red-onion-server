const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();


//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fv1xddt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const breakFastCollection = client.db("redOnion").collection("breakfast");
        const lunchFastCollection = client.db("redOnion").collection("lunch");
        const dinnerFastCollection = client.db("redOnion").collection("dinner");

        app.get('/breakfast', async(req,res)=>{
            const result = await breakFastCollection.find().toArray();
            res.send(result);
        });

        app.get('/lunch', async(req,res)=>{
            const result = await lunchFastCollection.find().toArray();
            res.send(result);
        });

        app.get('/dinner', async(req,res)=>{
            const result = await dinnerFastCollection.find().toArray();
            res.send(result);
        });

        app.get('/checkoutitems/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await breakFastCollection.findOne(query);
            res.send(result);
        });
        app.get('/checkoutitems/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await lunchFastCollection.findOne(query);
            res.send(result);
        });
        app.get('/checkoutitems/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await dinnerFastCollection.findOne(query);
            res.send(result);
        });

    }finally{}
}

run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});