const express = require("express")
const cors = require("cors")
const { MongoClient, ObjectId } = require("mongodb")

const app = express()
app.use(cors())
app.use(express.json())

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

let db, productsColl, customersColl, ordersColl

async function start() {
  await client.connect()
  db = client.db("loonieToonieDB")
  productsColl = db.collection("products")
  customersColl = db.collection("customers")
  ordersColl = db.collection("orders")

  console.log("Connected to MongoDB, DB: loonieToonieDB")

  const PORT = 3000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start().catch(console.error)



// POST
app.post("/api/products", async (req, res) => {
  try {
    const result = await productsColl.insertOne(req.body)
    res.status(201).json({ insertedId: result.insertedId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create product" })
  }
})

// GET 
app.get("/api/products", async (req, res) => {
  try {
    const products = await productsColl.find({}).toArray()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch products" })
  }
})

// GET/ID 
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id
    const product = await productsColl.findOne({ _id: new ObjectId(id) })
    if (!product) return res.status(404).json({ error: "Product not found" })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch product" })
  }
})

// PUT 
app.put("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id
    const update = req.body
    const result = await productsColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    )
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update product" })
  }
})

// DELETE 
app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id
    const result = await productsColl.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete product" })
  }
})

app.get("/api/customers-with-orders", async (req, res) => {
  try {
    const result = await ordersColl.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerID",
          foreignField: "customerID",
          as: "customer"
        }
      },
      { $unwind: "$customer" }
    ]).toArray()

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch customers with orders" })
  }
})
