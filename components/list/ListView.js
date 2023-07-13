import * as React from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Title, SubTitle, SubTitle1, EllipsisText } from '../index';
import { Divider } from '@mui/material';
import { NO_DATA_PLACEHOLDER } from '../../constant/data/Constant';

const useStyles = makeStyles(() => ({
    item: {
        paddingLeft: 0,
        paddingRight: 0,
        margin: '15px 0px'
    },
    itemText: {
        marginLeft: '5px',
    },
    right: {
        textAlign: 'right',
        minWidth: '55px'
    }
}));

const ListView = ({
    listData
}) => {
    const classes = useStyles();
    return (
        <List style={{height:'273px'}}>
            {listData?.map((item) => (
                <div key={item.name}>
                    <ListItem key={item.name} style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                        <ListItemAvatar style={{ marginRight: '5px' }}>
                            <Avatar sx={{ width: 50, height: 50, marginBottom: '5px', background: item.bgcolor, color: '#fff' }}>
                                {item.name.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography
                            className={classes.itemText}
                            primary={ <EllipsisText value={ item.name } variant='h5' /> }
                            secondary={ <EllipsisText value={ item.department === null ? NO_DATA_PLACEHOLDER : item.department } variant='h4' /> }
                        />
                        <ListItemText
                            disableTypography
                            className={classes.right}
                            primary={<Title title={item.percentage + '%'} color="primary" />}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    );
};

export default ListView;