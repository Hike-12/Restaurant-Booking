import React from 'react';
import 'aframe';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VRScene = () => {
  return (
    <motion.div
      className="min-h-screen bg-sand flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="mb-6">
          <Link
            to="/"
            className="bg-olive text-sand px-6 py-2 rounded-lg font-semibold shadow hover:bg-black hover:text-beige transition-colors"
          >
            Back to Home
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <a-scene
            embedded
            style={{ width: "100vw", height: "70vh", borderRadius: "1.5rem", overflow: "hidden" }}
          >
            <a-sky src="src/assets/coffee4.jpg" rotation="0 -130 0"></a-sky>
            <a-entity
              camera
              position="0 1.6 0"
              look-controls
              wasd-controls
            ></a-entity>
            <a-entity
              cursor="fuse: false; maxDistance: 10"
              position="0 1.6 -1"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: white; shader: flat"
            ></a-entity>
          </a-scene>
        </div>
      </div>
    </motion.div>
  );
};

export default VRScene;

