//Export function
module.exports = (Variable, Function, Callback) => {
  //If callback is present make looping checks
  if(Callback) {
    var interval = setInterval(() => {
      //Match variable in function
      if(Function(Variable)) {
        //Run callback
        Callback();
      }
    })
  } //when Callback is not presend create one time match check that returns true
  else {
    //Create Promise
    return new Promise((resolve, reject) => {
      //Create Interval to match the variable
      var interval = setInterval(() => {
        //Match variable in function
        if(Function(Variable)) {
          //Clear Interval so it will stop checking and resolve "true"
          clearInterval(interval);
          resolve(true);
        }
      })
    })
  }
}