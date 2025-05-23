import React from 'react';
import 'aframe';
import { Link } from "react-router-dom";

const VRScene = () => {
  return (
    <>
    <a-scene>
      <a-sky src="src/assets/coffee4.jpg" rotation="0 -130 0"></a-sky>
      <a-entity 
        camera 
        position="0 1.6 0" 
        look-controls 
        wasd-controls>
      </a-entity>
      <a-entity 
        cursor="fuse: false; maxDistance: 10" 
        position="0 1.6 -1" 
        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03" 
        material="color: white; shader: flat">
      </a-entity>
    </a-scene>
    </>
    
  );
};

export default VRScene;

