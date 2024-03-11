import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { FormComponent } from "../../../../components";
import { AddImageIcon } from "../../../../assets/icon";
import FormJson from "../../../../constant/form/ticket-create-form.json";
import { CreateTicket } from "../../../../redux/action/common/Support/TicketAction";
import { BASE_URL_SUPER } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  img: {
    textAlign: "center"
  }
}));

const TicketForm = ({ 
  CreateTicket,
  isLoading 
}) => {
  const [formJsonField, setFormJsonField] = useState(FormJson);
  const classes = useStyles();

  const { handleSubmit, control } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {

    let bodyFormData = new FormData();
    bodyFormData.append("IssueCategory", data.IssueCategory.name);
    bodyFormData.append("Priority", data.Priority.name);
    bodyFormData.append("Subject", data.Subject);
    bodyFormData.append("Description", data.Description);
    bodyFormData.append("ContactNumber", data.ContactNumber);
    bodyFormData.append("file", data.file ? data.file[0] : null);
   
    const url =BASE_URL_SUPER + END_POINTS.CREATE_TICKETING_SYSTEM;
    CreateTicket(url, bodyFormData);
  };
  
  return (
    <>
      <div  className={classes.img}>
        <AddImageIcon />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {formJsonField?.map((field, i) => (
            <Grid key={field?.name} item md={12}>
              <FormComponent
               key={i}
               field={field}
               control={control} 
               isLoading={isLoading}
               />
            </Grid>
          ))}
        </Grid>
      </form>
    </>
  );
};
const mapStateToProps = (state) => ({
  isLoading: state?.ticket?.isLoadingTicketProcess,
  
});
const mapDispatchToProps = (dispatch) => {
  return {
    CreateTicket: (url, data) => dispatch(CreateTicket(url, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketForm);
