# react-native-msd

msd

## Installation

```sh
npm install react-native-msd
```

## Usage

```js
import MSD from 'react-native-msd;
// ...

// sdk initialization

const {init} = MSD();

//... 

const apiKey ='sample api key';
init(apiKey)

//...


// use event track function

const {useEvents} = MSD();

//...

const {track} useEvents();

//...

const eventName = 'some Event name';
const eventProperties = {propertyOne: 'someValue', propertyTwo: 'someValue'}
track(eventName, eventProperties);

// use recommendations function

const {useRecommendations} = MSD();

const {recommendations, getRecommendations} = useRecommendations();

// ...

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---