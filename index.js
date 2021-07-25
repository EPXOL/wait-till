module.exports = (Variable, Function, Callback) => {
  if(Callback) {
    var interval = setInterval(() => {
      if(Function(Variable)) {
        Callback();
      }
    })
    return {
      "end": () => {
        clearInterval(interval);
      }
    }
  } else {
    return new Promise((resolve, reject) => {
      var interval = setInterval(() => {
        if(Function(Variable)) {
          clearInterval(interval);
          resolve(true);
        }
      })
    })
  }
}
