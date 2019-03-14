import React from "react";
import { shallow } from "enzyme";

import Accordion from "./Accordion";

describe("Accordion", () => {
  it("should render without errors", () => {
    shallow(<Accordion title="test" text="lorum ipson" />);
  });
});
