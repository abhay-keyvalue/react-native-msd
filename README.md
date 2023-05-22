import MSD from 'react-native-msd;

// ...

i// sdk initialization

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

const requestParams = {paramOne: 'someValue', paramTwo: 'someValue'};
getRecommendations(requestParams);
// get the response as recommendations object# react-native-msd
# react-native-msd
