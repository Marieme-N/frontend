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
      minHeight: theme.spacing(15)
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
        <Paper color='primary' className={classes.paper}>
          <Typography>EPITA</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Typography>SIGL - 2021</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
