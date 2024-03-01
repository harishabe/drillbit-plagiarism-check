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
} from "../../../../assets/icon";
import { GetClassesData } from "../../../../redux/action/instructor/InstructorAction";
import { PaginationValue } from "../../../../utils/PaginationUrl";

const AnnouncementsForm = ({
  AnnouncementsField,
  isLoading,
  dropdownClasses,
  GetClassesData
}) => {
  const paginationPayload = {
    ...PaginationValue,
    'field': 'class_id',
  }

  const { control, handleSubmit } = useForm({
    mode: "all",
  });

  const [formJsonField, setFormJsonField] = useState(FormJson);

  const onSubmit = (data) => {
    data.class_id = String(data.class_id.class_id);
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_INSTRUCTOR_ANNOUNCEMENTS;
    AnnouncementsField(url, data);
  };

  useEffect(()=> {
    GetClassesData(paginationPayload);
  } ,[])

  useEffect(() => {
    let classList = [];
    if (dropdownClasses !== undefined) {
      const classes = [...dropdownClasses]
        let formList = FormJson?.map((formItem) => {
            if (formItem.name === 'class_id') { 
              classes?.unshift({ 'name':'all', 'class_name': 'all', 'class_id': 'all'});
              classes?.map((item) => {
                    classList.push({ 'name': item.class_name, 'class_id': item.class_id}); 
                });
                formItem['options'] = classList;
            }
            return formItem;
        });
        setFormJsonField(formList);

    }
}, [dropdownClasses]);


  return (
    <>
      <div style={{ textAlign: "center" }}>
        { <CreateClassIcon />}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formJsonField?.map((field, i) => (
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
  dropdownClasses: state?.instructorClasses?.classesData?._embedded?.classDTOList,
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
