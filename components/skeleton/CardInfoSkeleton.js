import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Divider, Skeleton } from '@mui/material';

const useStyles = makeStyles(() => ({
    marginTop10: {
        marginTop: '10px'
    },
    marginTop15: {
        marginTop: '15px'
    },
    padding18: {
        padding: '18px'
    }
}));

const CardInfoSkeleton = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Card className={classes.marginTop10}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Skeleton variant="circular" width={60} height={60} className={classes.marginTop10} />
                            <Skeleton width={100} className={classes.marginTop15} />
                            <Skeleton width={200} className={classes.marginTop10} />
                        </Grid>
                        <Grid item xs={2}>
                            <Skeleton />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions className={classes.padding18}>
                    <Grid container>
                        <Grid item md={9} xs={9}>
                            <Skeleton width={100} />
                        </Grid>
                        <Grid item md={3} xs={3}>
                            <Skeleton width={100} />
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default CardInfoSkeleton;