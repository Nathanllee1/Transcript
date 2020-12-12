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

  const canvas = useRef(null);

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
      var primaryImageList = []
      // get frame
      var time = secondsToTime(i)

      const imgUrl = await getImageAtTime(time, "myimage.jpg");
      //setImg(imgUrl);
      primaryImageList.push(imgUrl);

      var same = true;
      var offset = i + frameSkip;

      while (same) {
        // get next frame
        var nexttime = secondsToTime(offset)

        const img2Url = await getImageAtTime(nexttime, "myimage2.jpg")
        //setImg2(img2Url);

        // if meets threshold, add split into document
        if (await compareImages(imgUrl, img2Url, differenceThresh)) { // true is different, false is same

          setDifference("Found new slide!")

          var diffImage = true;
          var imageList = [];
          while (diffImage) { // Go backwards until the image changes (should be the start)
            offset -= 5;
            var revtime = secondsToTime(offset)
            const revUrl = await getImageAtTime(revtime, "rev.jpg")
            imageList.push(revUrl);
            console.log(offset);
            if (! (await compareImages(revUrl, imgUrl, differenceThresh))) { // If they're the same image
              offset += 5

              var vidUrl = await getVideo(i, offset, "out.mp4")
              console.log(i, offset)

              addSlide(slides => slides.concat(<Slide vid={vidUrl} key={i} img={imgUrl} time={secondsToTime(offset)}/>))
              incCount(diffCount => diffCount + 1);
              i = offset + 1

              imageList.forEach(url =>{ URL.revokeObjectURL(url); console.log(url)});
              primaryImageList.forEach(url =>{ URL.revokeObjectURL(url); console.log(url)});

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

  const secondsToTime = (sec) => {
    return new Date((sec) * 1000).toISOString().substr(11, 8)
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

  const getVideo = async(time1, time2, output) => {
    console.log(secondsToTime(time1))
    await ffmpeg.run(...(`-i vid.mp4 -ss ${secondsToTime(time1)} -to ${secondsToTime(time2)} -c:v copy -c:a copy ${output}`).split(" "));
    const vid = await ffmpeg.FS('readFile', output)
    return URL.createObjectURL(new Blob([vid.buffer], { type: 'video/mp4' }));
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

      <canvas ref={canvas}></canvas>

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