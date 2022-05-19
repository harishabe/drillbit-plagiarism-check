import * as React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardView from '../card/CardView'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
};

const useStyles = makeStyles((theme) => ({
    selected: {
        background: '#5181F1',
        color: '#fff !important',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px'
    },
    selected1: {
        background: 'red',
        color: '#fff !important',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px'
    },
    marginTop: {
        marginTop: '25px'
    }
}))

const TabMenu = ({
    menuButton,
    components,
    isCardView
}) => {

    const classes = useStyles()

    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box className={classes.marginTop} sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                >
                    {menuButton.map((item, index) => (
                        <Tab
                            classes={{
                                selected: classes.selected,
                            }}
                            label={item.label}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            {components.map((component, index) => (
                <TabPanel value={value} index={index}>
                    <CardView>{component}</CardView>
                </TabPanel>
            ))}
        </Box>
    )
}
export default TabMenu
