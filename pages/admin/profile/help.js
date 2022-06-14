import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Admin from '../../../layouts/Admin';
import { MainHeading } from './../../../components'

const Help = () => {

    const PagePath = {
        admin: "https://www.drillbitplagiarism.com/userGuide/DrillBit%20Classroom%20Admin%20user%20guide%20-%202022.pdf",

        instructor: "https://www.drillbitplagiarism.com/userGuide/DrillBit%20Instructor%20user%20guide%20-%202022.pdf",

        student: "https://www.drillbitplagiarism.com/userGuide/DrillBit%20Student%20user%20guide%20-%202022.pdf"
    }


    const [page, setPage] = useState(PagePath.admin);

    const handleAdmin = (e) => {
        setPage(PagePath.admin)
    }
    const handleInstructor = (e) => {
        setPage(PagePath.instructor)
    }
    const handleStudent = (e) => {
        setPage(PagePath.student)
    }

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 }>
                        <MainHeading title='Help' />
                    </Grid>
                    <Stack direction="row" spacing={ 2 } sx={ { m: 1 } }>
                        <Button variant="contained" onClick={ handleAdmin }>
                            Admin
                        </Button>
                        <Button variant="contained" onClick={ handleInstructor }>
                            Instructor
                        </Button>
                        <Button variant="contained" onClick={ handleStudent }>
                            Student
                        </Button>
                    </Stack>
                </Grid>
                <div style={ { overflow: 'hidden', height: '78vh' } }  >
                    <iframe rel="nofollow" style={ { height: '100vh', width: '1350px', transformOrigin: '0px 0px' } } frameborder="0" scrolling="no"
                        src={ page }>
                    </iframe>
                </div>
            </Box>

        </React.Fragment>
    )
}

Help.layout = Admin

export default Help

