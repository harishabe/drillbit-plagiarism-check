import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { FormComponent } from '../../../components';
import { ReportsData, ViewAndDownloadData } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/admin-report-form.json';

const ReportForm = ({
    ReportsData,
    ViewAndDownloadData,
    reportData,
    isLoading
}) => {
    const router = useRouter();
    const [formData, setFormData] = useState();

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let url = data?.report?.name + '?page=' + 0 + '&size=' + 25 + '&instructor=' + data?.instructor?.username + '&from=' + 1 + '&to=' + 2
        ViewAndDownloadData(url);
    };

    useEffect(() => {
        ReportsData();
    }, []);

    useEffect(() => {
        let reportType = [];
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'report') {
                reportData?.reportTypes?.map((item) => {
                    reportType.push({ 'name': item })
                });
                formItem['options'] = reportType;
            }
            if (formItem.name === 'instructor') {
                formItem['options'] = reportData?.instructorList;
            }
            return formItem;
        });
        setFormData(formList);
    }, [reportData])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formData?.map((field, i) => (
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
                    ))}
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    reportData: state?.adminReport?.reportData,
    isLoading: state?.adminReport?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ReportsData: () => dispatch(ReportsData()),
        ViewAndDownloadData: (url) => dispatch(ViewAndDownloadData(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
