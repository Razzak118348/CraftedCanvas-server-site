const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app =  express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


// mongodb connect

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.kqp32.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const carftCollection = client.db('artAndCraftDB').collection('allCraft');

// get api
app.get('/allcraft',async(req,res)=>{
const cursor = carftCollection.find();
const result =await cursor.toArray();
res.send(result)
})

//get individual by id
app.get('/allcraft/:id',async(req,res)=>{
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result =await carftCollection.findOne(query);
  res.send(result);
})


//creat data/ post  api
app.post('/allcraft',async(req,res)=>{
  const craft = req.body;
  const result = await carftCollection.insertOne(craft);
  res.json(result)
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Art and Craft server is running')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})