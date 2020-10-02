import { assign } from "xstate";
import { TemplateContext } from "./machine";

export enum TemplateActions {
  updateCount = "updateCount",
}

// Like the example from the documentation:
// https://xstate.js.org/docs/guides/context.html#context
const assignNewCount = assign<TemplateContext, >({
  count: (context, event) => context.count + 1,
});

// Set all your actions there, and they will be added to your machine
export const allActions = {
  [TemplateActions.updateCount]: assignNewCount,
};
