import React from 'react'
import { ListView2 } from '../../components'

const QA = ({
    GetQna,
    qnaData,
    qnaError,
    isLoadingQa,
    isLoadingAns,
    handleSend
}) => {
    return (
        <>
            <ListView2
                GetQna={ GetQna }
                qnaData={ qnaData }
                qnaError={ qnaError }
                isLoadingQa={ isLoadingQa }
                isLoadingAns={ isLoadingAns }
                handleSend={ handleSend }
            />
        </>
    )
}

export default QA
