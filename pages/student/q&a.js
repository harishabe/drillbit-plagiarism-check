import React from 'react'
import { ListView2 } from '../../components'

const QA = ({
    qnaData,
    isLoadingQa,
    handleSend
}) => {
    return (
        <>
            <ListView2
                qnaData={ qnaData }
                isLoadingQa={ isLoadingQa }
                handleSend={ handleSend }
            />
        </>
    )
}

export default QA
