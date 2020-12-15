const fs = require('fs').promises;
const multer  = require('multer')
const bodyParser = require('body-parser');
const express = require('express')
const path = require('path');

const uploadDir = path.resolve(__dirname, "public/uploads/");

const upload = multer({ dest: uploadDir });
const type = upload.single('upl');



const app = express()
const port = 4000

const msg = require('./index.js')

app.use(bodyParser.raw({limit: '100000mb'}));

//Give different filenames to allow for concurrent requests
let fileCounter = 1;
app.post('/speechToText', type, async function(req, res) {
  fileCounter += 1;
   console.log(req.body);
   console.log(req.file);
   // do stuff with file
   const filePath = path.resolve(uploadDir, `${fileCounter}.wav`);

   await fs.writeFile(filePath, new Uint8Array(req.body.buffer));

   const text = await msg(filePath);
   console.log("after")
   //Clean the file after we're done.
   await fs.unlink(filePath);

   res.statusCode = 200;
   res.json({'text': text})
});


app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})