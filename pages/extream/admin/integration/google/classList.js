import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, Grid } from '@mui/material';
import {
    CardView,
} from '../../../../../components';

const ClassList = () => {

    const [state, setState] = useState([
        { id: 123, name: 'Gilad Gray', value: true },
        { id: 456, name: 'Jason Killian', value: false },
        { id: 789, name: 'Antoine Llorca', value: false },
    ]);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.id]: event.target.checked,
        });
    };

    return (
        <>
            <CardView>
                <FormLabel component="legend">Classes list</FormLabel>
                <Grid container style={ { justifyContent: 'center' } }>
                    { state?.map((item) => (
                        console.log('item', item),
                        <Grid item md={ 4 } xs={ 12 }>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={ item.value } onChange={ handleChange } id={ item.id } />
                                }
                                label={ item?.name }
                            />
                        </Grid>
                    )) }
                </Grid>
            </CardView>
        </>
    );
}

export default ClassList
