import { Plugin } from "prosemirror-state";
import ReactDOM from "react-dom";
import * as React from "react";

import crel from "crelt";
import { Menu } from "./menu/menu";

// wraps editor in a new div
export const myMenu = new Plugin({
  view(editorView) {
    const wrapper = crel("div", { class: "filthy-wrapper" });
    const menu = crel("div", { class: "filthy-menu" });

    editorView.dom.parentNode.replaceChild(wrapper, editorView.dom);
    wrapper.appendChild(menu);
    wrapper.appendChild(editorView.dom);

    ReactDOM.render(React.createElement(Menu), menu);

    return {
      update(view, prevState) {
        ReactDOM.render(React.createElement(Menu, { view, prevState }), menu);
      },
      destroy() {}
    };
  }
});
