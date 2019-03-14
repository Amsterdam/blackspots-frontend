import React from "react";
import { shallow } from "enzyme";

import ConceptPage from "./ConceptPage";

describe("ConceptPage", () => {
  it("should render without errors", () => {
    shallow(<ConceptPage />);
  });
});
