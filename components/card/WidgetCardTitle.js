import * as React from "react";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { Heading, CardView, Title } from "../../components";

const WidgetCardTitle = ({ title, label, icon, data, isLoading }) => {
  return (
    <CardView>
      <Grid container spacing={2} justify="right">
        <Grid item xs={10}>
          <Heading title={title} color="common.gray" />
          {isLoading ? (
            <Skeleton />
          ) : (            
            <div>
            <Grid container>
                <Grid item xs={8}> <Title title={"Submissions"} /></Grid>
                <Grid item xs={4}> <Title title={label} /></Grid>
            </Grid>
              {data?.map((item) => (
                <Grid container>
                    <Grid item xs={8}>  <Title title={item.label} /></Grid>
                    <Grid item xs={4}> <Title title={item.value} /></Grid>
                </Grid>
              ))}
            </div>
          )}
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "right" }}>
          {icon}
        </Grid>
      </Grid>
    </CardView>
  );
};

export default WidgetCardTitle;
