import React, {useState, useRef} from 'react'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './App.css';


function App() {
  const [videoSrc, setVideoSrc] = useState();
  const [message, setMessage] = useState('Upload');
  const [file, changeFile] = useState();
  const [imgSrc, setImg] = useState();
  const [imgSrc2, setImg2] = useState();
  /* Format for storing information

  [
    {
      endStamp:
      videoURL:
      text:
      preview: (maybe implemented later)
    }
  ]

  */

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const onFileUpload = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');

    if (file) {
      ffmpeg.FS('writeFile', "vid.mp4", await fetchFile(file))
      const data = ffmpeg.FS('readFile', 'vid.mp4');
      await setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));

      /*
      ffmpeg.FS('writeFile', "test.mp4", await fetchFile(file))
      setMessage("File read")
      await ffmpeg.run('-i', 'test.mp4', '-ss','00:08:23', '-t', '00:40:00', '-c:v', 'copy', '-c:a', 'copy', 'transcode.mp4');
      //await ffmpeg.run('-i', 'test.mp4', 'transcode.mp4');
      setMessage('Complete transcoding');
      const data = ffmpeg.FS('readFile', 'transcode.mp4');
      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));

      setMessage("Read Image")
      //ffmpeg.setLogging(true);
      //await ffmpeg.run(...("ffmpeg -ss 00:23:45 -i test.mp4 -vframes 2 -q:v 2 myimage.jpg").split(" "))
      //console.log(...('ffmpeg -i test.mp4 -vf "select=eq(n\,34)" -vframes 1 myimage.png').split(" "))
      await ffmpeg.run(...('-ss 00:50 -i test.mp4 -frames:v 1 myimage.jpg').split(" "))
      setMessage("Image split")
      const img = ffmpeg.FS('readFile', 'myimage.jpg')

      setImg(URL.createObjectURL(new Blob([img.buffer], { type: 'image/jpeg' })))
      */
    }
  }

  const onVideoIn = async (length) => {
    // Constants:
    // 


    console.log(length)
    await ffmpeg.load();

    var i = 0;
    while (i < length) {
      // get frame
      var time = new Date(i * 1000).toISOString().substr(11, 8)

      ffmpeg.FS('writeFile', "vid.mp4", await fetchFile(file))
      await ffmpeg.run(...(`-ss ${time} -i vid.mp4 -vframes 2 -q:v 2 myimage.jpg`).split(" "))

      const img = ffmpeg.FS('readFile', 'myimage.jpg')


      // get next frame
      var nexttime = new Date((i + 5) * 1000).toISOString().substr(11, 8)

      ffmpeg.FS('writeFile', "vid.mp4", await fetchFile(file))
      await ffmpeg.run(...(`-ss ${time} -i vid.mp4 -vframes 2 -q:v 2 myimage.jpg`).split(" "))

      const img2 = ffmpeg.FS('readFile', 'myimage.jpg')

      setImg(URL.createObjectURL(new Blob([img.buffer], { type: 'image/jpeg' })))
      setImg2(URL.createObjectURL(new Blob([img.buffer], { type: 'image/jpeg' })))
      // if meets threshold, add split into document

      // get video snippit and save url as blob into split object


      setMessage(`time: ${time}`)
      i += 60;
    }

  }

  const onFileChange = (e: any) => {
    changeFile(e.target.files[0]);
  }

  return (
    <div className="App">
      <p/>

      <video src={videoSrc} width="250" controls
      onLoadedMetadata={e => {
        onVideoIn(e.target.duration);
      }}></video><br/>

      <img width="250" src={imgSrc}></img>
      <img width="250" src={imgSrc2}></img>

      <p>{message}</p>

      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload!
      </button>

    </div>
  );
}

export default App;