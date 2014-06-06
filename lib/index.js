var protoclass = require("protoclass");

function RegisteredClasses (application) {
  this._classes = {};
  this.application = application;
}

module.exports = protoclass(RegisteredClasses, {
  register: function (nameOrClasses, clazz) {

    if (typeof nameOrClasses === "object") {
      for (var name in nameOrClasses) {
        this.register(name, nameOrClasses[name]);
      }
      return;
    }

    this._classes[nameOrClasses.substr(0, 1).toLowerCase() + nameOrClasses.substr(1)] = clazz;
  },
  create: function (name, options) {
    var clazz = this._classes[name];
    if (!clazz) throw new Error("class '" + name + "' doesn't exist");
    return new clazz(options == null ? {} : options, this.application);
  }
});