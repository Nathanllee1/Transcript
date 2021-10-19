import { React, useState, useEffect } from 'react';
import { Placeholder, Loader } from 'semantic-ui-react'

function Slide(props) {

  const [text, setText] = useState("");
  const [spinner, setSpinner] = useState("spinner")
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
    //.then(setSpinner("hidden"))

  return (
    <div>
      <div className="slide">

        <p className="timeStamp">{props.time}</p>
        <video src={props.vid} width="32%" controls/>
        <div className={spinner}><Loader /></div>
        <p className="text">{text}</p>
      </div>


    </div>
  )
}

//<img width="250" src={props.img} />   <div className="divider"/>
//<div>{props.time}</div>

export default Slide;