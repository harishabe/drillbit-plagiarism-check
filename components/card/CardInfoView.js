import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Divider } from '@mui/material';

const CardInfoView = ({
    children
}) => {
    return (
        <React.Fragment>
            <Card>
                <CardContent>
                   asdf
                </CardContent>
                <Divider />
                <CardActions>
                    dasf
                </CardActions>
            </Card>
        </React.Fragment>
    )
};

export default CardInfoView;