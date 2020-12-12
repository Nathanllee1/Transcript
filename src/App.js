import React, {useState, useRef} from 'react'

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import resemble  from 'resemblejs'
import './App.css';

import Slide  from './slide'


function App() {
  const [videoSrc, setVideoSrc] = useState();
  const [message, setMessage] = useState('Upload');
  const [difference, setDifference] = useState();
  const [diffCount, incCount] = useState(0);
  const [file, changeFile] = useState();
  const [imgSrc, setImg] = useState();
  const [imgSrc2, setImg2] = useState();

  const [slides, addSlide] = useState([]);

  const ffmpeg = createFFmpeg({
    log: false,
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
      */
    }
  }

  const onVideoIn = async (length) => {
    await ffmpeg.load();
    ffmpeg.FS('writeFile', "vid.mp4", await fetchFile(file)) // Write mp4 file to memory
    // Constants:
    const frameSkip = 50;
    const differenceThresh = 4;

    var i = 0;
    while (i < length) {
      // get frame
      var time = new Date(i * 1000).toISOString().substr(11, 8)

      const imgUrl = await getImageAtTime(time, "myimage.jpg");
      //setImg(imgUrl);

      var same = true;
      var offset = i + frameSkip;

      while (same) {
        // get next frame
        var nexttime = new Date((offset) * 1000).toISOString().substr(11, 8)

        const img2Url = await getImageAtTime(nexttime, "myimage2.jpg")
        //setImg2(img2Url);
        // if meets threshold, add split into document
        if (await compareImages(imgUrl, img2Url, differenceThresh)) { // true is different, false is same
          console.log('hey')
          //await ffmpeg.run('-i', 'test.mp4', '-ss','00:08:23', '-t', '00:40:00', '-c:v', 'copy', '-c:a', 'copy', 'transcode.mp4');

          setDifference("Found new slide!")

          var diffImage = true; // While the image
          var imageList = [];
          while (diffImage) {
            offset -= 5;
            var revtime = new Date((offset) * 1000).toISOString().substr(11, 8)
            const revUrl = await getImageAtTime(revtime, "rev.jpg")
            imageList.push(revUrl);
            console.log(offset);
            if (! (await compareImages(revUrl, imgUrl, differenceThresh))) { // If they're the same image
              offset += 1
              addSlide(slides => slides.concat(<Slide key={i} img={imgUrl} time={ new Date((offset) * 1000).toISOString().substr(11, 8)}/>))
              incCount(diffCount => diffCount + 1);
              i = offset + 1

              imageList.forEach(url =>{ URL.revokeObjectURL(url); console.log(url)})
              same = false;
              diffImage = false;
            }
          }


        }

        offset += frameSkip;
      }

      //setMessage(`time: ${time}`)
      i += frameSkip;
      setMessage(i + " " + frameSkip)
    }
  }

  const getImageAtTime = async(time, output) => {
    await ffmpeg.run(...(`-ss ${time} -i vid.mp4 -vframes 2 -q:v 2 ${output}`).split(" "))
    return getImUrl(output);
  }

  const getImUrl = async(image) => {
    const img = await ffmpeg.FS('readFile', image)
    return URL.createObjectURL(new Blob([img.buffer], { type: 'image/jpeg' }));
  }

  var different;
  const compareImages = async (img1, img2, threshold) => {

    var diff = await resemble(img1)
      .compareTo(img2)
      .onComplete(data => {
        //console.log((data.rawMisMatchPercentage), typeof(threshold))
        if (data.rawMisMatchPercentage > threshold) {
          different = true;
        } else {
          different = false;
        }
      })
    //console.log(different)
    return different;
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

      <p>Measured Difference: {difference}</p>
      <p>Number of slides: {diffCount}</p>
      <p>{message}</p>

      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>
        Upload!
      </button>

      <div className="slides">{slides}</div>

    </div>
  );
}

export default App;