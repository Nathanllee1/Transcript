import { React, useState, useEffect } from 'react';

function Slide(props) {


  const [text, setText] = useState("Lala here's some text that pocketsphinx should've made");

  console.log(props.aud)
  function spawnWorker(onReady) {
    var recognizer = new Worker(process.env.PUBLIC_URL + "/sphinx/recognizer.js")
    var id = 0;

    recognizer.onmessage = (message) => {
      console.log("initialized!");
      onReady(recognizer);
    }
    recognizer.postMessage({'pocketsphinx.js': process.env.PUBLIC_URL + "/sphinx/pocketsphinx.js",
                            'pocketsphinx.wasm': process.env.PUBLIC_URL + "/sphinx/pocketsphinx.wasm"});

  }

  useEffect(()=> {
    var audioCtx = new AudioContext();
    var reader = new FileReader();
    var xhr = new XMLHttpRequest();

    fetch(props.aud)
      .then(resp => resp.arrayBuffer())
      .then (async function(e) {
        console.log(e)

        var audBuffer = await audioCtx.decodeAudioData(e)

        console.log(audBuffer);
        spawnWorker(function(worker) {
          worker.onmessage = function(event) {
            console.log(event.data)
          }
          //recognizer.postMessage({command: 'start'});
          var id = props.time.replace(":", "")
          worker.postMessage({command: 'initialize', callbackId: id})
          var grammar = {numStates: 3,
               start: 0,
               end: 2,
               transitions: [{from: 0, to: 1, word: "HELLO"},
                             {from: 1, to: 2, logp: 0, word: "WORLD"},
                             {from: 1, to: 2}]
              };
          worker.postMessage({command: 'addGrammar', data: grammar, callbackId: id});

          var words = [["ONE", "W AH N"], ["TWO", "T UW"], ["THREE", "TH R IY"]];
          worker.postMessage({command: 'addWords', data: words, callbackId: id});
          worker.postMessage({command: 'start', data: id});
          worker.postMessage({command: 'process', data: audBuffer});

      })
    })


      //var audBuffer = audioCtx.decodeAudioData(arrBuffer)

  })



  /*

  var Module = {
    locateFile: function() {return process.env.PUBLIC_URL + "/sphinx/pocketsphinx.wasm"},
    onRunTimeInitialized: function() {
      console.log('init')
    }
  }


  var recognizer = new Module.Recognizer();

  var output = recognizer.start();
  output = recognizer.process(arrBuffer);
  setText(recognizer.getHyp())

  recognizer.delete();

  */

  return (
    <div>
      <div className="slide">

        <p className="timeStamp">{props.time}</p>
        <video src={props.vid} width="32%" controls/>

        <p className="text">{text}</p>
      </div>
    </div>
  )
}

//<img width="250" src={props.img} />   <div className="divider"/>
//<div>{props.time}</div>

export default Slide;