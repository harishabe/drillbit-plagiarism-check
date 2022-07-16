import * as React from 'react'

import { RecentSubmissionTable } from '../../../components'

const RecentSubmissions = ({
    recentSubmission
}) => {

    return (
        <RecentSubmissionTable tableData={ recentSubmission } />
    )
}

export default RecentSubmissions