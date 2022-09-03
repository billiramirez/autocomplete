# React Autcomplete Component

![Autocomplete React](https://res.cloudinary.com/billiramirez/image/upload/v1662215192/autocomplete_k9l38i.png)

## Autocomplete component built from scratch, using [ReactJS](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/)

## Description

For testing purpose on this component we are using a model of Countries. We we type in the name of the country we want to share and it will hit the endpoint to find any matching results.

## How to run the project

Please make sure you follow the requisites below:

- Nodejs Installed on your machine (v16.13.0 or higher)
- Npm installed on your machine (8.1.0 or higher)
- Any Code Editor of your choice
- Terminal on your computer

### Install dependencies

Once you're set, please open the project and then open a terminal, run this following command:

```bash
 npm install
```

### Run the project

Please run the following command

```bash
  npm run start
```

This will open the port `:3000`, open your browser and go to this url: `http://localhost:3000`.

## Api Call Considerations

Due to performance, I follow this approach of sending to the api endpoint the math text I want to find.

![Efficient Approach](https://res.cloudinary.com/billiramirez/image/upload/v1662216509/efficient-approach_a4z6pf.png)

> NOTE We could have done the filtering on the UI but this kind of operations are quite expensive on the client. For this example we have not too much data. But there could be cases where we have thousands of records. Fetching that amount of data upfront is not the best solutions.

> But if we know this will fetch a little amount of data, yes we could have done the filtering on the UI. That's why you can find that approach in another branch of this repository. Called `data-upfront`
