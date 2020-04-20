export default { title: "Filthy Rich" };

import { filthy } from "./index";
import { doc } from "../fixtures/doc";

export const main = () => {
  const div = document.createElement("div");
  filthy(div, doc);

  return div;
};
