"use strict";

module.exports = {
  name: require("./package").name,

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import("node_modules/popper.js/dist/umd/popper.js", {
      using: [
        {
          transformation: "amd",
          as: "popper.js"
        }
      ]
    });
    app.import("node_modules/tooltip.js/dist/umd/tooltip.js", {
      using: [
        {
          transformation: "amd",
          as: "tooltip.js"
        }
      ]
    });
  }
};
