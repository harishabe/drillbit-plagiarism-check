import React from 'react';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Admin from '../../../layouts/Admin';
import { MainHeading, Title, CardView } from './../../../components'
import Link from 'next/link'

const Help = () => {
    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <MainHeading title='Help' />
                <Grid container spacing={ 1 }>
                    <Grid item md={ 4 } sm={ 12 }>
                        <CardView>
                            <Title title='Admin' />
                            <div style={ { marginTop: '20px', padding: "5px" } }>
                                <Link href="https://www.drillbitplagiarism.com/userGuide/DrillBit%20Classroom%20Admin%20user%20guide%20-%202022.pdf">
                                    <a style={ { color: 'blue', textDecoration: 'underline' } } target='_blank'>Admin tutorial PDF download</a>
                                </Link>
                            </div>
                            <div style={ { padding: "5px" } }>
                                <Link href="https://www.drillbitplagiarism.com/userGuide/DrillBit%20Classroom%20Admin%20user%20guide%20-%202022.pdf">
                                    <a style={ { color: 'blue', textDecoration: 'underline' } } target='_blank'>Admin video tutorial</a>
                                </Link>
                            </div>
                        </CardView>
                    </Grid>
                    <Grid item md={ 4 } sm={ 12 }>
                        <CardView>
                            <Title title='Instructor' />
                            <div style={ { marginTop: '20px', padding: "5px" } }>
                                <Link href="https://www.drillbitplagiarism.com/userGuide/DrillBit%20Instructor%20user%20guide%20-%202022.pdf">
                                    <a style={ { color: 'blue', textDecoration: 'underline' } } target='_blank'>Instructor tutorial PDF download</a>
                                </Link>
                            </div>
                            <div style={ { padding: "5px" } }>
                                <Link href="https://www.drillbitplagiarism.com/userGuide/DrillBit%20Instructor%20user%20guide%20-%202022.pdf">
                                    <a style={ { color: 'blue', textDecoration: 'underline' } } target='_blank'>Instructor video tutorial</a>
                                </Link>
                            </div>
                        </CardView>
                    </Grid>
                    <Grid item md={ 4 } sm={ 12 }>
                        <CardView>
                            <Title title='Student' />
                            <div style={ { marginTop: '20px', padding: "5px" } }>
                                <Link href="https://www.drillbitplagiarism.com/userGuide/DrillBit%20Student%20user%20guide%20-%202022.pdf">
                                    <a style={ { color: 'blue', textDecoration: 'underline' } } target='_blank'>Student tutorial PDF download</a>
                                </Link>
                            </div>
                            <div style={ { padding: "5px" } }>
                                <Link href="https://www.drillbitplagiarism.com/userGuide/DrillBit%20Student%20user%20guide%20-%202022.pdf">
                                    <a style={ { color: 'blue', textDecoration: 'underline' } } target='_blank'>Student video tutorial</a>
                                </Link>
                            </div>
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

Help.layout = Admin

export default Help

