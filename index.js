const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express()
const port = process.env.PORT || 5000

//middlewares
//middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.icgs0.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const userCollection = client.db("watchPro").collection("users");
        const categoryCollection = client.db("watchPro").collection("categories");
        const productCollection = client.db("watchPro").collection("products");
        
        
        //post categories 
        app.post('/category', async(req,res)=>{
            const category = req.body;
            const result = await  categoryCollection.insertOne(category)
            res.send(result)
            
        })
        //get categories 
        .get('/category', async(req, res)=>{
            const query = {}
            const category = await categoryCollection.find(query).toArray()
            res.send(category)
        })
        .get('/category/:id', async(req, res)=>{
            const id = req.params.id
            const query = {}
            const  products = await productCollection.find(query).toArray()
            const category_product = products.filter((product) => product.category_id === id)
            res.send(category_product)
            console.log(id)
        })
        
        
       




    }finally{

    }
}
run().catch(console.dir)

app.get('/', (req, res) =>{
    res.send('Watch server api running')
})



app.listen(port, () =>{
    console.log('Server Running on Port', port)
})