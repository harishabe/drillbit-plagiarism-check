import * as React from 'react'

import { Heading, CardView, ListView } from '../../../components'

const data = [{
    'name': 'Yatheendra Kumar',
    'course': 'Java',
    'percent': '90',
    'bgcolor': '#2B4CB0'
}, {
    'name': 'Prashanth Kumar',
    'course': 'Data Science',
    'percent': '85',
    'bgcolor': '#7B68C8'
}, {
    'name': 'Sagar',
    'course': 'Machine Learning',
    'percent': '76',
    'bgcolor': '#68C886'
}, {
    'name': 'Sagar',
    'course': 'Machine Learning',
    'percent': '76',
    'bgcolor': '#68C886'
}];

const Colors = ['#7B68C8', '#68C886', '#68C886'];

const TopStudents = ({
    topStudentData
}) => {

    React.useEffect(() => {
        topStudentData?.map((item, index) => {
            item['bgcolor'] = Colors[index];
        });
    }, [topStudentData]);

    return (
        <>
            <CardView>
                <Heading title='Top Students' />
                <ListView listData={topStudentData} />
            </CardView>
        </>
    )
}

export default TopStudents