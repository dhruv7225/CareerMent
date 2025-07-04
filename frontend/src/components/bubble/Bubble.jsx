// Bubble.js
import React from 'react';
import { motion } from 'framer-motion';

const Bubble = ({ size, x, y, color }) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        position: 'absolute',
        left: x,
        top: y,
      }}
      animate={{
        y: [y, y - 200], // Float upward
        opacity: [1, 0], // Fade out
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};

export default Bubble;