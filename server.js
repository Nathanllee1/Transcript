const fs = require('fs');
const multer  = require('multer')
const bodyParser = require('body-parser');
var upload = multer({ dest: __dirname + '/public/uploads/' });
var type = upload.single('upl');

const express = require('express')
const path = require('path');

const app = express()
const port = 4000

const msg = require('./index.js')

app.use(bodyParser.raw({limit: '100000mb'}));


app.post('/speechToText', type, async function(req, res) {
   console.log(req.body);
   console.log(req.file);
   // do stuff with file
   var filename = __dirname + "/public/uploads/file.wav"

   await fs.writeFileSync(path.join(filename), Buffer.from(new Uint8Array(req.body.buffer)));

   var text = await msg(filename);

   res.statusCode = 200
   res.json({'text': text})
});


app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

