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
- [OpenAPI Docs](#openapi-docs)
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
If you want to use my custom map (if not the map falls back to the normal Openstreetmap, that I created for this app, create a .env in the root of the repository
and replace yourApiKey and yourUsername with your data, if you've created a mapbox account:
```.env
 VITE_MAPBOX_KEY=yourApiKey
 VITE_USERNAME=yourUsername
 VITE_MAPBOX_STYLE=cmc7sh93q02r701s55vsienbk
```

## Usage

First, you are presented with the WelcomePage. There you will have a little tutorial on how to use the ImageSlider.
<img width="408" height="850" alt="Screenshot 2025-07-16 at 23 59 16" src="https://github.com/user-attachments/assets/1a232c8b-0bb5-44d8-b221-b72b949095d6" />

Once you press Start exploring you can see the (custom) map and the pins for the different locations.
<img width="302" height="297" alt="Screenshot 2025-07-16 at 23 59 40" src="https://github.com/user-attachments/assets/d34eb213-e47f-4ad1-aef5-d33b0174e630" />

You can also see in the bottom right a button that let's you find your current location.

<img width="71" height="83" alt="Screenshot 2025-07-16 at 23 59 56" src="https://github.com/user-attachments/assets/3ca13ff5-d7ae-4c13-ab02-7f1c4c7a4c62" />

On the top left you can zoom in and out of the map.

<img width="75" height="110" alt="Screenshot 2025-07-17 at 00 00 08" src="https://github.com/user-attachments/assets/2a0e6364-56a5-408b-8093-062540c5f39b" />

Once you've clicked one of the pins, a button will appear, that leads you to one of the locations.

<img width="306" height="69" alt="Screenshot 2025-07-17 at 00 00 36" src="https://github.com/user-attachments/assets/6764dce0-28ac-4b76-b088-ecd3407db59b" />

Once you've clicked the Directions to... button it will show you the route to the location that you chose.
<img width="387" height="688" alt="Screenshot 2025-07-17 at 00 01 06" src="https://github.com/user-attachments/assets/0357ea60-5454-4243-a8dc-b5271c6d6565" />

On the top right, you can click the button that gives you specific instructions on how to get to the location.

<img width="54" height="47" alt="Screenshot 2025-07-17 at 00 01 43" src="https://github.com/user-attachments/assets/b6d7c3c6-4b70-414a-9c64-864a43dfcda9" />
<img width="355" height="219" alt="Screenshot 2025-07-17 at 00 01 57" src="https://github.com/user-attachments/assets/43873513-07c3-47fd-816d-4b37dd8d864c" />

If you are under 100m of a specific location and you clicked on the pin, you will see the TimeTravel... button, 
<img width="306" height="67" alt="Screenshot 2025-07-17 at 00 02 09" src="https://github.com/user-attachments/assets/8f577eab-0ab2-4829-b9f3-65583e689cc2" />

Then you can get to the Timetravel page.

<img width="398" height="833" alt="Screenshot 2025-07-17 at 00 02 44" src="https://github.com/user-attachments/assets/df54e380-da08-45ae-9e5c-2c5d3bea2f4c" />

It is very simple, you can swipe the orange button in the middle left and right to see the before or after of the location.

<img width="367" height="686" alt="Screenshot 2025-07-17 at 00 02 59" src="https://github.com/user-attachments/assets/d5d58117-0893-4073-a1c3-688b801594f5" />

Once you've reached the end of one side with the slider, there will be an infobox that you can toggle up or down to see more info.
You can also scroll the content if it is longer.

<img width="417" height="688" alt="Screenshot 2025-07-17 at 00 03 20" src="https://github.com/user-attachments/assets/dac1f3b8-62ee-4834-b011-3b79693e6add" />
<img width="361" height="364" alt="Screenshot 2025-07-17 at 00 03 34" src="https://github.com/user-attachments/assets/50b10e03-f8b0-4b30-902f-a3557f84b828" />

The 'X' button leads you back to the map.

<img width="61" height="60" alt="Screenshot 2025-07-17 at 00 03 53" src="https://github.com/user-attachments/assets/96072fbc-b72e-468b-8747-231aeaf11e22" />

Once you visited a location, the Marker will be replaced with a already visited icon. Now, if you are more than 100m away you can do the Timetravel for the locations that you already visited from anywhere.

<img width="102" height="113" alt="Screenshot 2025-07-17 at 00 41 34" src="https://github.com/user-attachments/assets/c1e0d4d2-e8fa-454f-ba96-867d554ea1e6" />

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

## OpenAPI Docs
In order to see the OpenAPI documentation and test the API routes and endpoints, please run:
```bash
  cd backend/
  npm run start
```
Then paste the url: 
```bash
  http://localhost:3000/api
```
into your browser.
<img width="920" height="456" alt="Screenshot 2025-07-17 at 00 04 51" src="https://github.com/user-attachments/assets/9ff37582-fc9f-4c45-b690-9f7496464bb9" />


## Credits
N/A

## License
MIT licensed product.

## How to Contribute
Under src/data/LocationData.json are already some of the pins for Mittweida.
If you have more locationData, you can kindly send me more of the data in the same format 
to Fabian.Wagner@stud.srh-university.de.

