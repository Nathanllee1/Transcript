import { React, useState, useEffect } from 'react';

function Slide(props) {


  const [text, setText] = useState("");
  console.log(props.aud)

  const formData = new FormData();
  formData.append('data', props.aud)

  fetch('/speechToText', {
    method: 'post',
    headers: {'Content-Type': 'application/octet-stream'},
    body: props.aud
  })
    .then(response => response.json())
    .then(data => setText(data["text"]))

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