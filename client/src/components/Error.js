import React from 'react';
import Head from './Head';
import { motion } from 'framer-motion';

export default function Error({ header, message, icon }) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <Head title={header} />
        {icon ?
          <span className="material-icons">{icon}</span> :
          <h1 className="text-main ">{header}</h1>
        }
        <div className="text-opacity-1 text-lg md:text-xl lg:text-xxl font-medium">{message}</div>
      </div>
    </motion.div>
  )
}