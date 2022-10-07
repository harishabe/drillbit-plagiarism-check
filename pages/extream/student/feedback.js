import React, { useState, useEffect } from 'react'
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
    feedbackId,
    isLoadingFeedback
}) => {
    const router = useRouter();
    const [data, setData] = useState({})

    useEffect(() => {
        feedbackData?.map((item) => {
            if (item?.paper_id === feedbackId) {
                let a = {
                    'obtained_marks': item?.obtained_marks,
                    'max_marks': item?.max_marks,
                    'feedback': item?.feedback,
                }
                setData(a)
            }
        })
    }, [feedbackData, feedbackId]);


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
                    <Title1 title={ `${data?.obtained_marks === undefined ? NO_DATA_PLACEHOLDER : data?.obtained_marks} / ${data?.max_marks === undefined ? NO_DATA_PLACEHOLDER : data?.max_marks}` } />
                }
            </Grid>
            <Title>
                <SubTitle2 title='Instructor Feedback' />
            </Title>
            <Title>
                <Box
                    sx={ {
                        width: 520,
                        height: 'auto',
                        borderRadius: '3px',
                        backgroundColor: '#E7E7E7',
                        padding: '12px'
                    } }>
                    { isLoadingFeedback ? <Skeleton width={ "300px" } height={ "2px" } /> :
                        <SubTitle2 title={ data?.feedback === undefined ? feedbackData?.message : data?.feedback } />
                    }
                </Box>
            </Title>
        </>
    )
}

export default Feedback