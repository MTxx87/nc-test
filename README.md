# NC-test

The project took around 7h for me to complete.  
Some of the parts I have never done before, so I had to read plenty of documentation.

**NOTES on future development**

1. Error handling on frontend is really basic and could be improved, expecially when it comes to network calls.
1. Private routes implementation such as the "profile" page can be done better. Right now the page flickers on the profile page before redirecting back to login in case the user is not authenticated.
1. Security in backend and DB can be dramatically improved. Right now security is limited to CORS settings and little more.
1. Security in frontend can also be improved. Eg. The parameters used in the Firebase setup should be moved to the `.env` files, as done for the `backend_url` parameter.

## Frontend

### Local setup

```
cd frontend
mv .example.env .env.development
yarn install
yarn start
```

Visit app at [http://localhost:3000](http://localhost:3000)

## Backend

### Local setup

```
cd backend
npm install
npm prepare
npm start
```

Backed exposed at [http://localhost:8080](http://localhost:8080)

## Live demo

Frontend: [https://nc-test.netlify.app](https://nc-test.netlify.app)  
Backend: [https://charming-sonar-365507.ey.r.appspot.com](https://charming-sonar-365507.ey.r.appspot.com)

### Test phone

- +46 11 111 11 11
- code: 111111

## DB Screenshot

![screenshot](db-screenshot.jpg)
