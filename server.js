const express = require('express')
const app = express()

app.use(express.static('public'))

app.set('view engine', 'html');

app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
