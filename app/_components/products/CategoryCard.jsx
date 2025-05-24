import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const CategoryCard = ({category}) => {
  return (
    <Card className={"px-3 py-7 flex flex-col gap-5 items-center"}>
      <Image src={category.icon?.url} width={120} height={120} alt="Category" />

      <p className="text-white text-center w-full bg-red-700 py-2 px-1 rounded-md">
        {category.name}
      </p>
    </Card>
  );
}

export default CategoryCard
