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
  res.send('Home')
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
        console.log("The file was saved!");
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