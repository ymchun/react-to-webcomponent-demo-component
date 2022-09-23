if (typeof window !== "undefined") import("@webcomponents/custom-elements");

import React, { Fragment, FunctionComponent } from "react";
import * as ReactDOM from "react-dom/client";
import * as PropTypes from "prop-types";
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
  <Fragment>
    <h1>This is web component</h1>
    <h3>testNumber: {testNumber}</h3>
    <h3>testString: {testString}</h3>
  </Fragment>
);
PocComponent.displayName = "PocComponent";
PocComponent.propTypes = {
  testNumber: PropTypes.number.isRequired,
  testString: PropTypes.string.isRequired,
};

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
  window.customElements.define("poc-component", WebPocComponent as never);
}
