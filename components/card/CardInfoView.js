import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import { Divider } from '@mui/material'
import { Heading, SubTitle2 } from '../index'
import { TimerIcon } from '../../assets/icon'

const CardInfoView = ({
  item
}) => {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Avatar sx={{ bgcolor: item.color, width: 50, height: 50, fontSize: '15px' }}
            variant="circle" style={{ margin: '20px 0px' }}>
            {item.name.split(' ').map(item => item.toUpperCase().substring(0, 1)).join('')}
          </Avatar>
          <Heading title={item.name} />
          <SubTitle2 title={item.description} />
        </CardContent>
        <Divider />
        <CardActions style={{ padding: '18px' }}>
          <TimerIcon /> <SubTitle2 title={item.validity} ml="10px" />
        </CardActions>
      </Card>
    </React.Fragment>
  )
}

export default CardInfoView