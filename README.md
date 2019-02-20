This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Then, the global-input-app extension dependency is added:

```
npm i @bit/globalinput.web.global-input-connect
```

The ```clipboard-copy-button``` dependency provides a button that can copy content of a text field into clipboard:

```
npm i @bit/globalinput.web.clipboard-copy-button
```

Finally, the generated ```App.js``` is modified to implement the logic of a text editor and the mobile logic for transfer content between the Global Input App and the application. The [src/App.js](https://github.com/global-input/content-transfer-example/blob/master/src/App.js) contains all the logic.


You can run the application using ```npm run start``` or ```yarn start``` command:<br>
```
npm run start
```

And then scan the QR code displayed with your [Global Input App](https://globalinput.co.uk/) on your mobile.
