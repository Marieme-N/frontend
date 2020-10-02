import {
  createStyles,
  makeStyles,
  Paper,
  PaperProps,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      minHeight: theme.spacing(15),
    },
    dark: {
      color: theme.palette.primary.main
    },
    bright: {
      color: theme.palette.text.primary
    }
  })
);

export const TemplatePaper: React.FC<PaperProps> = ({
  children,
  className,
  ...paperProps
}) => {
  const classes = useStyles();
  const [paperColor, togglePaperColor] = React.useState<'bright' | 'dark'>('bright');

  return (
    <Paper onClick={() => {
      togglePaperColor(paperColor === 'bright' ? 'dark' : 'bright');
    }} className={`${classes.paper} ${paperColor} ${className}`} {...paperProps}>
      {children}
    </Paper>
  );
};
