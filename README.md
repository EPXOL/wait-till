**Basic Usage**

**1st Usage**
```js
var Await = require("wait-till");

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
var Await = require("wait-till");

var variable = {
  "name": "Some random name"
}

var randomNameAwait = Await(variable, (Variable) => Variable.name == "Some random name 2", () => {
  variable.name = "Some random name";
})

//Now we added callback that meens it is not anymore Promise but it will use callback to call function
//Now everytime it will detect that "variable.name" is "Some random name 2" it will change it to "Some random name" and will continue awaiting

//If you would want to end this you can use
randomNameAwait.end();
```

**3rd Usage**
```js
var Await = require("wait-till");

var variable = {

}

Await(variable, (Variable, OldVariable) => Variable !== OldVariable, (now, old) => {
  //Do things
})
//Now this will await until variable object will cahnge in any way  [<variable> (Variable state now), <oldVariable> (Variable state on last check)]
//It returns 2 arguments Variable in state now, and Variable in old State (This args are returned in all Await usages we just don't use it)
//So you can use this Old state of variable in 1st usage too
```

**4th usage**
```js
var Await = require("wait-till");

var variable = {
  "name": "Some random name"
}

Await(() => variable.name), (Variable) => Variable == "Some random name 2", () => {
  variable.name = "Some random name";
})
//When 1st argument is declared as function it will evacuate that function first and then use it's returned value as Variable
//Function is evacuated everytime it makes check
```

**Examples**

Discord.js music bot when checking if there is any non bot member in channel so it can pause music if there is not

```js
var Await = require("wait-till");
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

2nd example is the same as 1st but we will resume music when noone was in channel and someone joined
```js
Await(serverQueue, (currentQueueState, oldQueueState) => currentQueueState.voiceChannel.members.filter(m => !m.user.bot).size > 0&&oldQueueState.members.filter(m => !m.user.bot).size < 1&&e.dispatcher.paused, () => {
  //This is callback so now we are finished
  serverQueue.dispatcher.resume();
})
//This will wait until someone joins channel (CurrentQueueState voiceChannel users count is > than 0 and OldQueueSate voiceChannel users count is < than 1)
//And dispatcher is paused
```

3rd example is with our old good "variable.name" we will now detect if variable object was changed and if was continue code or run some function

```js
var Await = require("wait-till");

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
var Await = require("wait-till");

var variable = {
  "name": "Some random name"
}

Await(variable, (Variable, OldVariable) => Variable !== OldVariable, () => {
  //Code here will be executed everytime when "variable" object changes
})
//If object "variable" changed continue execution of code

//We don't need to use async function again becouse we are not using await when calling Await function
//More explained in 3rd Usage
```

**Test it now**

1st usage test
This test will after 3 seconds detect that variable has changed to "Some random name 2" and will print "Text matched" into console

```js
var Await = require("wait-till");

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
var Await = require("wait-till");

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