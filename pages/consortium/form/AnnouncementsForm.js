import React, { useEffect, useState } from "react";
import { useForm, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';
import { FormComponent } from "../../../components";
import FormJson from '../../../constant/form/announcements-form.json';
import { BASE_URL } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";
import { AnnouncementsField } from "../../../redux/action/common/Announcements/AnnouncementsAction";
import { CreateClassIcon } from "../../../assets/icon";
import { FORM_VALIDATION } from "../../../constant/data/Constant";


const AnnouncementsForm = ({
  AnnouncementsField, isLoading
}) => {
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
  });

  const [formJsonField, setFormJsonField] = useState(FormJson);

  const titleLength = useWatch({
    control,
    name: 'title',
});

const contentLength = useWatch({
  control,
  name: 'content',
});

useEffect(() => {
  if (contentLength !== undefined) {
    if (  contentLength?.length > 2000) {
        let fields = FormJson?.map((item) => {
            if (item?.field_type === 'textarea' && item?.name === 'content') {
                item['errorMsg'] = FORM_VALIDATION.MAX_CONTENT_LENGTH;
            }
            if (item?.field_type === 'button') {
              item['isDisabledField'] = true;
          }  
            return item;          
        })
        setFormJsonField(fields);
    } else {
        let fields = FormJson?.map((item) => {
            if (item?.field_type === 'textarea' && item?.name === 'content') {
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
}, [contentLength])

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
    if (item.field_type === 'input' || item.field_type === 'textarea') {
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
        const url = BASE_URL + END_POINTS.CREATE_CONSORTIUM_ANNOUNCEMENTS;
        AnnouncementsField(url,data);      
    };
  
    return (
      <>
      <div style={{ textAlign: 'center' }}>
                { <CreateClassIcon /> }
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