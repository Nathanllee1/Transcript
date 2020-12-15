import { React, useState, useEffect } from 'react';
import { Placeholder } from 'semantic-ui-react'

function LoadingSlide(props) {

  return (
    <div>
      <div className="slide">

        <p className="timeStamp"><Placeholder.Line /></p>
        <Placeholder style={{ width: "32%", height: 150 }}>
          <Placeholder.Image />
        </Placeholder>

        <p className="text">
        <Placeholder>
  <Placeholder.Paragraph>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder.Paragraph>
  <Placeholder.Paragraph>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder.Paragraph>
</Placeholder>`
        </p>
      </div>
    </div>
  )
}

//<img width="250" src={props.img} />   <div className="divider"/>
//<div>{props.time}</div>

export default LoadingSlide;