const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors =require('cors')
const app = express()
const port =process.env.PORT || 5000

//   assignment 
//   JBQgyFhotvl1g34S

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://assignment:JBQgyFhotvl1g34S@cluster0.uoehazd.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db("CarDetailsDb").collection("CarInfo");
    const cartInfo = client.db("CarDetailsDb").collection("cart");
    
    app.get('/cars',async(req,res)=>{
       const result =await database.find().toArray()
       res.send(result)
    })
    app.get('/cars/:id',async(req,res)=>{
      const id =req.params.id
      const query ={_id: new ObjectId(id)}
      const result =await database.findOne(query)
      res.send(result)
    })
    app.post('/cars',async(req,res)=>{
        const details =req.body
        const result =await database.insertOne(details)
        res.send(result)
    })
    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})