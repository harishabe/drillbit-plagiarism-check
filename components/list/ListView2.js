import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { Skeleton, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Title1, SubTitle2 } from '../index';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import BeatLoader from "react-spinners/BeatLoader";
import { ErrorBlock } from '../index'
import { formatDate } from '../../utils/RegExp'

const useStyles = makeStyles((theme) => ({
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
}))

const AlignRight = styled.div`
    text-align:right;
    margin-right: 200px;
`

const Colors = ['#7B68C8', '#68C886', '#8D34FF', '#34C2FF', '#3491FF', '#68C886'];

function createId(questionId) {
    return { questionId }
};

const ListView2 = ({
    GetQna,
    qnaData,
    isLoadingQa,
    isLoadingAns,
    handleSend
}) => {

    const router = useRouter();
    const classes = useStyles();

    const [id, setId] = useState([]);
    const [ans1, setAns1] = useState();
    const [ans2, setAns2] = useState();
    const [ans3, setAns3] = useState();
    const [ans4, setAns4] = useState();
    const [ans5, setAns5] = useState();

    useEffect(() => {
        GetQna(router.query.clasId, router.query.assId);
    }, []);

    const QnaMessage = (qnaData) => {
        if (qnaData?.message) {
            return qnaData?.message
        } else {
            QnaData(qnaData)
        }
    }

    const QnaData = (qnaData) => {
        let id = '';
        let arr = [];
        qnaData?.map((item, index) => {
            id = createId(
                item.id = `qId${index + 1}`,
            );
            arr.push(id)
        });
        setId([...arr]);
    }

    useEffect(() => {
        QnaMessage(qnaData)
    }, [qnaData]);

    return (
        <>
            <List>
                { isLoadingQa ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </> :
                    <>
                        { qnaData?.message ?
                            <ErrorBlock message={ qnaData?.message } /> :
                            qnaData?.map((item, index) => (
                            item['bgcolor'] = Colors[index],
                            item['id'] = item.id,
                            <>
                                {
                                    <>
                                        <ListItem
                                            key={ index }
                                            style={ {
                                                paddingLeft: '0px',
                                                paddingRight: '0px',
                                            } }
                                        >
                                            <Grid container spacing={ 1 }>
                                                <Grid item xs={ 0 }>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            sx={ {
                                                                width: 42,
                                                                height: 42,
                                                                marginTop: '8px',
                                                                background: item.bgcolor,
                                                                color: '#fff',
                                                            } }
                                                        >
                                                            Q{ index + 1 }
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                </Grid>
                                                <Grid item xs={ 9 }>
                                                    <ListItemText
                                                        disableTypography
                                                        className={ classes.itemText }
                                                        primary={ <Title1 title={ item.question } /> }
                                                        secondary={
                                                            <>
                                                                <Card
                                                                    sx={ {
                                                                        flexWrap: 'wrap',
                                                                        '& > :not(style)': {
                                                                            ml: 2,
                                                                            mt: 2,
                                                                            mb: 2
                                                                        },
                                                                    } }
                                                                >
                                                                    { item.answer ? <SubTitle2 title={ item.answer } /> :
                                                                        <>
                                                                            { item.id === 'qId1' &&

                                                                                <textarea
                                                                                    rows="5"
                                                                                    name={ item.question === qnaData[index].question ? item.id : '' }
                                                                                    value={ ans1 }
                                                                                    cols="123"
                                                                                    onChange={ (e) => {
                                                                                        setAns1(e.target.value)
                                                                                    } }
                                                                                    placeholder='Click to Answer here'
                                                                                >
                                                                                </textarea>

                                                                            }
                                                                            { item.id === 'qId2' &&

                                                                                <textarea
                                                                                    rows="5"
                                                                                    name={ item.question === qnaData[index].question ? item.id : '' }
                                                                                    value={ ans2 }
                                                                                    cols="123"
                                                                                    onChange={ (e) => {
                                                                                        setAns2(e.target.value)
                                                                                    } }
                                                                                    placeholder='Click to Answer here'
                                                                                >
                                                                                </textarea>

                                                                            }
                                                                            { item.id === 'qId3' &&

                                                                                <textarea
                                                                                    rows="5"
                                                                                    name={ item.question === qnaData[index].question ? item.id : '' }
                                                                                    value={ ans3 }
                                                                                    cols="123"
                                                                                    onChange={ (e) => {
                                                                                        setAns3(e.target.value)
                                                                                    } }
                                                                                    placeholder='Click to Answer here'
                                                                                >
                                                                                </textarea>

                                                                            }
                                                                            { item.id === 'qId4' &&

                                                                                <textarea
                                                                                    rows="5"
                                                                                    name={ item.question === qnaData[index].question ? item.id : '' }
                                                                                    value={ ans4 }
                                                                                    cols="123"
                                                                                    onChange={ (e) => {
                                                                                        setAns4(e.target.value)
                                                                                    } }
                                                                                    placeholder='Click to Answer here'
                                                                                >
                                                                                </textarea>

                                                                            }
                                                                            { item.id === 'qId5' &&

                                                                                <textarea
                                                                                    rows="5"
                                                                                    name={ item.question === qnaData[index].question ? item.id : '' }
                                                                                    value={ ans5 }
                                                                                    cols="123"
                                                                                    onChange={ (e) => {
                                                                                        setAns5(e.target.value)
                                                                                    } }
                                                                                    placeholder='Click to Answer here'
                                                                                >
                                                                                </textarea>

                                                                            }
                                                                        </>
                                                                    }
                                                                </Card>
                                                            </>
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs>
                                                    <ListItemText
                                                        style={ { textAlign: 'right' } }
                                                        disableTypography
                                                        className={ classes.right }
                                                            primary={ <SubTitle2 title={ 'Asked : ' + formatDate(item.question_date) } /> }
                                                    />
                                                </Grid>
                                            </Grid>
                                            </ListItem>
                                    </>
                                }
                                </>
                            ))
                        }

                        { qnaData?.message ? '' :
                            <AlignRight>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="button"
                                        color="primary"
                                        onClick={ (e) => handleSend(e, ans1, ans2, ans3, ans4, ans5) }
                                    >
                                        { isLoadingAns ? <BeatLoader color="#fff" /> : 'Submit Answer' }
                                    </Button>
                            </AlignRight>
                        }
                    </>
                }
            </List>
        </>
    )
}

export default ListView2