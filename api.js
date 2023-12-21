const express = require("express")
const cors = require("cors");
const stoneRouter = require('./routers/user.routers')

const PORT = process.env.PORT || 5500

const app = express()

app.use(cors());
app.use(express.json())
app.use('/api', stoneRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
