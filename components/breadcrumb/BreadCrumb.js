import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import { ArrowNextIcon } from '../../assets/icon';

const BreadCrumb = ({
    item
}) => {
    return (
        <div role="presentation">
            <Breadcrumbs separator={<ArrowNextIcon />} aria-label="breadcrumb" mb="15px">
                {item.map((menuItem, index) => (
                    <div key={index}>
                        {menuItem.active === false ?
                            <Link underline="hover" color="#777E89" href={menuItem.link}>
                                {menuItem.name}
                            </Link> :
                            <Typography sx={{color:'#282828',fontWeight:'600'}}>{menuItem.name}</Typography>}
                    </div>
                ))}
            </Breadcrumbs>
        </div>
    );
};

export default BreadCrumb;
