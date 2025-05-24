import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Video } from "lucide-react";

const VRScene = () => {
  useEffect(() => {
    // Dynamically load A-Frame script
    const script = document.createElement('script');
    script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-sand flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-between w-full max-w-6xl px-6 mb-6">
          <Link
            to="/"
            className="bg-olive text-sand px-6 py-2 rounded-lg font-semibold shadow hover:bg-black hover:text-beige transition-colors flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center text-black">
            <Video size={24} className="mr-2 text-olive" />
            <span className="font-semibold">360° Virtual Tour</span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <a-scene
            embedded
            vr-mode-ui="enabled: false"
            style={{ width: "100vw", height: "70vh", borderRadius: "1.5rem", overflow: "hidden" }}
          >
            <a-assets>
              <img id="coffee-panorama" src="/coffee4.jpg" crossOrigin="anonymous" />
            </a-assets>
            <a-sky src="#coffee-panorama" rotation="0 -130 0"></a-sky>
            <a-entity
              camera
              position="0 1.6 0"
              look-controls="pointerLockEnabled: false"
              wasd-controls="enabled: false"
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