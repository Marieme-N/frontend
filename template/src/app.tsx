import React from "react";
import ReactDOM from "react-dom";
import { TemplateView1 } from "./components/TemplateView1";
import { TemplateLayout } from "./components/TemplateLayout";
import { TemplateNavigation } from "./components/TemplateNavigation";
import { TemplateView2 } from "./components/TemplateView2";


ReactDOM.render(
  <TemplateLayout>
    <TemplateNavigation />
    <TemplateView1 project="ARLAIDE" />
    <TemplateView2 />
  </TemplateLayout>,
  document.getElementById("app")
);
