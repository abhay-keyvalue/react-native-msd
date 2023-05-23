# react-native-msd

msd

## Installation

```sh
npm install react-native-msd
```

## Usage

```js
import {init, useEvents, useRecommendations} from 'react-native-msd';

// sdk initialization

const apiKey ='sample api key';
init(apiKey)

//...


// use event track function

const {track} =  useEvents();

const eventName = 'some Event name';
const eventProperties = {propertyOne: 'someValue', propertyTwo: 'someValue'};
track(eventName, eventProperties);

// use recommendations function


const {recommendations, getRecommendations} = useRecommendations();

const requestParams = {propertyOne: 'someValue', propertyTwo: 'someValue'};
getRecommendations(requestParams);

// ...

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---