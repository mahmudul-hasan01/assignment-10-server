const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

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

    app.get('/cars', async (req, res) => {
      const result = await database.find().toArray()
      res.send(result)
    })
    app.get('/cars/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await database.findOne(query)
      res.send(result)
    })
    app.post('/cars', async (req, res) => {
      const details = req.body
      const result = await database.insertOne(details)
      res.send(result)
    })
    app.put('/cars/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const bodyData = req.body
      console.log(bodyData)
      const update = {
        $set: {
          name: bodyData.name,
          BrandName: bodyData.BrandName,
          Type: bodyData.Type,
          Price: bodyData.Price,
          Image: bodyData.Image,
          Rating: bodyData.Rating,
          description: bodyData.description
        }
      }
      const result = await database.updateOne(query, update, options)
      res.send(result)
    })
    app.post('/cart', async (req, res) => {
      const details = req.body
      const result = await cartInfo.insertOne(details)
      res.send(result)
    })
    app.get('/cart', async (req, res) => {
      const result = await cartInfo.find().toArray()
      res.send(result)
    })
    app.get('/cart/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await cartInfo.findOne(query)
      res.send(result)
    })
    app.get('/my-cart/:email', async (req, res) => {
      const emails = req.params.email
      const query = { email: emails }
      const result = await cartInfo.findOne(query)
      console.log(result)
      res.send(result)
    })
    app.delete('/cart/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: id }
      const result = await cartInfo.deleteOne(query)
      res.send(result)
    })
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})