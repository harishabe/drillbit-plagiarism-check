import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import {
    ThreeDotIcon,
    EditIcon,
    DeleteIcon,
} from '../../assets/icon';

const Container = styled.div`
    position: relative;
    background-image: url(${'/img/FolderPng.png'});
    background-repeat: no-repeat;
    color: white;
    height: 100%;
`;

const Center = styled.div`
    padding-top: 35%;
    padding-left: 5%;
`;

const Wrapper = styled.div`
    background-image: url(${'/img/FolderPng.png'});
    position: relative;
    height: 96%;
    width: 275px;
`;

const AlignRight = styled.div`
    padding-top: 10%;
    text-align:right;
`

const Folder = ({
    path,
    item,
    isAction,
    handleClick,
    handleDelete,
}) => {

    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        // onClick = {(e) => router.push(path)}
        <Container>
            <Grid item xs={ 11.8 }>
                { isAction &&
                    <>
                        <AlignRight>
                            <IconButton onClick={ handleMenuClick }>
                                <ThreeDotIcon />
                            </IconButton>
                        </AlignRight>
                        <Menu
                            id="action-menu"
                            anchorEl={ anchorEl }
                            open={ open }
                            onClose={ handleClose }
                            PaperProps={ {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            } }
                            transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                            anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
                        >
                            <MenuItem onClick={ (e) => {
                                setAnchorEl(null);
                                handleClick(e, item);
                            } }>
                                <ListItemText>Edit</ListItemText>
                                <EditIcon />
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={ (e) => {
                                setAnchorEl(null);
                                handleDelete(e, item);
                            } }>
                                <ListItemText>Delete</ListItemText>
                                <DeleteIcon />
                            </MenuItem>
                        </Menu>
                    </> }
            </Grid>
            <Center onClick={ (e) => router.push(path) }>
                <div>{item.folder_name}</div>
                <div style={{ marginBottom: '10px' }}>Empty folder</div>
            </Center>
        </Container>
    );
};

export default Folder;
