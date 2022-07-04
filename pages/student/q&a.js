import React from 'react'
import { ListView2 } from '../../components'

const QA = ({
    GetQna,
    qnaData,
    isLoadingQa,
    isLoadingAns,
    handleSend
}) => {
    return (
        <>
            <ListView2
                GetQna={ GetQna }
                qnaData={ qnaData }
                isLoadingQa={ isLoadingQa }
                isLoadingAns={ isLoadingAns }
                handleSend={ handleSend }
            />
        </>
    )
}

export default QA
