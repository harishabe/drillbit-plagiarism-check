import React from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { MainHeading, Title1, SubTitle2 } from '../../components'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { MessageExclamatoryIcon } from '../../assets/icon'

const Feedback = () => {
    return (
        <>
            <ListItem>
                <ListItemAvatar style={{ minWidth: '38px', marginTop: '-5px' }}>
                    <MessageExclamatoryIcon />
                </ListItemAvatar>
                <MainHeading title='Feedback Form' />
            </ListItem>
            <Grid display={'flex'} sx={{ ml: 2 }}>
                <SubTitle2 title='Your Score : &nbsp;' />
                <Title1 title='8/10' />
            </Grid>
            <ListItemText
                disableTypography
                sx={{ mt: 2, ml: 2 }}
                primary={<SubTitle2 title='Instructor Feedback' />}
                secondary={
                    <Card
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                mb: 3,
                                ml: 2,
                                mt: 2,
                                maxWidth: 700,
                                minHeight: 50,
                            },
                        }}
                    >
                        <SubTitle2 title='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis aliquid sapiente facere sunt excepturi fuga magnam harum voluptas reprehenderit sequi.' />
                    </Card>
                }
            />

            <ListItemText />
        </>
    )
}

export default Feedback
