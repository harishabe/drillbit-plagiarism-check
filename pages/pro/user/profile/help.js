import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Instructor from './../../../../layouts/Instructor';
import { MainHeading, Heading, CardView } from './../../../../components';
import Link from 'next/link';
import { getItemSessionStorage } from '../../../../utils/RegExp'

const Help = () => {

    const [data, setData] = useState([
        {
            'role': 'User',
            'isShow': false,
            'pdfLinkTitle': 'User tutorial PDF download',
            'pdfLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Organization%20user%20guide%20-%202022.pdf',
            'videoTitle': 'User video tutorial',
            'videoLink': 'https://youtu.be/pL2S4yKvrNM&t=115'
        }
    ]);

    useEffect(() => {
        let d = data?.map((item) => {
            if (getItemSessionStorage('role') === 'lim-instructor') {
                item['isShow'] = true;
            } else if (getItemSessionStorage('switchProRole') === 'user') {
                item['isShow'] = true;
            }
            return item;
        });
        setData(d);
    }, []);

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <MainHeading title='Help' />
                <Grid container spacing={ 1 }>
                    { data?.map((item, index) => (
                        item?.isShow &&
                        <Grid key={ item.role } item md={ 4 } sm={ 12 }>
                            <CardView>
                                <Heading title={ item?.role?.charAt(0)?.toUpperCase() + item?.role?.slice(1) } />
                                <div style={ { marginTop: '20px' } }>
                                    <Link href={ item?.pdfLink }>
                                        <a target='_blank' style={ { textDecoration: 'underline' } }>
                                            { item?.pdfLinkTitle }
                                        </a>
                                    </Link>
                                </div>
                                <div style={ { paddingTop: '20px' } }>
                                    <Link href={ item?.videoLink }>
                                        <a target='_blank' style={ { textDecoration: 'underline' } }>
                                            { item?.videoTitle }
                                        </a>
                                    </Link>
                                </div>
                            </CardView>
                        </Grid>
                    )) }
                </Grid>
            </Box>
        </React.Fragment>
    );
};

Help.layout = Instructor;

export default Help;

