import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { FormComponent } from '../../../components';
import { ReportsData } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/admin-report-form.json';

const ReportForm = ({ ReportsData, reportData, isLoading }) => {
    const router = useRouter();

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {};

    useEffect(() => {
        ReportsData();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {FormJson
                        ? FormJson.map((field, i) => (
                              <Grid md={5.8} style={{ marginLeft: '8px' }}>
                                  {isLoading ? (
                                      <Skeleton />
                                  ) : (
                                      <FormComponent
                                          key={i}
                                          field={field}
                                          control={control}
                                      />
                                  )}
                              </Grid>
                          ))
                        : null}
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    reportData: state?.detailsData?.reportData,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ReportsData: () => dispatch(ReportsData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
