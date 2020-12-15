import React, {useState, useRef, useEffect} from 'react'
import { Loader } from 'semantic-ui-react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import resemble  from 'resemblejs'
import './App.css';

import LoadingBar from 'react-top-loading-bar'
import LoadingSlide from './LoadingSlide'
import Slide  from './slide'

function App() {
  const [videoSrc, setVideoSrc] = useState();
  const [file, changeFile] = useState();
  const [slides, addSlide] = useState([]);

  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [img1, setimg1] = useState();
  const [img2, setimg2] = useState();

  const [progress, setProgress] = useState(0)
  const [startingData, changeStart] = useState("input")

  //const [loader, startLoader] = use

  const ffmpeg = createFFmpeg({
    log: false,
  });


  var context;
  useEffect(() => {
    context = canvasRef.current.getContext('2d')
    context.drawImage(videoRef.current, 0, 0, canvasRef.width, canvasRef.height);
  })

  const onFileUpload = async () => {
    if (file) {
      changeStart("inputHidden")

      setTimeout(() => {
        changeStart("hidden")
      }, 1000)

      await setVideoSrc(URL.createObjectURL(new Blob([file], { type: 'video/mp4' })));
    }
  }

  const onDemoClick = async () => {

    changeStart("inputHidden")
    setVideoSrc("output.mp4")
    setTimeout(() => {
      changeStart("hidden")
    }, 1000)

  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  const onVideoIn = async (length) => {
    var reader = new FileReader();
    await ffmpeg.load();
    ffmpeg.FS('writeFile', "vid.mp4", await fetchFile(file)) // Write mp4 file to memory
    const differenceThresh = 7;
    var i = 1;
    while (i < length) {
      // get frame

      var time = secondsToTime(i)
      const imgUrl = await getImageAtTime(i);
      var same = true;

      var j = i + 1;
      while (same) {
        setProgress((j / length ) * 100);
        var nexttime = secondsToTime(j)
        const img2Url = await getImageAtTime(j)

        // if meets threshold, add split into document
        if (await compareImages(imgUrl, img2Url, differenceThresh) && (j - i > 30)) { // true is different, false is same // plus size should be mroe than 30 seconds
          var vidUrl = await getVideo(i, j, "out.mp4");
          await ffmpeg.run(...("-i out.mp4 out.wav").split(" "));
          var audUrl = new Blob([await ffmpeg.FS('readFile', "out.wav").buffer], { type: 'audio/mp3'});

          addSlide(slides => slides.concat(<Slide aud={audUrl} vid={vidUrl} key={i} img={imgUrl} time={secondsToTime(i)}/>))

          same = false;
          i = j + 2;
        } else {
          j += 1;
        }
      }
    }

    setProgress(0);
  }

  const secondsToTime = (sec) => {
    return new Date((sec) * 1000).toISOString().substr(11, 8)
  }


  const getImageAtTime = async(time, output) => {
    videoRef.current.currentTime = await time;

    await context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    var blobURL = await canvasRef.current.toDataURL();
    await sleep(50)
    return blobURL;
  }

  var different;
  const compareImages = async (img1, img2, threshold) => {
    var diff = await resemble(img1)
      .compareTo(img2)
      .onComplete(data => {
        //console.log((data.rawMisMatchPercentage), typeof(threshold))
        if (data.rawMisMatchPercentage > threshold) {
          console.log(data.rawMisMatchPercentage)
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
      <div className="header">
        <h1 className="name">Slides to Article</h1>
      </div>

      <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)}/>

      <div className={startingData}>
        <p>This tool converts a recording of a lecture into a readable and searchable article. </p>
        <p>Good lectures to use are voiceovers of slides without much else going on</p><br/>
        <h2>Upload a file to get started</h2>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>
          Upload!
        </button>
        <br/>
        <br/>
        <h2>Or try a demo</h2>
        <div>
          <button onClick={onDemoClick}>Try a demo!</button>
        </div>

      </div>

      <video className="mainVid" ref={videoRef} src={videoSrc} width="250" controls
      onLoadedMetadata={e => {
        onVideoIn(e.target.duration);
      }}></video>

      <canvas ref={canvasRef}></canvas>
      <div className="slides">{slides}</div>
    </div>
  );


}

export default App;