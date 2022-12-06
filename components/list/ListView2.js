import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Skeleton, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Title1, SubTitle2 } from '../index';
import Grid from '@mui/material/Grid';
import BeatLoader from 'react-spinners/BeatLoader';
import { ErrorBlock } from '../index';
import { formatDate } from '../../utils/RegExp';

const useStyles = makeStyles(() => ({
    item: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    itemText: {
        marginLeft: '5px',
    },
    right: {
        textAlign: 'right',
    },
}));

const AlignRight = styled.div`
    text-align:right;
    margin-right: 200px;
`;

const Colors = ['#7B68C8', '#68C886', '#8D34FF', '#34C2FF', '#3491FF', '#68C886'];


const ListView2 = ({
    GetQna,
    qnaData,
    isLoadingQa,
    isLoadingAns,
    handleSend
}) => {

    const router = useRouter();

    const classes = useStyles();
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        GetQna(router.query.clasId, router.query.assId);
    }, []);

    const handleAnswer = (e) => {
        setAnswer({ ...answer, [e.target.name]: e.target.value });
    };

    return (
        <>
            <List>
                {isLoadingQa ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </> :
                    <>
                        {qnaData?.message ?
                            <ErrorBlock message={qnaData?.message} /> :
                            qnaData?.map((item, index) => (
                                item['bgcolor'] = Colors[index],
                                item['id'] = `Q${index + 1}`,
                                <>
                                    {
                                        <>
                                            <ListItem
                                                key={index}
                                                style={{
                                                    paddingLeft: '0px',
                                                    paddingRight: '0px',
                                                }}
                                            >
                                                <Grid container spacing={1}>
                                                    <Grid item xs={0}>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                sx={{
                                                                    width: 42,
                                                                    height: 42,
                                                                    marginTop: '8px',
                                                                    background: item.bgcolor,
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                Q{index + 1}
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                    </Grid>
                                                    <Grid item xs={ 8 }>
                                                        <ListItemText
                                                            disableTypography
                                                            className={classes.itemText}
                                                            primary={<Title1 title={item.question} />}
                                                            secondary={
                                                                <>
                                                                    {
                                                                        item.answer ? <Box
                                                                            sx={ {
                                                                                width: 850,
                                                                                height: 'auto',
                                                                                borderRadius: '3px',
                                                                                backgroundColor: '#E7E7E7',
                                                                                padding: '12px'
                                                                            } }>
                                                                            <SubTitle2 title={ item.answer } />
                                                                        </Box> : 
                                                                        <>
                                                                            <textarea
                                                                                rows="5"
                                                                                name={'a' + (index + 1)}
                                                                                cols="90"
                                                                                onChange={handleAnswer}
                                                                                placeholder='Click to Answer here'
                                                                            >

                                                                            </textarea>
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={ 3 }>
                                                        <ListItemText
                                                            disableTypography
                                                            className={classes.right}
                                                            primary={<SubTitle2 title={'Asked : ' + formatDate(item.question_date)} />}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        </>
                                    }
                                </>
                            ))
                        }

                        {qnaData?.message ? '' :
                            <AlignRight>
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="button"
                                    disabled={isLoadingAns}
                                    color="primary"
                                    onClick={(e) => handleSend(e, answer, qnaData)}

                                >
                                    {isLoadingAns ? <BeatLoader color="#fff" /> : 'Submit Answer'}
                                </Button>
                            </AlignRight>
                        }
                    </>
                }
            </List>
        </>
    );
};

export default ListView2;