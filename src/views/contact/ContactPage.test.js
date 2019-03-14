import React from "react";
import { shallow } from "enzyme";

import ContactPage from "./ContactPage";

describe("ContentPage", () => {
  it("should render without errors", () => {
    shallow(<ContactPage />);
  });
});
