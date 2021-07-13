const express = require('express'),
      fileupload = require("express-fileupload"),
      fs = require('fs');
      cors = require('cors');
const app = express()
app.use(express.json());
app.use(fileupload());
app.use(cors())

const PORT = 5000
const DIRECTORY = `${__dirname}/temp/images/`

app.get('/', (req, res) => {
  res.send(`<p>To view the list of images use the endpoint <a href="/image">/image</a></p>
            <p>To view a particular image use the endpoint /image/:id <p>
  `)
})

//INDEX ROUTE
app.get('/image',(req,res)=>{
  fs.readdir(DIRECTORY, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    res.send(files);
  });
})

//SHOW ROUTE
app.get('/image/:id',(req,res)=>{
  res.sendFile(DIRECTORY + req.params.id)
})

//POST ROUTE
app.post('/image',(req,res)=>{
  try{
    let image  = req.files.image;
    let filePath = DIRECTORY + image.name;
    fs.writeFile(filePath, image.data, function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("File Uploaded")
    }); 
  }catch(error){
      res.send("Error: "+error.message)
  }
})

app.get('/test',(req,res)=>{
  res.send("Test")
})




app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})