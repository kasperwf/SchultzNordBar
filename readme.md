# Schultz Mönster Nörd Bar - Team NoDamnTS

Enhanced solution to the Schultz Mönster Nörd Bar challenge. Answers questions from the Mönster server.

An Express & NodeJS web application, which queries the WolframAlpha API (the original solution didn't - but as the winning quote goes: _**Don't work harder - work smarter**_).

## Configure the API

 1. Get yourself an AppId from WolframAlpha
 2. Create a `.env` file in the root of the project and add this to it:
 ```bash
 # .env
 WOLFRAM_APPID=<your_appid_here>
 ```

Install the dependencies:
```
> npm i
```
## Run the application

Run this in your terminal:

```
npm start
```

After the application has started visit [http://localhost:3000](http://localhost:3000) in your preferred browser.

Keep an eye out for questions the Wolfram API can't answer - they will be output to your terminal running the application, and add the logic yourself to the `switch` statement in `app/index.js` - or fuck it - anywhere you want.