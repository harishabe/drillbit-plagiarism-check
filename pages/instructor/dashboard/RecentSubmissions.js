import * as React from 'react'

import { RecentSubmissionTable } from '../../../components'

const RecentSubmissions = ({
    recentSubmission,
    handlePage
}) => {

    return (
        <RecentSubmissionTable
            tableData={ recentSubmission }
            handlePage={ handlePage }
        />
    )
}

export default RecentSubmissions