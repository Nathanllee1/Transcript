import { React } from 'react';

function Slide(props) {
  return (
    <div>
      <div className="slide">


        <video src={props.vid} width="500" controls/>

        <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet purus gravida quis blandit. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Suspendisse faucibus interdum posuere lorem ipsum dolor. Tellus elementum sagittis vitae et leo. Orci ac auctor augue mauris augue neque gravida in. Blandit cursus risus at ultrices mi. Ac tortor vitae purus faucibus ornare suspendisse. Mauris sit amet massa vitae tortor condimentum. Dolor morbi non arcu risus quis. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a. Risus sed vulputate odio ut enim blandit volutpat maecenas. Bibendum ut tristique et egestas quis ipsum suspendisse. Eget gravida cum sociis natoque penatibus et magnis. Feugiat vivamus at augue eget arcu. Etiam dignissim diam quis enim. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Pharetra pharetra massa massa ultricies mi. Sit </p>

      </div>

      <div className="divider"/>
    </div>




  )
}

//<img width="250" src={props.img} />
//<div>{props.time}</div>

export default Slide;