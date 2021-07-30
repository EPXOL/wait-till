module.exports = (Variable, Function, Callback) => {
  if(Callback) {
    var oldVariable = Variable;
    var interval = setInterval(() => {
      var variable = null;
      if(typeof Variable === "function") variable = Variable();
      else variable = Variable;
      if(Function(variable, oldVariable)) {
        Callback(variable, oldVariable);
      }
      if(typeof Variable === "function") oldVariable = Variable();
      else oldVariable = Variable;
    })
    return {
      "end": () => {
        clearInterval(interval);
      }
    }
  } else {
    return new Promise((resolve, reject) => {
      var oldVariable = Variable;
      var interval = setInterval(() => {
        var variable = null;
        if(typeof Variable === "function") variable = Variable();
        else variable = Variable;
        if(Function(variable, oldVariable)) {
          clearInterval(interval);
          resolve(variable, oldVariable);
        }
        if(typeof Variable === "function") oldVariable = Variable();
        else oldVariable = Variable;
      })
    })
  }
}
