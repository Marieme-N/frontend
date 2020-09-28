import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
  })
);

export const TemplateLayout: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            Frontend Workshop
            <Typography variant="subtitle1">EPITA SIGL 2021</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}>
            {children}
        </Grid>
      </Grid>
    </div>
  );
};
