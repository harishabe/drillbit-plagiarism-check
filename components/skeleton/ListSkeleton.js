import * as React from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Title, SubTitle, SubTitle1 } from '../index';
import { Divider } from '@mui/material';
import { Skeleton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    item: {
        paddingLeft: '0px', paddingRight: '0px'
    },
    itemText: {
        marginLeft: '5px'
    },
    right: {
        textAlign: 'right'
    }
}))

const ListSkeleton = ({
    listData
}) => {
    const classes = useStyles()
    return (
        <List>
            <ListItem className={classes.item}>
                <ListItemAvatar style={{ marginRight: '5px' }}>
                    <Skeleton variant='circular' width={50} height={50} />
                </ListItemAvatar>
                <Skeleton width="100%" />
            </ListItem>
            <Divider />
        </List>
    )
}

export default ListSkeleton