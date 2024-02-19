import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { FormComponent } from "../../../../components";
import FormJson from "../../../../constant/form/announcements-instructor-form.json";
import { BASE_URL_EXTREM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { AnnouncementsField } from "../../../../redux/action/common/Announcements/AnnouncementsAction";
import {
  CreateClassIcon,
  EditClassAndStudentIcon,
} from "../../../../assets/icon";
import { GetClassesData } from "../../../../redux/action/instructor/InstructorAction";
import { PaginationValue } from "../../../../utils/PaginationUrl";

const AnnouncementsForm = ({
  AnnouncementsField,
  isLoading,
  classesData,
  GetClassesData
}) => {
  const { control, handleSubmit, editData } = useForm();
  const [formData, setFormData] = useState();
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    'field': 'class_id',
  });

  const onSubmit = (data) => {
    data.class_id = data.class_id.class_id;
    console.log('first', data)
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_INSTRUCTOR_ANNOUNCEMENTS;
    AnnouncementsField(url, data);
  };

  useEffect(()=> {
    GetClassesData(paginationPayload);
  } ,[paginationPayload])

  useEffect(() => {
    console.log('classesData', classesData)
    let classList = [];
    if (classesData !== undefined) {
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'class_id') { 
              classesData?.unshift({ 'name':'all', 'class_name': 'all', 'class_id': 'all'});
                classesData?.map((item) => {
                    classList.push({ 'name': item.class_name, 'class_id': item.class_id}); 
                });
                formItem['options'] = classList;
            }
            return formItem;
        });
        setFormData(formList);
        console.log('classList', classList)
        console.log('formData', formData)

    }
}, [classesData]);


  return (
    <>
      <div style={{ textAlign: "center" }}>
        {editData ? <EditClassAndStudentIcon /> : <CreateClassIcon />}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formData?.map((field, i) => (
          <FormComponent 
          key={i} 
          field={field} 
          control={control}
          isLoading={isLoading}
          />
        ))}
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({
  classesData: state?.instructorClasses?.classesData?._embedded?.classDTOList,
  isLoading: state?.announcements?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    AnnouncementsField: (url, data) => dispatch(AnnouncementsField(url, data)),
    GetClassesData: (PaginationValue) =>
      dispatch(GetClassesData(PaginationValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsForm);
