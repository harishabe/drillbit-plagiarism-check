import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardView = ({
    children,
    height
}) => {
    return (
        <Card style={{ height }}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
    
};

export default CardView;