import React from 'react'
import { ListView2 } from '../../components'

const QA = ({
    GetQna,
    qnaData,
    qnaMessage,
    isLoadingQa,
    isLoadingAns,
    handleSend
}) => {
    return (
        <>
            <ListView2
                GetQna={ GetQna }
                qnaData={ qnaData }
                qnaMessage={ qnaMessage }
                isLoadingQa={ isLoadingQa }
                isLoadingAns={ isLoadingAns }
                handleSend={ handleSend }
            />
        </>
    )
}

export default QA
