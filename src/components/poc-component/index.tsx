if (typeof window !== "undefined") import("@webcomponents/custom-elements");

import React, { FunctionComponent } from "react";
import * as ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import shadow from "react-shadow";

export type Props = {
  testNumber: number;
  testString: string;
};

export const PocComponent: React.FunctionComponent<Props> = ({
  testNumber,
  testString,
}) => (
  <>
    <h1>This is web component</h1>
    <h3>testNumber: {testNumber}</h3>
    <h3>testString: {testString}</h3>
  </>
);
PocComponent.displayName = "PocComponent";

export function registerPocComponentElement() {
  if (typeof window === "undefined") return;
  if (window.customElements.get("poc-component")) return;

  const WrappedComponent: FunctionComponent<Props> = (props) => (
    <shadow.span>
      <PocComponent {...props} />
    </shadow.span>
  );
  WrappedComponent.displayName = "WrappedComponent";
  WrappedComponent.propTypes = PocComponent.propTypes;

  const WebPocComponent = reactToWebComponent(
    WrappedComponent,
    React as never,
    ReactDOM as never,
    {
      props: {
        testNumber: Number,
        testString: String,
      },
    }
  );
  customElements.define("poc-component", WebPocComponent as never);
}
