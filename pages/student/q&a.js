import React from 'react'
import { ListView2 } from '../../components'

const QA = ({
    qnaData,
    isLoadingQa,
    SendData
}) => {
    return (
        <>
            <ListView2 qnaData={ qnaData } isLoadingQa={ isLoadingQa } SendData={ SendData } />
        </>
    )
}

export default QA
