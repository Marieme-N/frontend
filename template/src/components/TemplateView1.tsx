import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";

type TemplateContentProps = {
  project: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export const TemplateView1: React.FC<TemplateContentProps> = ({
  project,
}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Typography>{project}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Typography>View 1</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Typography>View 2</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
