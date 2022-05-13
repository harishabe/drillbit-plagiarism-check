import React from 'react'
import Typography from '@mui/material/Typography'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from 'next/link'
import { ArrowNextIcon } from '../../assets/icon'


const BreadCrumb = ({
    item
}) => {
    return (
        
        <div role="presentation">
            <Breadcrumbs separator={<ArrowNextIcon />} aria-label="breadcrumb" style={{marginBottom:'15px'}}>
                {item.map((menuItem, index) => (
                    <div key={index}>
                        {menuItem.active === false ?
                            <Link underline="hover" style={{color:'#777E89'}} color="inherit"  href={menuItem.link}>
                                {menuItem.name}
                            </Link> :
                            <Typography style={{color:'#282828'}}>{menuItem.name}</Typography>}
                    </div>
                ))}
            </Breadcrumbs>
        </div>
    )
}

export default BreadCrumb
