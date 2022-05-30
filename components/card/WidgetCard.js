import * as React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Heading, CardView } from '../../components';

const WidgetCard = ({
    title,
    icon,
    count
}) => {
    console.log('countcountcountcountcount',count);
    return (
        <CardView>
            <Grid container spacing={2} justify="right">
                <Grid item xs={8}>
                    <Heading title={title} color="common.gray" />
                    {count === undefined ? <Skeleton /> : <Heading title={count} />}
                    
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    {icon}
                </Grid>
            </Grid>
        </CardView>
    )
}

export default WidgetCard