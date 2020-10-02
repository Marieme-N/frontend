import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { TemplateEvents} from "../state/machine";
import { TemplateMachineContext } from "../state/provider";
import { TemplatePaper } from "./TemplatePaper";


export const TemplateView2: React.FC = () => {
  
  const {machine, send} = React.useContext(TemplateMachineContext);
  const {count} = machine.context;

  return (
    <Grid container>
      <Grid item xs={6}>
        <TemplatePaper>
          <Typography>Content of the view 2</Typography>
        </TemplatePaper>
      </Grid>
      <Grid item xs={6}>
        <Button variant='contained' color='primary' onClick={() => {
          send({type: TemplateEvents.udpateCount, newCount: count + 1})
        }}>
          Update global counter
        </Button>
      </Grid>
    </Grid>
  );
};
