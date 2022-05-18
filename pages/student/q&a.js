import React from 'react'
import { ListView2 } from '../../components'

const data = [
    {
        que: '1. Lorem ipsum dolor sit amet consectetur adipisicing elit?',
        ans: ` Laborum
        molestiae ducimus cupiditate molestias atque accusantium, architecto
        totam! In dicta vitae praesentium iusto aliquam aut, perferendis
        doloremque necessitatibus minima a accusamus libero nesciunt blanditiis.`,
        date: '01/01/2022',
        bgcolor: '#2B4CB0',
    },
    {
        que: '2. Lorem ipsum dolor sit amet consectetur adipisicing elit?',
        ans: ` Laborum
          molestiae ducimus cupiditate molestias atque accusantium, architecto
          totam! In dicta vitae praesentium iusto aliquam aut, perferendis
          doloremque necessitatibus minima a accusamus libero nesciunt blanditiis.`,
        date: '02/02/2022',
        bgcolor: '#7B68C8',
    },
]

const QA = () => {
    return (
        <>
            <ListView2 listData={data} />
        </>
    )
}

export default QA
