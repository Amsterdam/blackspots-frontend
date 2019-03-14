import React from "react";
import { shallow } from "enzyme";

import Typography from "./Typography";

describe("Typography", () => {
  it("should render without errors", () => {
    shallow(<Typography />);
  });
});
