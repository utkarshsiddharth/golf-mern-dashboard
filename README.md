# Getting Started with Create React App

# First install the dependencies for both API & front-end

# `npm install`

### env files

1. Backend environment file
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=1h

MONGO_URI=your_mongo_uri

FILE_UPLOAD_PATH=./backend/public/uploads
MAX_FILE_UPLOAD=1000000

2. front end environment file

REACT_APP_API_URL=api_url
this can be used if the API is hosted seperately

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm run server`

to run only the server - by default on port 5000

### `npm run dev`

to run both client and API concurrently in same terminal process

## HEROKU POSTBUILD

first specify the entry point of your front-end applicaiton. ex:

# "homepage": "https://bogeysport.com/dashboard/"

# log into your heroku account

# create a new repository

### run the `heroku-postbuild` command

# setup your env credentials usign either terminal or heroku dashboard

# push the code to heroku using - git push heroku your_branch_name

# run this command every time you make changes to your code
