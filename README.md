# CS 4261 Smart Scheduler

We built an app to generate schedule combinations for students at Georgia Tech.

### Installation

In order to run this project, you must have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed.

Next, clone this repository to your local workspace. Go ahead and open a terminal in this project directory.

You can install all dependencies with the following command:

```
yarn
```

Next, set up your environment variables. There should be two `.env.example` files, one within the `app` directory and another within the `server` directory. Copy each of these files to the same directory with the name `.env`. In this new file, fill out each of the environment variables that correspond to your local system setup (stuff like database username/password, etc.).

### Running the Server

Regardless of what device you want to preview the app on, you'll need to have the server running. First, start the local MongoDB server with the following command (may vary based on OS, might need to use `sudo`):

```
mongod
```

After starting MongoDB, you'll need to add course data to the database. You can run the following command to seed your database with cached data:

```
yarn seed-courses
```

Next, start the server by running the following command:

```
yarn start-server
```

### Run in Browser

Running the frontend of the app in the browser is simple, and can be done with the following command:

```
yarn start-app
```

This should open the application in your browser. To get a preview of how the app would look on a real device, you can use [Chrome's Device Mode](https://developers.google.com/web/tools/chrome-devtools/device-mode/) or [Firefox's Responsive Design Mode](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode).

### Run on iOS

Running on iOS is a bit more complicated. For more information, see the official [Ionic tutorial](https://ionicframework.com/docs/developing/ios).

You'll need a Mac with Xcode installed, along with the Xcode command line tools which can be installed by running:

```
xcode-select --install
```

You'll need to have [Cocoapods](https://cocoapods.org/) installed, which requires [Ruby](https://www.ruby-lang.org/en/downloads/) and [Gem](https://rubygems.org/pages/download) to be installed first.

iOS has some additional dependencies that can be installed by running the following:

```
yarn ios-install
```

Each time the app code changes, you'll have to rebuild the iOS project. You'll also have to run this command in order to build the iOS version for the first time:

```
yarn ios-build
```

Now, you should be able to open the project in Xcode. Running the following command should launch the Xcode project, where you can run the app on a simulator or real device.

```
yarn ios-open
```

After opening the project in Xcode, open the `App` and go to the `Signing & Capabilities` tab. Make sure that "Automatically manage signing" is turned on and a team is selected from the dropdown.

Finally, you should be able to run the app by clicking the play button.
