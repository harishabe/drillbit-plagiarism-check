import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import debouce from "lodash.debounce";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { GetStudent } from '../../redux/action/instructor/InstructorAction';
import Instructor from '../../layouts/Instructor'
import { BreadCrumb, TabMenu } from '../../components'
import Assignments from './assignments'
import Students from './students'
import { PaginationValue } from '../../utils/PaginationUrl';

const MyClassesTables = ({
    GetStudent,
    studentData,
    pageDetails,
    isLoadingStudent
}) => {

    const router = useRouter();

    const ClasId = router.query.clasId;

    // console.log("id", router.query.clasId)

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
            link: '/instructor/myclasstables',
            active: true,
        },
    ]

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    }

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    useEffect(() => {
        GetStudent(ClasId, paginationPayload);
    }, [ClasId, paginationPayload]);

    const componentList = [
        <Students
            // GetStudent={ GetStudent }
            studentData={ studentData }
            pageDetails={ pageDetails }
            paginationPayload={ paginationPayload }
            setPaginationPayload={ setPaginationPayload }
            isLoadingStudent={ isLoadingStudent } />,
        <Assignments />]

    const tabMenu = [
        {
            label: `Students(${pageDetails?.totalElements})`,
        },
        {
            label: 'Assignments(27)',
        },
    ]

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    <Grid item md={ 2 } xs={ 2 }>
                        <TextField
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={ {
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            } }
                        />
                    </Grid>
                </Grid>
            </Box>
            <TabMenu menuButton={tabMenu} components={componentList} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.studentAssignmentData?.page,
    studentData: state?.instructorClasses?.studentAssignmentData?._embedded?.studentDTOList,
    isLoadingStudent: state?.instructorClasses?.isLoadingStudent,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudent: (ClasId, PaginationValue) => dispatch(GetStudent(ClasId, PaginationValue)),
    };
};


MyClassesTables.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesTables);