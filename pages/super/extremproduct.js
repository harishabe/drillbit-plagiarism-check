import React from 'react';
import SuperAdmin from './../../layouts/SuperAdmin'
import styled from 'styled-components';
import {
    BreadCrumb,
    CreateDrawer,
} from './../../components';
import ExtremeForm from './form/ExtremeForm';

const ExtremeBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Extreme',
        link: '',
        active: true,
    },
]

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const ExtremProduct = () => {
    return (
        <>
            <BreadCrumb item={ ExtremeBreadCrumb } />

            <AddButtonBottom>
                <CreateDrawer
                    title="Add Extreme Account"
                    isShowAddIcon={ true }
                >
                    <ExtremeForm />
                </CreateDrawer>
            </AddButtonBottom>
        </>
    )
};

ExtremProduct.layout = SuperAdmin;

export default ExtremProduct;