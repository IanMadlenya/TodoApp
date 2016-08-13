# Weave TodoMVC Example

> An application architecture for React utilizing Weave as a flux like architecture.

Example TodoMVC App

### Learning Weave

The weave-core architecture was created as a support for the Weave visualization system. You can learn more about Weave here.

### Overview

weave-core has three major concepts: Linkable Objects, Callback Collection and the Session Manager.

#### Linkable Objects

The basic Linkable Objects are Linkable Variables that are wrappers around javascript primitives.

LinkableString a wrapper around the string primitive which limits its state to a string.
Example:
``` 
var message = new weavejs.core.LinkableString("hello"); // optional constructor parameter for initial value.
message.value = "hello world"; // sets the internal state of message to 'hello world'
console.log(message.value); // prints 'hello world';
```

LinkableNumber a wrapper around the string primitive which limits its state to a number see Linkable String above.
LinkableBoolean a wrapper around the string primitive which limits its state to a boolean see Linkable String above

LinkableHashMap a LinkableHashMap can be assimilate to a wrapper around a javascript object, it allows for a key value pair storage of other Linkable Objects.
Example:
``` 
var person = new weavejs.core.LinkableHashMap();
person.requestObject("name", weavejs.core.LinkableString); // adds 'name' as key to the hashmap, and sets the value to a new LinkableString.
person.requestObject("age", weavejs.core.LinkableNumber); // adds 'age' as key to the hashmap, and sets the value to a new LinkableNumber.

var name = person.getObject("name"); // returns the name
name.value = "Franck";
var age = person.getObject("name"); // returns the name
age.value = 25;
console.log(person.getNames()); // prints ["name", "age"];
console.log(person.Objects().map(obj => obj.value); // prints ["Franck", 25];
```
Note that LinkableHashmap are always ordered.

Classes
New Classes can be defined and registered with Weave so that instances of these classes will be Linkable Objects
member variables of the class are initialized with the Weave.linkableChild function.
Example:
```
class Person {
  name: Weave.linkableChild(this, LinkableString)
  age: Weave.linkableChild(this, LinkableNumber)
}
Weave.registerClass(Person, "Tutorial.Person");
```
Instances of this Class will be a Linkable Object.

##### root HashMap
A new instance of Weave provides the user with a root Hashmap where all of the session state is stored.
Example:
``` 
var weave = new Weave(); // creates a new instance of weave
weave.root.requestObject("first_person", Person);  // adds a new Person to the global hashmap
weave.root.removeObject("first_person"); // removes the object from the global hashmap
```

#### Callback Collection

Each LinkableObject has a callback collection associated with it. Callbacks are triggered whenever the LinkableObject changes. 
In Weave, changes are propagates upwards. if a linkable object is a child of another, changes in the child also trigger callbacks of the parent.

##### Immediate Callbacks
These type of callbacks are invoked immediately after changes.

##### Grouped Callbacks
These type of callbacks are invoked once per event loop. Additionally, multiple calls to this type of callbacks within the same event loop will only be triggered once.

Examples:
```
function greet()
{
  console.log("Hello " + name.value);
}

var name = new weavejs.core.LinkableString();
name.addImmediateCallback(this, greet);
name.value = "Franck";
```

```
function(greet)
{
    console.log(first_person.name.value + " is " + first_person.age.value " years old ");
}

class Person {
  name: Weave.linkableChild(this, LinkableString)
  age: Weave.linkableChild(this, LinkableNumber)
}
Weave.registerClass(Person, "Tutorial.Person");
var first_person = weave.root.requestObject("first_person", Person);
Weave.getCallbacks(first_person).addGroupedCallback(this, greet);
first_person.name.value = "Franck";
first_person.age.value = 25;
```

#### Session Manager
When creating a new instance of Weave, a singleton instance of a Session Manager is created. The Session Manager allows for Developers to create
and register Classes containing LinkableObjects. The Session Manager also manages and cleans up any object requested under the global hashmap and its callbacks when it is disposed.

Example:
```
var name = new weavejs.core.LinkableString();
name.addImmediateCallback(this, greet); // this call back is neve disposed
name.removeCallback(this, greet); // manually disposing the callback
```
```
class Person {
  name: Weave.linkableChild(this, LinkableString)
  age: Weave.linkableChild(this, LinkableNumber)
}
Weave.registerClass(Person, "Tutorial.Person");
var first_person = weave.root.requestObject("first_person", Person);
Weave.getCallbacks(first_person).addGroupedCallback(this, greet);
weave.root.remove("first_person", Person); // call back will be automatically disposed
```
It is highly recommended to always use the SessionManager and create Linkable Objects under the root global hashmap

### Weave and React
Weave is an architecture framework that works well with a lot of UI framework and especially React. Since Weave only triggers state changes callbacks on diffs and React 
update the DOM on diffs, using Weave together with React is not only very straight forward but also very efficient.
The general flow between Weave and React goes as follow

view changes  (e.g. server input) => set weave state => trigger callbacks => render => view changes (e.g. user input)
For render UI, it is almost always recommended to use grouped callbacks.

There are different ways to hook up React and Weave together, depending on the complication of your application logic.

React
Example:

MVC
Model => Weave State
Controller => Calls render when model changes, sets state when view changes
Example:
Diagram

Flux/Redux
Dispatcher/RootStore => Single Weave instance with a root HashMap
Stores => 
	Registered classes with Weave.
	Member variables are Weave linkable children
	Member functions are the store getters and actions
	addChangeListener(callback) adds a callback to the Store
	Single Instance of each store
Actions =>
	Invoke actions from one or more store.
View =>
	getState from store getters
	Invoke changes using actions
	
Diagram

Example:
TodoApp
ChatApp

React Components as Linkable Objects
