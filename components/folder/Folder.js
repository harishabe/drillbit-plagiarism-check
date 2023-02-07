import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { Divider, Tooltip } from '@mui/material';
import {
    ThreeDotIcon,
    EditIcon,
    DeleteIcon,
} from '../../assets/icon';
import { EllipsisText } from '../../components';
import { CARD_FOLDER_ACTIONS } from '../../constant/data/Constant';

const Container = styled.div`
    position: relative;
    background-repeat: no-repeat;
    width: 100%;
    height: 200px;
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: flex-end;
`;

const Center = styled.div`
    padding-top: 32%;
    padding-left: 10px;
`;

const FileCountContainer = styled.div`
    margin-bottom: 10px;
`;

const AlignRight = styled.div`
    padding-top: 10%;
    margin-left:85%;
`;

const Folder = ({
    path,
    item,
    isAction,
    handleClick,
    handleDelete,
}) => {

//     const Container = styled.div`
//     position: relative;
//     background-repeat: no-repeat;
//     width: 100%;
//     height: 200px;
//     display: flex;
//     color: white;
//     flex-direction: column;
//     justify-content: flex-end;
//     background-image: ${item.no_of_submissions > 0 ? 'url(\'/img/FolderOpenPng.png\')' : 'url(\'/img/Folder.svg\')'};
// `;
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
        <Container submissionCount={ item.no_of_submissions }
            style={ {
                cursor: 'pointer',
                backgroundImage: item.no_of_submissions > 0 ? 'url(\'/img/FolderOpenPng.png\')' : 'url(\'/img/Folder.svg\')'
            } }>
            <Grid item xs={ 11.8 }>
                { isAction &&
                    <>
                    <Tooltip title={ CARD_FOLDER_ACTIONS } arrow>
                        <IconButton onClick={ handleMenuClick }>
                                <ThreeDotIcon />
                            </IconButton>
                        </Tooltip>
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
                            <ListItemText sx={ { mr: 1 } }>Delete</ListItemText>
                                <DeleteIcon />
                            </MenuItem>
                        </Menu>
                    </> }
            </Grid>
            <Center onClick={ () => router.push(path) }>
                <EllipsisText variant="body_1" value={ item.folder_name } charLength={ 15 } />
                <FileCountContainer>{ item.no_of_submissions } Files</FileCountContainer>
            </Center>
        </Container>
    );
};

export default Folder;
