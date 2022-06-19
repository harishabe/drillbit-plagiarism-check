import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const CardView = ({
    children,
    height
}) => {
    return (
        <React.Fragment>
            <Card style={{height}}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default CardView