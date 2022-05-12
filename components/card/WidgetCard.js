import * as React from 'react'
import Grid from '@mui/material/Grid'
import { Heading, CardView } from '../../components'

const WidgetCard = ({
  title,
  icon,
  count
}) => {
  return (
    <CardView>
      <Grid container spacing={2} justify="right">
        <Grid item xs={8}>
          <Heading title={title} color="common.gray" />
          <Heading title={count} />
        </Grid>
        <Grid item xs={4} style={{ textAlign: 'right' }}>
          {icon}
        </Grid>
      </Grid>
    </CardView>
  )
}

export default WidgetCard