# Part 2

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

Pure component are seamless to pure functions in javascript, given the input of the function it should not mutate or alter the result. In React we have pure component when we want to return the same jsx, if you give multiple kind of props it will return the same jsx.

For Components, we can manage state and this will perform as a statefull component. We can manipulate the state of the component.

For example:
PureComponent

```typescriptreact

  /*
  * Here we are not mutating any state of the component, so it's pure
  */

  type Props = {
    url: string;
    name: string;
  }

  const Avatar ({url, name}: Props) => {
    return (
      <div>
        <h1>Welcome back {name}</h1>
        <img src={url} alt={`welcome-${name}-img`}/>
      </div>
    )
  }
```

Component

```typescriptreact

  // Here we are managing state and mutating it. It's not longer pure.

  type Props = {
    url: string;
    name: string;
  }

  const Avatar ({url, name}: Props) => {
    const [primaryImageUrl, setPrimaryImageUrl] = useState<string>("")

    useEffect(() => {
      fetch(url).then(data => data.json()).then(images => setPrimaryImageUrl[0]);
    }, [url])


    return (
      <div>
        <h1>Welcome back {name}</h1>
        <img src={url} alt={`welcome-${name}-img`}/>
      </div>
    )
  }
```

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

From my understanding shouldComponentUpdate is the way can tell if the component needs a re-render, based on the `prev` and `next state`. When we are using context, we are always using the `latest` state. So in short terms, we could not use the `shouldComponentUpdate` cause it won't have the way of comparing states.

## 3. Describe 3 ways to pass information from a component to its PARENT

### 1. Using Context

We could have our own context for our parent component which this will help use to use it in their childs components, making use of `High Order Components`.

### 2. Passing Callbacks Functions from parent to child

```typescriptreact

 const ParentComponent = () => {
  const [name, setName] = useState<string>("");

  const updateName = (name: string) => {
    setName(name);
  }

  return <ChildComponent updateName={setName}/>
 }


type ChildProps = {
  updateName: (name: string) => void;
};

 const ChildComponent = ({updateName}: ChildProps) => {
  const [name, setName] = useState<string>("");

  const onUpdateNameValue = (e) => {
    setName(e.target.value);
    onUpdateName(e.target.value); // pass information to the parent
  }

  return <input type="text" onChange={onUpdateNameValue} value={name}/>
 }

```

### 3. Using flux architectures

We can use some thirds party libraries such as `redux` for managing complex states, this is so benefitial cause we leverage the state to other places, and the architecture will be loosy coupled.

## 4. Give 2 ways to prevent components from re-rendering.

- Avoid creating unnecessary states variables.
- Be carefull with useEffects and it's dependencies
- Create decoupled components and perhaps managing their state in a context.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a virtual dom container React provides you to wrap some JSX elements without the need of adding a new html element. So instead of adding a lot of `<div>` we could use a `<React.Fragment>` for wrapping a group of elements.

This could break your app when you want to styling or trying to access to that node. Example: Using a `ref`. This should be used only for wrapping a group of elements.

## 6. Give 3 examples of the HOC pattern.

- Authorization/Authenticated routes in our application
- Composing styles (styled components) or some other libraries such as Material UI when you create your themes or stylings.
- Loaders, for instance you want to show a list of images, you can pass a url loader for showing it in the meantime the xhr request is happening.

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

### 1. Promises

Promises return `resolve, reject` , the way that promises handle the exceptions is with the `reject` so we can catch the error in the client with some `try/catch` or `.catch()`

### 2. Callbacks

Callbacks are error first , what do I mean by that? It will try to check if there was an error first.

```javascript
  const callbackFn = (err, data) = {
    if(err) {
      throw new Error("Hey something went wrong");
    }
    return data;
  }
```

### 3. Async/Await

With this syntax we can manage the exception with `try/catch`, if the await statement fails it will fall directly to the catch and the `continue` message won't appear.

```javascript
try {
  await doSomethingAsync();
  console.log("continue");
} catch (err) {
  throw err;
}
```

## 8. How many arguments does setState take and why is it async

- It could take two parameters, the new state to update and a callback function. So for example you want to console.log('here') when the update is finished.

- It's async cause given the fact there could any other update states on the queue, react tries to schedule the updates.

## 9. List the steps needed to migrate a Class to Function Component\

```javascript
class Car extends React.Component {
  constructor() {
    super();
    this.state = { color: "red" };
  }
  render() {
    return <h2>I am a Car!</h2>;
  }
}
```

```javascript

const Car = () => {
    const [state, setState] = useState("red");
    return (
      <h2>I am a {state} Car!</h2>;
    )
}
```

- We need to remove the class and create a function that will `return()` some jsx instead of `render()`
- Replace class variables with `useState` hook.
- Identify any states update and adjust it to the `useEffect`
- listing the deps on the array for that hook.

## 10. List a few ways styles can be used with components.

- Inline Styling the component directly

```
 <h1 style={{borderRadius: '1px solid red'}}> </h1>
```

- Css Class

```
 <h1 className="header"> </h1>
```

- Components Libraries such as: Material UI, AntDesign, ChakraUI

- CSS Libraries such as TailwindCSS, Boostrap, etc.

## 11. How to render an HTML string coming from the server.

Nowdays we have the JAMStack and we could have the change were the markdown could be return from a server/headlessCMS, etc

The way we can do for adding that string html is with: `dangerouslySetInnerHTML`;

```javascript
// ...

const markdown = "<p>Your html code here.<p>"; // returned from the server

return <div dangerouslySetInnerHTML={{ __html: markdown }} />;
```
