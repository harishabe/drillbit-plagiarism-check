import React from 'react'

import Instructor from '../../layouts/Instructor'
import { BreadCrumb, TabMenu } from '../../components'

import MyClassFiles from './myclassfiles'
import Archives from './archives'

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/instructor/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/instructor/myclasses',
        active: true,
    },
]

const tabMenu = [
    {
        label: 'My Classes(6)',
    },
    {
        label: 'Archives(1)',
    },
]

const componentList = [<MyClassFiles />, <Archives />]

const MyClasses = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={InstructorBreadCrumb} />
            <TabMenu menuButton={tabMenu} components={componentList} isTabMenu={false} />
        </React.Fragment>
    )
}

MyClasses.layout = Instructor

export default MyClasses
