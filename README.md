# Mittweida Timetravel

## Description

Welcome to Mittweida Timetravel!
This application is supposed to guide you around Mittweida and lets you timetravel.
You can see Mittweida from the past and also the present.
This App is built with React for the frontend and Nest.js for the backend.

## Table of Contents
- [Installation](#installation)
- [Optional (Custom Map)](#optional-custom-map)
- [Usage](#usage)
- [Testing](#testing)
- [Credits](#credits)
- [License](#license)
- [How to Contribute](#how-to-contribute)

## Installation

Once the repository is cloned into your IDE, you can run:
```bash
  npm install
```
Make sure to replace all the localhost:3000 in the src/assets/components/MainPage.tsx with yourIP:3000
e.g.replace:
```js
  const { data: visitedLocation =[] , error, isLoading } = useSWR<string[]>(
    'http://localhost:3000/location/visited',
        fetcher
);
```
with your IP-Adress, here's an example IP address:
```ts
  const { data: visitedLocation =[] , error, isLoading } = useSWR<string[]>(
    'http://148.289.127.287:3000/location/visited',
        fetcher
);
```
and do the same in the backend/src/main.ts, but this time with the port :5173:
```ts
  // main.ts
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'https://fabianmelone.github.io',
            'http://148.289.127.287:5173',
        ],
        credentials: true,
    });
    await app.listen(3000, '0.0.0.0');
}
```
You can find your IP-Address if you run
```bash
  ipconfig
```
in Windows or 
```bash
  ipconfig getifaddr en0
```
on Mac.

Once you've done that, you can run, for the frontend:
```bash
  npm run dev
```
and for the backend:
```bash
  cd backend/
  npm run start
```
For local testing you can use the link after
```bash
  Local:
```
and for phone testing paste the link in your browser after:
```bash
  Network:
```
## Optional (Custom Map)
If you want to use my custom map, that I created for this app, create a .env in the root of the repository
and replace yourApiKey and yourUsername with your data, if you've created a mapbox account:
```.env
 VITE_MAPBOX_KEY=yourApiKey
 VITE_USERNAME=yourUsername
 VITE_MAPBOX_STYLE=cmc7sh93q02r701s55vsienbk
```

## Usage

First, you are presented with the WelcomePage. There you will have a little tutorial on how to use the ImageSlider.

Once you press Start exploring you can see the (custom) map and the pins for the different locations.

You can also see in the bottom right a button that let's you find your current location.

On the top left you can zoom in and out of the map.

Once you've clicked one of the pins, a button will appear, that leads you to one of the locations.

Once you've clicked the Directions to... button it will show you the route to the location that you chose.

On the top right, you can click the button that gives you specific instructions on how to get to the location.

If you are under 100m of a specific location and you clicked on the pin, you will see the TimeTravel... button, 

Then you can get to the Timetravel page.

It is very simple, you can swipe the orange button in the middle left and right to see the before or after of the location.

Once you've reached the end of one side with the slider, there will be an infobox that you can toggle up or down to see more info.
You can also scroll the content if it is longer.

The 'X' button leads you back to the map.

Bonus: You can also change your location, by uncommenting one of the testlocations and make sure to comment out the other to not run into errors:
```ts
  // MainPage.ts
// testing for nearby location library
navigator.geolocation.getCurrentPosition = (success) => {
    success({
        coords: {
            latitude: 50.985957,
            longitude: 12.973964,
            accuracy: 10,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
        },
        timestamp: Date.now(),
    } as GeolocationPosition);
};

// testing for nearby stadtverwaltung
// navigator.geolocation.getCurrentPosition = (success) => {
//     success({
//         coords: {
//             latitude: 50.985530,
//             longitude: 12.980903,
//             accuracy: 10,
//             altitude: null,
//             altitudeAccuracy: null,
//             heading: null,
//             speed: null,
//         },
//         timestamp: Date.now(),
//     } as GeolocationPosition);
// };
```

## Testing
For the testing of the frontend React components (WelcomePage, RouteButton, LoadingScreen), please run:
```bash
  npm run test
```
To test the LocationController in the backend pls run:
```bash
  cd backend/
  npm run test
```

## Credits
N/A

## License
MIT licensed product.

## How to Contribute
Under src/data/LocationData.json are already some of the pins for Mittweida.
If you have more locationData, you can kindly send me more of the data in the same format 
to Fabian.Wagner@stud.srh-university.de.

