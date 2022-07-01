import React from 'react'
import { ListView2 } from '../../components'

const QA = ({
    qnaData,
    isLoadingQa,
    isLoadingAns,
    handleSend
}) => {
    return (
        <>
            <ListView2
                qnaData={ qnaData }
                isLoadingQa={ isLoadingQa }
                isLoadingAns={ isLoadingAns }
                handleSend={ handleSend }
            />
        </>
    )
}

export default QA
