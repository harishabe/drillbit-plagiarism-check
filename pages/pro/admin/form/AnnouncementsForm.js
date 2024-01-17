import React from "react";
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { FormComponent } from "../../../../components";
import FormJson from '../../../../constant/form/announcements-form.json';
import { CreateClassIcon, EditClassAndStudentIcon } from "../../../../assets/icon";
import { BASE_URL_PRO } from "../../../../utils/BaseUrl";
import END_POINTS_PRO from "../../../../utils/EndPointPro";
import { AnnouncementsField } from "../../../../redux/action/common/Announcements/AnnouncementsAction";


const AnnouncementsForm = ({  AnnouncementsField, isLoading
}) => {
    const { control, handleSubmit, editData } = useForm();

    const onSubmit = (data) => {
        const url = BASE_URL_PRO + END_POINTS_PRO.CREATE_ANNOUNCEMENTS;
        AnnouncementsField(url,data);      
      };
  
    return (
      <>
      <div style={{ textAlign: 'center' }}>
                { editData ? <EditClassAndStudentIcon /> : <CreateClassIcon /> }
            </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {FormJson
            ? FormJson.map((field, i) => (
                <FormComponent
                  key={i}
                  field={field}
                  control={control}
                  isLoading={isLoading}                
                />
              ))
            : null}
        </form>
        </>
      );
    };
    const mapStateToProps = (state) => ({
      isLoading: state?.announcements?.isLoading,
  });
  
  const mapDispatchToProps = (dispatch) => {
      return {
        AnnouncementsField: (url,data) => dispatch(AnnouncementsField(url,data)),
      };
  };


export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsForm);