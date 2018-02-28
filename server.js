const express = require('express')
const multer  = require('multer') //handle requests with multipart/form-data content-type headers
// const upload = multer( {dest:'tempOMG/'} ) //will save files in a coded name to this folder within the served project folder
const upload = multer( { limits:{fileSize:15000000, files:1} } )// omit the options object so files will be kept in memory and never written to disk.
const app = express()

//host public files
app.use(express.static('public'))

//pug template rendering setup
app.set('view engine', 'pug')
app.set('views', __dirname + '/views' )

//root endpoint
app.get('/', (request, response)=> {
  console.log('get request to /')
  response.render('index')
})

//multer route to handle content-type multipart/form-data. form field values in request.body
app.post('/getfilesize', upload.single('file'), (request, response, next)=> {
  console.log('post request to /filesize')
  // console.log('content-type:\n', request.headers['content-type'])
  console.log('file object from multer:\n', request.file)
  response.send( {'size_in_bytes':request.file.size} )
  
})

// listen for requests, no need to use glitch's hidden .env for the port number. set one yourself
var listener = app.listen( 5000, ()=> console.log('Your app is listening on port ' + listener.address().port) )
