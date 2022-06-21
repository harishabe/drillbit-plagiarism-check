import * as React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Heading, CardView } from '../../components';
import { IconButton } from '@mui/material';

const WidgetCard = ({
    title,
    icon,
    count,
    handleDownload,
    isLoading
}) => {
    return (
        <CardView>
            <Grid container spacing={2} justify="right">
                <Grid item xs={8}>
                    <Heading title={title} color="common.gray" />
                    {isLoading ? <Skeleton /> : <Heading title={count} />}

                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    <IconButton onClick={(e) => handleDownload(e, title)}>{icon}</IconButton>
                </Grid>
            </Grid>
        </CardView>
    )
}

export default WidgetCard