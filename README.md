**Basic Usage**

```js
var Await = require("wait-until");

var variable = {
  "name": "Some random name"
}

setTimeout(() => {
  variable.name = "Some random name 2";
}, 3000);

(async () => {
  await Await(variable, (Variable) => Variable.name == "Some random name 2");

  //.... continue code after variable is matched
})();
//We needed to create async function to run await in it

//Your code here will wait 3 seconds until timeout will set variable.name to "Some random name 2" so your code will wait until the variable matches the function
```

**2nd Usage**

```js
var Await = require("wait-until");

var variable = {
  "name": "Some random name"
}

Await(variable, (Variable) => Variable.name == "Some random name 2", () => {
  variable.name = "Some random name";
})

//Now we added callback that meens it is not anymore Promise but it will use callback to call function
//Now everytime it will detect that "variable.name" is "Some random name 2" it will change it to "Some random name" and will continue awaiting
```

**Examples**

Discord.js music bot when checking if there is any non bot member in channel so it can pause music if there is not

```js
var Await = require("wait-until");
//We are using Promise so code can continue but when bot will detect that there is no user there it will activate itself then

new Promise(() => {
  await Await(serverQueue, (e) => e.voiceChannel.members.filter(m => !m.user.bot).size < 1);
  serverQueue.dispatcher.pause();
});
//This example runned only 1 time bot will pause dispatcher only one time when users left the channel
//Fix for this is bellow



//This is example of discord bot so we need to put this event into loop we can do that by adding callback into function
//There we don't need to use Promise becouse we are not invoking this as Promise (with "await" before calling function)

Await(serverQueue, (e) => e.voiceChannel.members.filter(m => !m.user.bot).size < 1&&!e.dispatcher.paused, () => {
  //This is callback so now we are finished
  serverQueue.dispatcher.pause();
})
//This Example will pause dispatcher everytime it detects no users in cahnnel and that dispatcher is not paused
```

2nd example is with our old good "variable.name" we will now detect if variable object was changed and if was continue code or run some function

```js
var Await = require("wait-until");

var variable = {
  "name": "Some random name"
}

(async () => {
  var oldVariable = variable;  //An copy of variable object
  await Await(variable, (Variable) => {
    if(Variable !== oldVariable) return true; 
    else {
      oldVariable == Variable;
      return false;
    }
  })
  //If object changed continue execution of code
})()

//We are again using async function so await can be called
```

```js
var Await = require("wait-until");

var variable = {
  "name": "Some random name"
}

var oldVariable = variable;  //An copy of variable object
Await(variable, (Variable) => {
  //Detecting if variable changed if did not asign Variable into oldVariable and return false
  if(Variable !== oldVariable) return true; 
  else {
    oldVariable == Variable;
    return false;
  }
}, () => {
  //Code here will be executed everytime when "variable" object changes
})
//If object "variable" changed continue execution of code

//We don't need to use async function again becouse we are not using await when calling Await function
```

**Test it now**

1st usage test
This test will after 3 seconds detect that variable has changed to "Some random name 2" and will print "Text matched" into console

```js
var Await = require("wait-until");

var variable = {
  "name": "Some random name"
}

setTimeout(() => {
  variable.name = "Some random name 2";
}, 3000);

(async () => {
  await Await(variable, (Variable) => Variable.name == "Some random name 2");
  console.log("Text matched")
})();
```

2nd usage test
This test will detect variable change every 3 seconds and will change it back everytime and print "Text matched" to console all this works in 3 seconds interval

```js
var Await = require("wait-until");

var variable = {
  "name": "Some random name"
}

setInterval(() => {
  variable.name = "Some random name 2";
}, 3000)

Await(variable, (Variable) => Variable.name == "Some random name 2", () => {
  variable.name = "Some random name";
  console.log("Text matched");
})
```