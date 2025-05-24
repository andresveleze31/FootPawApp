import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const BrandCard = () => {
  return (
    <Card className={"p-4 flex items-center justify-center"}>
        <Image src={"/logobrand.png"} width={200} height={200} alt='logobrand' />


    </Card>
  )
}

export default BrandCard
