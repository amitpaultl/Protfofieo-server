const express = require('express');
const cors = require('cors');
const prot = process.env.PROT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = `mongodb+srv://Protfofieo:JqLkinwRXxUMHWX2@cluster0.acij04d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mongodb connect  
const dbConnent = async () => {
    try {
        await client.connect();


    }
    catch (error) {
        console.log(error);

    }

}
dbConnent()

// data collection
const project = client.db('protfileo').collection('project');


// post project collection
app.put('/project', async (req, res) => {
    try {
        const car = req.body;
        console.log(car);
        const result = await project.insertOne(car);
        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})


// Get user collection
app.get('/project', async (req, res) => {
    try {
        const query = {}

        const result = await project.find(query).toArray()

        res.send({
            success: true,
            data: result,
            message: 'Successfully get data'
        })
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})

// single product item
app.get('/project/:id', async (req, res) => {
    try {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }

        const resust = await project.findOne(query)
      
        res.send(resust)

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})


// delete user id
app.delete('/user/:id',  async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) }
        const query = await project.deleteOne(filter);
        res.send({
            success: true,
            data: query,
            message: 'Successfully get data'
        })

    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        })
    }
})



app.get('/', (req, res) => {
    res.send('profiled  server running')
})

app.listen(prot, () => {
    console.log('profiled  log');
})