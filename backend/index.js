const connectToMongo = require("./db")
const express = require('express')
const cors = require("cors")
connectToMongo();
const app = express()
const port = 9000
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/auth",require("./routes/user"))
app.use("/api/notes" , require("./routes/notes"))

app.listen(port, () => {
  console.log(`myNoteBook ${port}`)
})