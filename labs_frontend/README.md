# Keyboard frontend
This is the frontend for the labs, built with React.

You should not need to change anything here. In case you discover some bugs, please let me know as an issue on this repository, or by email.

## Installation
To install the dependencies, run `npm install` in this directory.

## Running
To run the application, run `npm start` in this directory. This will start the application on `localhost:3000`.

## Running the electron app
The electron app is a precompiled version of the application, which you can run without having to install the dependencies. To run it, simply run `npm run electron` in this directory.

## Accessing on other devices
The application is set up to be accessible on your local network. To do this, you need to find your local IP address. This can be done by running `ipconfig` on Windows, or `ifconfig` on Mac/Linux. You can then access the application on `http://<your-ip>:3000` from any device. Ideally, at least.
