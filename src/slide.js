import { React } from 'react';

function Slide(props) {
  return (
    <div>
      <div>{props.time}</div>
      <img width="250" src={props.img} />
      
    </div>



  )
}

export default Slide;