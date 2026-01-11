const express = require('express')
const router = express.Router();
const app = express()
const port = 5000
const mongoDB = require("./db")
// const importData = require("./seederScript")
mongoDB() //calling connect method of db.js from here
// importData()

app.use((req, res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next();
})

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.json())


app.use('/med', require("./Routes/createUser"))//endpoint is localhost:5000/med/createuser

app.use('/med', require("./Routes/displayData"))

app.use('/med', require("./Routes/paymentRoutes"))

app.use('/med', require("./Routes/contactRoute"))

app.use('/med/order', require("./Routes/orderRoutes"));

app.use('/med/cat', require("./Routes/productRoutes"));

app.use('/profile', require("./Routes/userProfile"))

app.use('/med/product', require("./Routes/productDetails"))

app.use('/admin', require("./Routes/adminRoutes"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})