import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import propTypes from "prop-types";
import { Grid, InputLabel, TextField, Button, Divider } from "@mui/material";
import { EllipsisText } from "../../components";
import {
  UPLOAD_FILE_AUTHOR_NAME,
  UPLOAD_FILE_AUTHOR_TITLE,
  UPLOAD_FILE_TYPE,
  UPLOAD_FILE_LANGUAGE,
  TARGET_UPLOAD_FILE_LANGUAGE,
} from "../../constant/data/ErrorMessage";
import { getItemSessionStorage } from "../../utils/RegExp";
import InputAutoComplete from "../form/elements/InputAutoComplete";
import { DOCUMENT_TYPE_LANG } from "../../constant/data/Constant";

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

export const EmailValidationError = styled.div`
  color: #ff0000;
  font-weight: 400;
`;

const useStyles = makeStyles(() => ({
  helperText: {
    marginLeft: 0,
  },
}));

const FileForm = ({
  files,
  handleSubmitFile,
  btnTitle,
  isLoading,
  langType,
  isRegionalFile,
  isCrossLangDropdown,
  isStudent,
  assName,
}) => {
  const classes = useStyles();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("datadatadatadata123", data);
    let reqPayload = {};
    Object.entries(data).map((key) => {
      if (typeof key[1] === "object") {
        reqPayload[key[0]] = key[1].name;
      } else {
        reqPayload[key[0]] = key[1];
      }
    });
    console.log("reqPayload", reqPayload);
    handleSubmitFile(reqPayload);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {files &&
          files?.map((item, index) => {
            return (
              <>
                <Grid container spacing={1} key={item[1]?.name || item.name}>
                  <Grid
                    item
                    md={
                      langType === "Non English" || isRegionalFile
                        ? isCrossLangDropdown
                          ? 2
                          : 2.4
                        : 3
                    }
                    xs={12}
                  >
                    <div style={{ marginTop: "25px" }}>
                      <EllipsisText value={item[1]?.name || item.name} />
                    </div>
                  </Grid>
                  <Grid
                    item
                    md={
                      langType === "Non English" || isRegionalFile
                        ? isCrossLangDropdown
                          ? 2
                          : 2.4
                        : 3
                    }
                    xs={12}
                  >
                    <LabelContainer>
                      <InputLabel>Author Name *</InputLabel>
                    </LabelContainer>
                    {isStudent ? (
                      <TextField
                        sx={{ marginTop: "0px" }}
                        fullWidth
                        margin="normal"
                        name={"authorName" + index}
                        type="text"
                        variant="outlined"
                        size="small"
                        disabled
                        label={getItemSessionStorage("name")}
                        inputProps={{
                          minLength: 3,
                        }}
                      />
                    ) : (
                      <TextField
                        sx={{ marginTop: "0px" }}
                        fullWidth
                        margin="normal"
                        name={"authorName" + item[0]}
                        type="text"
                        variant="outlined"
                        size="small"
                        {...register("authorName" + item[0], {
                          required: true,
                        })}
                        error={errors["authorName" + item[0]]}
                        helperText={
                          errors["authorName" + item[0]] &&
                          UPLOAD_FILE_AUTHOR_NAME
                        }
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        inputProps={{
                          minLength: 3,
                        }}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    md={
                      langType === "Non English" || isRegionalFile
                        ? isCrossLangDropdown
                          ? 2
                          : 2.4
                        : 3
                    }
                    xs={12}
                  >
                    <LabelContainer>
                      <InputLabel>Title *</InputLabel>
                    </LabelContainer>

                    {isStudent ? (
                      <TextField
                        sx={{ marginTop: "0px" }}
                        fullWidth
                        margin="normal"
                        name={"title" + index}
                        type="text"
                        variant="outlined"
                        size="small"
                        disabled
                        label={assName}
                        inputProps={{
                          minLength: 3,
                        }}
                      />
                    ) : (
                      <TextField
                        sx={{ marginTop: "0px" }}
                        fullWidth
                        margin="normal"
                        name={"title" + item[0]}
                        type="text"
                        variant="outlined"
                        size="small"
                        {...register("title" + item[0], { required: true })}
                        helperText={
                          errors["title" + item[0]] && UPLOAD_FILE_AUTHOR_TITLE
                        }
                        error={errors["title" + item[0]]}
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                        inputProps={{
                          minLength: 3,
                        }}
                      />
                    )}
                  </Grid>

                  {!isStudent && (
                    <Grid
                      item
                      md={
                        langType === "Non English" || isRegionalFile
                          ? isCrossLangDropdown
                            ? 2
                            : 2.4
                          : 3
                      }
                      xs={12}
                    >
                      <InputAutoComplete
                        control={control}
                        field={{
                          field_type: "dropdown",
                          style: { marginTop: "0px" },
                          id: "documentType" + item[0],
                          label: "Document Type *",
                          name: "documentType" + item[0],
                          required: UPLOAD_FILE_TYPE,
                          validationMsg: UPLOAD_FILE_TYPE,
                          size: "small",
                          options:
                            DOCUMENT_TYPE_LANG !== undefined &&
                            DOCUMENT_TYPE_LANG?.document_type?.map((item) => ({
                              name: item,
                            })),
                        }}
                      />
                    </Grid>
                  )}

                  {langType === "Non English" && (
                    <Grid item md={2.4} xs={12}>
                      <InputAutoComplete
                        control={control}
                        field={{
                          field_type: "dropdown",
                          style: { marginTop: "0px" },
                          id: "Language" + item[0],
                          label: "Select Language *",
                          name: "nonEnglishLang" + item[0],
                          required: UPLOAD_FILE_LANGUAGE,
                          validationMsg: UPLOAD_FILE_LANGUAGE,
                          size: "small",
                          options:
                            DOCUMENT_TYPE_LANG !== undefined &&
                            DOCUMENT_TYPE_LANG?.non_english_languages?.map(
                              (item) => ({ name: item })
                            ),
                        }}
                      />
                    </Grid>
                  )}

                  {isRegionalFile && (
                    <Grid item md={isCrossLangDropdown ? 2 : 2.4} xs={12}>
                      <InputAutoComplete
                        control={control}
                        field={{
                          field_type: "dropdown",
                          style: { marginTop: "0px" },
                          id: "Language" + item[0],
                          label: "Select Language *",
                          name: "regionalLanguage",
                          required: UPLOAD_FILE_LANGUAGE,
                          validationMsg: UPLOAD_FILE_LANGUAGE,
                          size: "small",
                          options:
                            DOCUMENT_TYPE_LANG !== undefined &&
                            DOCUMENT_TYPE_LANG?.regional_languages?.map(
                              (item) => ({
                                name: item,
                              })
                            ),
                        }}
                      />
                    </Grid>
                  )}
                  {isCrossLangDropdown && (
                    <Grid item md={2} xs={12}>
                      <InputAutoComplete
                        control={control}
                        field={{
                          field_type: "dropdown",
                          style: { marginTop: "0px" },
                          id: "Language",
                          label: "Target Language *",
                          name: "destinationLanguage",
                          required: TARGET_UPLOAD_FILE_LANGUAGE,
                          validationMsg: TARGET_UPLOAD_FILE_LANGUAGE,
                          size: "small",
                          options:
                            DOCUMENT_TYPE_LANG !== undefined &&
                            DOCUMENT_TYPE_LANG?.cross_language?.map((item) => ({
                              name: item,
                            })),
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid container spacing={1}>
                  <Grid
                    item
                    md={
                      langType === "Non English" || isRegionalFile
                        ? isCrossLangDropdown
                          ? 2
                          : 2.4
                        : 3
                    }
                    xs={12}
                  ></Grid>
                  <Grid item md={3} xs={12}>
                    <LabelContainer>
                      <InputLabel>Guide Email</InputLabel>
                    </LabelContainer>
                    <TextField
                      sx={{ marginTop: "0px" }}
                      fullWidth
                      margin="normal"
                      name={"guide_email" + index}
                      type="email"
                      {...register("guide_email" + item[0], {
                        required: false,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i,
                          message: "Invalid email address",
                        },
                        validate: (value) => {
                          if (value && value.length > 250) {
                            return "Maximum length exceeded";
                          }
                          return true;
                        },
                      })}
                      helperText={
                        errors["guide_email" + item[0]]
                          ? errors["guide_email" + item[0]].message
                          : ""
                      }
                      error={Boolean(errors["guide_email" + item[0]])}
                      variant="outlined"
                      size="small"
                      inputProps={{
                        maxLength: 250,
                      }}
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <LabelContainer>
                      <InputLabel>Guide Name</InputLabel>
                    </LabelContainer>
                    <TextField
                      sx={{ marginTop: "0px" }}
                      fullWidth
                      margin="normal"
                      name={"guide_name" + index}
                      type="text"
                      {...register("guide_name" + item[0], {
                        required: false,
                        validate: (value) => {
                          if (value && value.length > 500) {
                            return "Maximum length exceeded";
                          }
                          return true;
                        },
                      })}
                      helperText={
                        errors["guide_name" + item[0]]
                          ? errors["guide_name" + item[0]].message
                          : ""
                      }
                      error={Boolean(errors["guide_name" + item[0]])}
                      variant="outlined"
                      size="small"
                      inputProps={{
                        maxLength: 500,
                      }}
                    />
                  </Grid>
                </Grid>
                {files.length > 1 && <Divider />}
              </>
            );
          })}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            color="primary"
            disabled={isLoading}
            type="submit"
            variant="contained"
            size="large"
          >
            {isLoading ? <BeatLoader color="#fff" /> : btnTitle}
          </Button>
        </div>
      </form>
    </div>
  );
};

FileForm.propTypes = {
  fileData: propTypes.object,
  btnTitle: propTypes.string,
  handleSubmitFile: propTypes.func,
  isLoading: propTypes.bool,
};

export default FileForm;
