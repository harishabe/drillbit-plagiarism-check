import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Admin from '../../../../layouts/Admin';
import { MainHeading, Title, CardView } from './../../../../components';
import Link from 'next/link';
import { getItemSessionStorage } from '../../../../utils/RegExp'

const Help = () => {

    const [data, setData] = useState([
        {
            'role': 'admin',
            'isShow': false,
            'pdfLinkTitle': 'Admin tutorial PDF download',
            'pdfLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Classroom%20Admin%20user%20guide%20-%202022.pdf',
            'videoTitle': 'Admin video tutorial',
            'videoLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Classroom%20Admin%20user%20guide%20-%202022.pdf'
        },
        {
            'role': 'instructor',
            'isShow': false,
            'pdfLinkTitle': 'Instructor tutorial PDF download',
            'pdfLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Instructor%20user%20guide%20-%202022.pdf',
            'videoTitle': 'Instructor video tutorial',
            'videoLink': 'https://www.drillbitplagiarism.com/userGuide/DrillBit%20Instructor%20user%20guide%20-%202022.pdf'
        }
    ]);

    useEffect(() => {
        let d = data?.map((item) => {
            if (getItemSessionStorage('role') === 'admin') {
                item['isShow'] = true;
            } 
            return item;
        });
        setData(d);
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <MainHeading title='Help' />
                <Grid container spacing={1}>
                    {data?.map((item, index) => (
                        item?.isShow &&
                        <Grid key={item.role} item md={4} sm={12}>
                            <CardView>
                                <Title title={item?.role?.charAt(0)?.toUpperCase() + item?.role?.slice(1)} />
                                <div style={{ marginTop: '20px' }}>
                                    <Link href={item?.pdfLink}>
                                        <a target='_blank' style={{ textDecoration: 'underline' }}>
                                            {item?.pdfLinkTitle}
                                        </a>
                                    </Link>
                                </div>
                                <div style={{ paddingTop: '20px' }}>
                                    <Link href={item?.videoLink}>
                                        <a target='_blank' style={{ textDecoration: 'underline' }}>
                                            {item?.videoTitle}
                                        </a>
                                    </Link>
                                </div>
                            </CardView>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </React.Fragment>
    );
};

Help.layout = Admin;

export default Help;

