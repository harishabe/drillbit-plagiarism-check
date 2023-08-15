import * as React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Heading, CardView, SubHeading } from '../../components';
import { Tooltip } from '@mui/material';
import { StyledButtonIcon } from './../../style/index';

const WidgetCard = ({
    title,
    icon,
    count,
    handleDownload,
    isLoading,
    isLoadingIcon,
    isClickAble,
    toolTipTxt
}) => {
    return (
        <CardView>
            <Grid container spacing={2} justify="right">
                <Grid item xs={8}>
                    <Heading title={title} color="common.gray" />
                    {isLoading ? <Skeleton /> : <SubHeading title={count} />}

                </Grid>
                <Grid item xs={4} style={{ textAlign: 'right' }}>
                    {
                        isClickAble ?
                            (isLoadingIcon ?
                                <Skeleton /> :
                                <Tooltip title={toolTipTxt} arrow>
                                    <StyledButtonIcon variant="outlined" size='small' onClick={ (e) => handleDownload(e, title) }>
                                        { icon }
                                    </StyledButtonIcon>
                                </Tooltip>
                            )
                            : icon
                    }
                </Grid>
            </Grid>
        </CardView>
    );
};

export default WidgetCard;