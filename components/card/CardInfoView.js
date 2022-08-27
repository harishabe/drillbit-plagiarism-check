import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { SubTitle2, EllipsisText } from '../index';
import {
    TimerIcon,
    DownloadFileIcon,
    InstructorPersonIcon,
    ThreeDotIcon,
    EditIcon,
    DeleteIcon,
    ArchieveIcon
} from '../../assets/icon';
import SubTitle1 from '../typography/SubTitle1';
import Switch from '@mui/material/Switch';

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inherit'
    },
    margin: {
        margin: '20px 0px'
    },
    right: {
        textAlign: 'right'
    },
    img: {
        width: '25%',
        marginBottom: '10px'
    }
}))

const AlignRight = styled.div`
    text-align:right;
`


const StatusColor = styled.div`
    display: inline-flex;
    background: ${(props) => props.color};
    padding: 5px 5px 0px 5px;
`;


const CardInfoView = ({
    item,
    path,
    isDownload,
    isSubmit,
    submitPath,
    isTimer,
    isKnowMore,
    isConfig,
    isAvatar,
    isHeading,
    isInstructorName,
    isImage,
    isNextPath,
    statusColor,
    isAction,
    handleClick,
    handleDelete,
    handleConfig,
    handleDownload,
    checked
}) => {
    const router = useRouter();

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Validity = (validity) => {
        if (validity < '0') {
            return 'Expired'
        } else if (validity === '0') {
            return 'Expires today'
        } else if (validity === '1') {
            return `${validity} day left`
        } else {
            return `${validity} days left`
        }
    }

    return (
        <React.Fragment>
            {/* onClick={ (e) => router.push(path) } */}
            <Card style={{ marginTop: '10px', cursor: 'pointer' }}>
                <CardContent>
                    {isDownload &&
                        <AlignRight>
                            <IconButton onClick={ (e) => handleDownload(e, item) }>
                                <DownloadFileIcon />
                            </IconButton>
                        </AlignRight>}
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            {isAvatar &&
                                <Avatar
                                    sx={{ bgcolor: item.color, width: 50, height: 50, fontSize: '15px' }}
                                    variant="circle"
                                    className={classes.margin}
                                >
                                    {item.name.toUpperCase().charAt(0)}
                                </Avatar>}
                        </Grid>
                        <Grid item xs={2}>
                            {isAction &&
                                <>
                                    <AlignRight>
                                        <IconButton onClick={handleMenuClick}>
                                            <ThreeDotIcon />
                                        </IconButton>
                                    </AlignRight>
                                    <Menu
                                        id="action-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
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
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={(e) => {
                                            setAnchorEl(null);
                                            handleClick(e, item);
                                        }}>
                                            <ListItemText>Edit</ListItemText>
                                            <EditIcon />
                                        </MenuItem>
                                        {/* <Divider />
                                    <MenuItem>
                                            <ListItemText sx={{ marginRight: '5px' }}>Archieve</ListItemText>
                                            <ArchieveIcon />
                                        </MenuItem> */}
                                        <Divider />
                                        <MenuItem onClick={(e) => {
                                            setAnchorEl(null);
                                            handleDelete(e, item);
                                        }}>
                                            <ListItemText>Delete</ListItemText>
                                            <DeleteIcon />
                                        </MenuItem>
                                    </Menu>
                                </>}
                        </Grid>
                    </Grid>

                    {isImage && <img style={{ marginBottom: '15px' }} src={item.img} alt={item.lms} />}

                    {isKnowMore ?
                        <SubTitle1 textColor="#808080" title={item?.description} /> : ''}

                    {isHeading && <EllipsisText value={item.name} charLength={30} />}

                    {isInstructorName &&
                        <Grid container sx={{ mt: 1.5 }}>
                            <Grid>
                                <InstructorPersonIcon />
                            </Grid>
                            <Grid sx={{ ml: 1 }}>
                                <SubTitle2
                                    title={item.instructorName}
                                />
                            </Grid>
                        </Grid>
                    }

                </CardContent>
                <Divider />
                <CardActions style={ { padding: '18px' } }>
                    <Grid container>
                        <Grid item md={9} xs={9}>
                            {isTimer &&
                                <StatusColor
                                    style={ { borderRadius: '3px' } }
                                    color={statusColor}
                                >
                                    <TimerIcon />
                                    <SubTitle2
                                        title={Validity(item.validity)}
                                        ml="10px"
                                    />
                                </StatusColor>}

                            { isKnowMore &&
                                <>
                                    <div onClick={ (e) => router.push({ 'pathname': item?.path, query: { integration: item.type } }) }>
                                        { item?.lmsconfigured &&
                                            <SubTitle1 textColor="primary" title="Know More" />
                                    }
                                </div>
                                </>
                            }
                        </Grid>

                        <Grid className={classes.right} item md={3} xs={3}>
                            {isSubmit ?
                                <Link href={submitPath}>
                                    <Button
                                        variant="contained"
                                        size="small">
                                        Submit
                                    </Button>
                                </Link>
                                : ''}
                            {isConfig &&
                                <Switch
                                    disabled={item?.lmsconfigured === true}
                                    checked={item?.lmsconfigured}
                                    onChange={handleConfig}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    name={item?.lms}
                                />
                            }
                            {isNextPath &&
                                <IconButton onClick={(e) => router.push(path)}>
                                    <ArrowForwardOutlinedIcon />
                                </IconButton>
                            }
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

export default CardInfoView;