import React from "react";
import ReactDOM from "react-dom";
import { TemplateContent } from "./components/TemplateContent";
import { TemplateLayout } from "./components/TemplateLayout";

ReactDOM.render(
  <TemplateLayout>
    <TemplateContent project="ARLAIDE" />
  </TemplateLayout>,
  document.getElementById("app")
);
