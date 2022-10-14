import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { getItemLocalStorage } from '../../utils/RegExp';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `simple-tabpanel-${index}` }
            aria-labelledby={ `simple-tab-${index}` }
            { ...other }
        >
            { value === index && (
                <Box>
                    { children }
                </Box>
            ) }
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const useStyles = makeStyles(() => ({
    selected: {
        background: '#3672FF',
        color: '#fff !important',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px'
    },
    unSelected: {
        background: '#f8f8f8',
        color: '#fff !important',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px'
    },
    marginTop: {
        marginTop: '5px'
    }
}));

const TabMenu = ({
    menuButton,
    components,
    handleAPI
}) => {

    const classes = useStyles();

    const [value, setValue] = React.useState(tabValue);

    const tabValue = () => {
        let Tab = getItemLocalStorage('tab') !== null ? parseInt(getItemLocalStorage('tab')) : 0
        let SubTab = getItemLocalStorage('subTab') !== null ? parseInt(getItemLocalStorage('subTab')) : 0
        if ((getItemLocalStorage('subTab') === null) || (getItemLocalStorage('subTab') === undefined)) {
            setValue(Tab);
            handleAPI(Tab);
        } else {
            setValue(SubTab);
            handleAPI(SubTab);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        handleAPI(newValue);
    };

    useEffect(() => {
        setTimeout(() => {
            tabValue();
        }, [100]);
    }, [])

    return (
        <Box sx={ { width: '100%' } }>
            <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
                <Tabs
                    value={ value }
                    onChange={ handleChange }
                    indicatorColor='primary'
                >
                    { menuButton.map((item, index) => (
                        <Tab key={ index }
                            classes={ {
                                selected: classes.selected,
                            } }
                            label={ item.label }
                            { ...a11yProps(index) }
                        />
                    )) }
                </Tabs>
            </Box>
            { components.map((component, index) => (
                <TabPanel key={ index } value={ value } index={ index }>
                    { component }
                </TabPanel>
            )) }
        </Box>
    );
};
export default TabMenu;

