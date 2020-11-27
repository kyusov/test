const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3001
const cors = require('cors')


app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)

app.get('/', (req,  res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/partners', (req, res) => {
    res.sendFile(path.join(__dirname + '/partners.html'))
})

app.listen(PORT, () => console.log('server is running'))