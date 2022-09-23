import React from "react";

import { defineCustomElement } from "~/components/custom-element";

export type Props = {
  testNumber: number;
  testString: string;
};

export const PocComponent: React.FunctionComponent<Props> = ({ testNumber, testString }) => (
  <h1>{`testString:${testString} testNumber:${testNumber}`}</h1>
);

PocComponent.displayName = "PocComponent";

export function registerPocComponentElement() {
  defineCustomElement(PocComponent, {
    testNumber: Number,
    testString: String,
  });
}
