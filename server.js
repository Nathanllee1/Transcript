const fs = require('fs');
const multer  = require('multer')
const bodyParser = require('body-parser');
var upload = multer({ dest: __dirname + '/public/uploads/' });
var type = upload.single('upl');

const express = require('express')
const path = require('path');

const app = express()
const port = 4000

/*
app.post('/speechToText', upload.single('soundBlob'), (req, res) => {
  let uploadLocation = __dirname + '/public/uploads/' + req.file.originalname
  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
})
*/
app.use(bodyParser.raw({ type: 'audio/wav'}));

app.post('/speechToText', function (req, res) {
   console.log(req.body);
   console.log(req.file);
   // do stuff with file
   fs.writeFileSync("/public/uploads", Buffer.from(new Uint8Array(req.file.buffer)));
});


app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

