import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ProAdmin from '../../../../layouts/ProAdmin';
import { MainHeading, Title, CardView } from './../../../../components';
import Link from 'next/link';
import { getItemSessionStorage } from '../../../../utils/RegExp'

const Help = () => {

    const [data, setData] = useState([
        {
            'role': 'admin',
            'isShow': false,
            'pdfLinkTitle': 'Admin tutorial PDF download',
            'pdfLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Organization%20admin%20user%20guide%20-%202022.pdf',
            'videoTitle': 'Admin video tutorial',
            'videoLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Organization%20admin%20user%20guide%20-%202022.pdf'
        },
        {
            'role': 'user',
            'isShow': false,
            'pdfLinkTitle': 'User tutorial PDF download',
            'pdfLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Organization%20user%20guide%20-%202022.pdf',
            'videoTitle': 'User video tutorial',
            'videoLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Organization%20user%20guide%20-%202022.pdf'
        }
    ]);

    useEffect(() => {
        let d = data?.map((item) => {
            if (getItemSessionStorage('role') === 'lim-admin') {
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
                                <Title title={ item?.role?.charAt(0)?.toUpperCase() + item?.role?.slice(1) } />
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

Help.layout = ProAdmin;

export default Help;

