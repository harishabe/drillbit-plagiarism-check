import React from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Instructor from '../../layouts/Instructor'
import { BreadCrumb, TabMenu } from '../../components'
import Assignments from './assignments'
import Students from './students'

const MyClassesTables = ({
    pageDetails,
}) => {

    const router = useRouter();
    console.log("firstfirstfirst", router?.asPath?.slice(router?.pathname?.length))

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/instructor/dashboard',
            active: false,
        },
        {
            name: 'My classes',
            link: '/instructor/myclasses',
            active: false,
        },
        {
            name: 'Java',
            // link: '/instructor/myclasstables?' + router?.asPath?.slice(router?.pathname?.length),
            link: '/instructor/myclasstables',
            active: true,
        },
    ]

    const componentList = [
        <Students />,
        <Assignments />
    ];

    const tabMenu = [
        {
            label: `Students(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`,
        },
        {
            label: 'Assignments(27)',
        },
    ];

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    {/* <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                    </Grid> */}
                </Grid>
            </Box>
            <TabMenu menuButton={tabMenu} components={componentList} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.studentAssignmentData?.page,
});

MyClassesTables.layout = Instructor;

export default connect(mapStateToProps, {})(MyClassesTables);
