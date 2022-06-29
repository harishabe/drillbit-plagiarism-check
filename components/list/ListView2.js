import React, { useState } from 'react';
import { Skeleton, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Title1, SubTitle2 } from '../index';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import BeatLoader from "react-spinners/BeatLoader";

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

const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];

const ListView2 = ({
    qnaData,
    isLoadingQa,
    handleSend
}) => {
    const classes = useStyles()

    const [ans, setAns] = useState("");

    return (
        <List>
            { qnaData.map((item, index) => (
                item['bgcolor'] = Colors[index],
                <>
                    {
                        isLoadingQa ?
                            <>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </> :
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
                                                    A1
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
                                                                <div>
                                                                    <form>
                                                                        <textarea
                                                                            value={ ans }
                                                                            rows="5"
                                                                            cols="123"
                                                                            onChange={ (e) => setAns(e.target.value) }
                                                                        // style='border-style : none;'
                                                                        >
                                                                        </textarea>
                                                                    </form>
                                                                </div>
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
                                                primary={ <SubTitle2 title={ 'Asked : ' + item.date } /> }
                                            />
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </>
                    }
                </>
            ))}
            <Grid container spacing={ 16 }>
                <Grid item xs={ 8 }></Grid>
                <Grid item xs={ 4 }>
                    <Button
                        variant="contained"
                        size="large"
                        type="button"
                        color="primary"
                        onClick={ (e) => handleSend(e, ans) }
                    >
                        {/* { isLoadingQa ? <BeatLoader color="#fff" /> : 'Send' } */ }
                        Send
                    </Button>
                </Grid>
            </Grid>
        </List>
    )
}

export default ListView2