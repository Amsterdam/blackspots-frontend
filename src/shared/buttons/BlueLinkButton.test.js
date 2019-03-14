import React from "react";
import { shallow } from "enzyme";

import BlueLinkButton from "./BlueLinkButton";

describe("BlueLinkButton", () => {
  it("should render without errors", () => {
    shallow(<BlueLinkButton text="test" />);
  });
});
