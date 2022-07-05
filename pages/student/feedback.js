import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { MainHeading, Title1, SubTitle2 } from '../../components'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { MessageExclamatoryIcon } from '../../assets/icon'

const Feedback = ({
    GetFeedback,
    feedbackData,
    isLoadingFeedback
}) => {
    const router = useRouter();

    useEffect(() => {
        GetFeedback(router.query.clasId, router.query.assId);
    }, [router.query.clasId, router.query.assId]);

    return (
        <>
            <ListItem>
                <ListItemAvatar style={ { minWidth: '38px', marginTop: '-5px' } }>
                    <MessageExclamatoryIcon />
                </ListItemAvatar>
                <MainHeading title='Feedback Form' />
            </ListItem>
            <Grid display={ 'flex' } sx={ { ml: 2 } }>
                <SubTitle2 title='Your Score : &nbsp;' />
                { isLoadingFeedback ? <Skeleton width={ "70px" } /> :
                    <Title1 title={ `${feedbackData.obtained_marks} / ${feedbackData.max_marks}` } />
                }
            </Grid>
            <ListItemText
                disableTypography
                sx={ { mt: 2, ml: 2 } }
                primary={ <SubTitle2 title='Instructor Feedback' /> }
                secondary={
                    <Card
                        sx={ {
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                mb: 3,
                                ml: 2,
                                mt: 2,
                                maxWidth: 700,
                                minHeight: 50,
                            },
                        } }
                    >
                        { isLoadingFeedback ? <Skeleton width={ "300px" } height={ "2px" } /> :
                            <SubTitle2 title={ feedbackData.feedback } />
                        }
                    </Card>
                }
            />

            <ListItemText /> 
        </>
    )
}

export default Feedback