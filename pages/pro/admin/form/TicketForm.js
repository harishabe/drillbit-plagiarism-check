import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { FormComponent } from "../../../../components";
import { AddImageIcon } from "../../../../assets/icon";
import FormJson from "../../../../constant/form/ticket-create-form.json";
import { CreateTicket } from "../../../../redux/action/common/Support/TicketAction";
const TicketForm = ({ 
  CreateTicket 
}) => {
  const [formJsonField, setFormJsonField] = useState(FormJson);

  const { handleSubmit, control } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    let bodyFormData = new FormData();
    bodyFormData.append("issueType", data.issueType.name);
    bodyFormData.append("issueCategory", data.issueCategory.name);
    bodyFormData.append("priority", data.priority.name);
    bodyFormData.append("status", data.status.name);
    bodyFormData.append("description", data.description);
    bodyFormData.append("contactNumber", data.contactNumber);
    bodyFormData.append("attachments", data.file ? data.file[0] : null);
    CreateTicket(bodyFormData);
  };
  return (
    <>
      <div style={{ textAlign: "center" }}>
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
               />
            </Grid>
          ))}
        </Grid>
      </form>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    CreateTicket: (data) => dispatch(CreateTicket(data)),
  };
};

export default connect(null, mapDispatchToProps)(TicketForm);
