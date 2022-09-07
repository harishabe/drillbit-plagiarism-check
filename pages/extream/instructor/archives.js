import React from 'react'
import Grid from '@mui/material/Grid'
import { CardInfoView } from '../../components'

const classes = [
    {
        name: 'Java',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#38BE62',
    },
]

function Archives() {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {classes.map((item, index) => (
                    <Grid key={index} item md={4} xs={12}>
                        <CardInfoView
                            item={item}
                            isAvatar={true}
                            isHeading={true}
                            isTimer={true}
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Archives
