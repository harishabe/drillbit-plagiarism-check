import * as React from 'react';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Title1, SubTitle2 } from '../index';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
  item: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: '15px 0px',
  },
  itemText: {
    marginLeft: '5px',
  },
  right: {
    textAlign: 'right',
  },
}));

const ListView2 = ({ listData }) => {
  const classes = useStyles();
  return (
    <List>
      {listData.map((item, index) => (
        <>
          <ListItem
            key={index}
            style={{ paddingLeft: '0px', paddingRight: '0px' }}
          >
            <ListItemAvatar style={{ marginRight: '5px' }}>
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  marginBottom: '5px',
                  background: item.bgcolor,
                  color: '#fff',
                }}
              >
                A1
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              className={classes.itemText}
              primary={<Title1 title={item.que} />}
              secondary={
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                      mb: 3,
                      ml: 2,
                      width: 700,
                      height: 40,
                    },
                  }}
                >
                  <SubTitle2 title={item.ans} />
                </Box>
              }
            />

            <ListItemText
              style={{ textAlign: 'right' }}
              disableTypography
              className={classes.right}
              primary={<SubTitle2 title={'Asked : ' + item.date} />}
            />
          </ListItem>
          {/* <Divider /> */}
        </>
      ))}
    </List>
  );
};

export default ListView2;
