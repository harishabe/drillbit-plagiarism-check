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

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inherit'
    },
    margin: {
        margin: '20px 0px'
    },
    right: {
        textAlign: 'right'
    }
}))

const AlignRight = styled.div`
    text-align:right;
`

const StatusColor = styled.div`
    display: inline-flex;
    background: rgba(216, 79, 79, 0.4);
    padding: 5px 5px 0px 5px;
`

const CardInfoView = ({
    item,
    path,
    isDownload,
    isSubmit,
    submitPath
}) => {
    const router = useRouter()

    const classes = useStyles()

    return (
        <React.Fragment>
            <Card onClick={(e) => router.push(path)}>
                <CardContent>
                    {isDownload ?
                        <AlignRight>
                            <DownloadFileIcon />
                        </AlignRight> : ''}
                    <Avatar
                        sx={{ bgcolor: item.color, width: 50, height: 50, fontSize: '15px' }}
                        variant="circle"
                        className={classes.margin}
                    >
                        {item.name.split(' ').map(item => item.toUpperCase().substring(0, 1)).join('')}
                    </Avatar>
                    <Heading
                        title={item.name}
                    />
                    <SubTitle2
                        title={item.description}
                    />
                </CardContent>
                <Divider />
                <CardActions style={{ padding: '18px' }}>
                    <Grid container>
                        <Grid item md={9} xs={9} >
                            <StatusColor>
                                <TimerIcon />
                                <SubTitle2
                                    title={item.validity}
                                    ml="10px"
                                />
                            </StatusColor>
                        </Grid>
                        {isSubmit ?
                            <Grid className={classes.right} item md={3} xs={3}>
                                <Link href={submitPath}>
                                    <Button
                                        variant="contained"
                                        size="small">
                                        Submit
                                    </Button>
                                </Link>
                            </Grid> :
                            ''}
                    </Grid>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

export default CardInfoView