"use client"
import { Crisp } from 'crisp-sdk-web'
import React, { useEffect } from 'react'

const CrispChat = () => {

    useEffect(() => {
        Crisp.configure("0d9e3df1-0c55-477f-b7b9-22ef9b379144");
    },[])

  return null;
}

export default CrispChat
