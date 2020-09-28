import { Button, Card, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { TemplateMachineContext } from "../state/machine";

export const TemplateView2: React.FC = () => {
  const [count, setCount] = React.useState(0);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Paper>
          <Typography>Content of View 2: Local count is {count}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Button onClick={() => setCount(count + 1)}>
          Change my local state
        </Button>
      </Grid>
    </Grid>
  );
};
