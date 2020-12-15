import { React, useState, useEffect } from 'react';

function Slide(props) {


  const [text, setText] = useState("Lala here's some text that pocketsphinx should've made");

  fetch('/speechToText', {
    method: 'post',
    body: props.aud
  })

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