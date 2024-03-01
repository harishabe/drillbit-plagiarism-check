import React, { useEffect, useState } from "react";
import { useForm, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import { FormComponent } from "../../../../components";
import FormJson from '../../../../constant/form/announcements-admin-form.json';
import { BASE_URL_EXTREM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { AnnouncementsField } from "../../../../redux/action/common/Announcements/AnnouncementsAction";
import { CreateClassIcon, EditClassAndStudentIcon } from "../../../../assets/icon";
import { FORM_VALIDATION } from "../../../../constant/data/Constant";


const AnnouncementsForm = ({
  AnnouncementsField, isLoading}
) => {
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
  });

  const [formJsonField, setFormJsonField] = useState(FormJson);

  const titleLength = useWatch({
    control,
    name: 'title',
});

useEffect(() => {
  if (titleLength !== undefined) {
    if ( titleLength?.length > 100) {
        let fields = FormJson?.map((item) => {
            if (item?.field_type === 'input' && item?.name === 'title') {
                item['errorMsg'] = FORM_VALIDATION.MAX_TITLE_LENGTH;
            } 
            if (item?.field_type === 'button') {
              item['isDisabledField'] = true;
          }   
            return item;          
        })
        setFormJsonField(fields);
    } else {
        let fields = FormJson?.map((item) => {
            if (item?.field_type === 'input' && item?.name === 'title') {
                item['errorMsg'] = '';
            }
            if (item?.field_type === 'button') {
              item['isDisabledField'] = false;
          }            
            return item;
        })
        setFormJsonField(fields);
    }
}
}, [titleLength])

useEffect(() => {
  let formField = formJsonField?.map((item) => {
      if (item?.field_type === 'button') {
          item['isDisabled'] = item?.isDisabledField;
      }
      return item;
  });
  setFormJsonField(formField);
}, [formJsonField]);

useEffect(() => {
  return () => {
    reset();
    resetFormFields();
  };
}, [reset]);

const resetFormFields = () => {
  const resetFields = FormJson.map((item) => {
    if (item.field_type === 'input' ) {
      item.errorMsg = '';
    }
    if (item.field_type === 'button') {
      item.isDisabledField = false;
    }
    return item;
  });
  setFormJsonField(resetFields);
};

    const onSubmit = (data) => {
      const objData = {
        title: data.title,
        content: data.content,
        instructors: data.role.instructor?.toString(),
        students: data.role.student?.toString(),
      };    
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_EXTREME_ANNOUNCEMENTS_ADMIN;
    AnnouncementsField(url,objData);
    };
  
    return (
      <>
      <div style={{ textAlign: 'center' }}>
                {  <CreateClassIcon /> }
            </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formJsonField
            ? formJsonField.map((field, i) => (
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
