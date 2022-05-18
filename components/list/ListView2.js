import * as React from 'react'
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { Title1, SubTitle2 } from '../index'
import Card from '@mui/material/Card'

import Grid from '@mui/material/Grid'

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

const ListView2 = ({ listData }) => {
    const classes = useStyles()
    return (
        <List>
            {listData.map((item, index) => (
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
                  A1
                                </Avatar>
                            </ListItemAvatar>
                        </Grid>
                        <Grid item xs={9}>
                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={<Title1 title={item.que} />}
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
                                        <SubTitle2 title={item.ans} />
                                    </Card>
                                }
                            />
                        </Grid>
                        <Grid item xs>
                            <ListItemText
                                style={{ textAlign: 'right' }}
                                disableTypography
                                className={classes.right}
                                primary={<SubTitle2 title={'Asked : ' + item.date} />}
                            />
                        </Grid>
                    </Grid>
                </ListItem>
            ))}
        </List>
    )
}

export default ListView2
