const fs = require('fs').promises;
const multer = require('multer')
const bodyParser = require('body-parser');
const express = require('express')
const path = require('path');
const { spawn } = require('child_process');

const fsExtra = require('fs-extra')

const uploadDir = path.resolve(__dirname, "public/uploads/");

const upload = multer({ dest: uploadDir });
const type = upload.single('upl');

const app = express()
const port = 4000

const msg = require('./index.js')
const { promisify } = require('util');

const exec = promisify(require('child_process').exec)

fsExtra.emptyDirSync("public/uploads")


async function recognize (filename) {
  console.log("recognizing " + filename);
  const text = await exec('python speech_to_text.py ' + filename);
  return (text);
};

app.use(bodyParser.raw({ limit: '100000mb' }));

app.use((_, res, next) => {
  res.header('Cross-Origin-Opener-Policy', 'same-origin');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

//Give different filenames to allow for concurrent requests
let fileCounter = 1;
app.post('/speechToText', type, async function (req, res) {
  req.setTimeout(0)
  fileCounter += 1;

  // do stuff with file
  const filePath = path.resolve(uploadDir, `${fileCounter}.wav`);

  await fs.writeFile(filePath, new Uint8Array(req.body.buffer));

  let transcription = await recognize(filePath)
  console.log(transcription.stdout);
  res.send({text: transcription.stdout});
  console.log("after")
  //Clean the file after we're done.
  //await fs.unlink(filePath);
  

});


app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})