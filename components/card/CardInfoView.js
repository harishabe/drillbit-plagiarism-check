import * as React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import { Divider } from '@mui/material'
import { Heading, SubTitle2 } from '../index'
import { TimerIcon, DownloadFileIcon } from '../../assets/icon'
import SubTitle1 from '../typography/SubTitle1'
import Switch from '@mui/material/Switch'

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
    isImage,
    statusColor,
}) => {
    const router = useRouter();

    const classes = useStyles();

    return (
        <React.Fragment>
            <Card style={{ marginTop: '10px' }} onClick={(e) => router.push(path)}>
                <CardContent>
                    {isDownload ?
                        <AlignRight>
                            <DownloadFileIcon />
                        </AlignRight> : ''}
                    {isAvatar ?
                        <Avatar
                            sx={{ bgcolor: item.color, width: 50, height: 50, fontSize: '15px' }}
                            variant="circle"
                            className={classes.margin}
                        >
                            {item.class_name.split(' ').map(item => item.toUpperCase().substring(0, 1)).join('')}
                        </Avatar> : ''}
                    {isImage ?
                        <img style={{ marginBottom: '15px' }} src={item.img} alt={item.name} /> : ''}

                    {isHeading ?
                        <Heading
                            title={item.class_name}
                        /> : ''}
                    <SubTitle2
                        title={item.description}
                    />
                </CardContent>
                <Divider />
                <CardActions style={{ padding: '18px' }}>
                    <Grid container>
                        <Grid item md={9} xs={9}>
                            {isTimer ?
                                <StatusColor color={statusColor}>
                                    <TimerIcon />
                                    <SubTitle2
                                        title={item.validity}
                                        ml="10px"
                                    />
                                </StatusColor> : ''}
                            {isKnowMore ?
                                <SubTitle1 textColor="primary" title="Know More" /> : ''}
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
                            {isConfig ? <Switch defaultChecked /> : ''}
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

export default CardInfoView