export default { title: "Filthy Rich" };

import { filthy } from "./index";
import { doc, freeWrite } from "../fixtures/doc";

export const main = () => {
  const div = document.createElement("div");
  filthy(div, doc);

  return div;
};

export const free = () => {
  const div = document.createElement("div");
  filthy(div, freeWrite);

  return div;
};
