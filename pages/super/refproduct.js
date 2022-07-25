import React from 'react';
import SuperAdmin from './../../layouts/SuperAdmin'
import styled from 'styled-components';
import {
    BreadCrumb,
    CreateDrawer,
} from './../../components'
import RefForm from './form/RefForm'

const RefeBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Ref',
        link: '',
        active: true,
    },
]

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const RefProduct = () => {
    return (
        <>
            <BreadCrumb item={ RefeBreadCrumb } />

            <AddButtonBottom>
                <CreateDrawer
                    title="Add Ref Account"
                    isShowAddIcon={ true }
                >
                    <RefForm />
                </CreateDrawer>
            </AddButtonBottom>
        </>
    )
};

RefProduct.layout = SuperAdmin

export default RefProduct