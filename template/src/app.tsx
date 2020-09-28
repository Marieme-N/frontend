import React from "react";
import ReactDOM from "react-dom";
import { TemplateView1 } from "./components/TemplateView1";
import { TemplateLayout } from "./components/TemplateLayout";
import { TemplateNavigation } from "./components/TemplateNavigation";
import { TemplateView2 } from "./components/TemplateView2";
import { TemplateMachineContext, TemplateMachineProvider, TemplateStates } from "./state/machine";

const TemplateContent = () => {
  const { machine } = React.useContext(TemplateMachineContext);
  let Content = <></>;
  if (machine.matches(TemplateStates.view1))
    Content = <TemplateView1 project="Arlaide" />;
  else if (machine.matches(TemplateStates.view2)) Content = <TemplateView2 />;

  return Content;
};

ReactDOM.render(
  <TemplateMachineProvider>
    <TemplateLayout>
      <TemplateNavigation />
      <TemplateContent />
    </TemplateLayout>
  </TemplateMachineProvider>,
  document.getElementById("app")
);
