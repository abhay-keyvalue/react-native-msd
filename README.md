# react-native-msd

msd

## Installation

```sh
npm install react-native-msd
```

## Usage

```js
import {init, setUser, useEvents, useRecommendations} from 'react-native-msd';

// sdk initialization

const token ='sample api key';
const baseUrl ='base.ur.com';
init({token, baseUrl})

//...

// login user

const userId ='user id';
setUser({userId})

//...

// use event track function

const {track} =  useEvents();

const eventName = 'some Event name';
const eventProperties = {propertyOne: 'someValue', propertyTwo: 'someValue'};
track(eventName, eventProperties);

// use recommendations function


const {recommendations, getRecommendationByStrategy,
    getRecommendationByModule, getRecommendationByPage,
    getRecommendationByText} = useRecommendations();

const requestParams = {propertyOne: 'someValue', propertyTwo: 'someValue'};
getRecommendationByStrategy(requestParams);
getRecommendationByModule(requestParams);
getRecommendationByPage(requestParams);
getRecommendationByText(requestParams);

// ...

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---