import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { MainHeading, Title1, SubTitle2 } from '../../../components';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { MessageExclamatoryIcon } from '../../../assets/icon';
import { NO_DATA_PLACEHOLDER } from '../../../constant/data/Constant';

const Title = styled.div`
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 10px;
`;

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
                    <Title1 title={ `${feedbackData?.obtained_marks === undefined ? NO_DATA_PLACEHOLDER : feedbackData[0]?.obtained_marks} / ${feedbackData?.max_marks === undefined ? NO_DATA_PLACEHOLDER : feedbackData[0]?.max_marks}` } />
                }
            </Grid>
            <Title>
                <SubTitle2 title='Instructor Feedback' />
            </Title>
            <Title>
                <Box
                    sx={ {
                        width: 800,
                        height: 'auto',
                        borderRadius: '3px',
                        backgroundColor: '#E7E7E7',
                        padding: '12px'
                    } }>
                    { isLoadingFeedback ? <Skeleton width={ "300px" } height={ "2px" } /> :
                        <SubTitle2 title={ feedbackData?.feedback === undefined ? feedbackData?.message : feedbackData[0]?.feedback } />
                    }
                </Box>
            </Title>
        </>
    )
}

export default Feedback