import React from 'react'
import { FaStar } from 'react-icons/fa'

const StarsComponent = ({reviews}) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex gap-1 items-center">
        <FaStar className="text-yellow-400" />
        <FaStar className="text-yellow-400" />
        <FaStar className="text-yellow-400" />
        <FaStar className="text-yellow-400" />
        <FaStar className="text-yellow-400" />
      </div>
      <p className="text-gray-500">{reviews} Reviews </p>
    </div>
  );
}

export default StarsComponent
