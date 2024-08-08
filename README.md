# Spotify Clone

A web-based Spotify clone built using React.js and the Spotify Web API.

## Table of Contents

- [Features](#features)
- [Languages Used](#languages-used)
- [Libraries Used](#libraries-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App Locally](#running-the-app-locally)
  - [Testing Mode](#testing-mode)
  - [Building for Production](#building-for-production)
- [Folder Structure](#folder-structure)
## Features

- **User Authentication**: Sign in with your Spotify account.
- **Playlist Display**: View and interact with your Spotify playlists.
- **Dynamic UI Colors**: UI color scheme adapts to the current album cover.
- **Responsive Design**: Mobile-friendly layout.
- **Search Functionality**: Search for songs, playlists, albums, and artists directly within the app.

## Languages Used

- **JavaScript**: The primary language used for building the application.
- **HTML**: Used for structuring the web pages.
- **CSS**: Used for styling the application and making it responsive.

## Libraries Used

- **React.js**: A JavaScript library for building user interfaces.
- **React Router DOM**: For handling routing in a single-page application.
- **Font Awesome**: Icon library used throughout the application.
- **Vibrant.js**: Library used to extract prominent colors from images.
- **React Color Extractor**: Library used to extract dominant colors from album covers.
- **Spotify Web API JS**: A JavaScript library for interacting with the Spotify Web API.



## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure Node.js is installed on your machine.
- **Spotify Developer Account**: Register your app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) to obtain the Client ID and Secret.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/react-spotify-clone.git
    cd react-spotify-clone
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Running the App Locally

To start the development server, run:

```bash
npm start 
```

### Testing Mode
In the WelcomeNote.js component (located inside the components folder), there is a constant testing that controls whether the app uses the local redirect URL or the GitHub URL.

To run the app locally, set testing to true:

```bash
const testing = true; // For local testing
```
Important: Before pushing to the repository for production deployment, ensure that testing is set to false:
```bash
const testing = false; // For production deployment
```

### For Production
To create a production build of the app and deploy, run:

```bash
npm run deploy
```


### Folder Structure
```bash
public/
│   404.html
│   favicon.ico
│   index.html
│
src/
└── Assets/
└── Components/
    │   Banner.js
    │   Controls.js
    │   Header.js
    │   SideBar.js
    │   Songs.js
    │   WebPlayer.js
    │   WelcomeNote.js
└── Routes/
    │   Album.js
    │   Artist.js
    │   Home.js
    │   MusicPlayer.js
    │   Playlist.js
    │   Search.js
└── Styles/
    │   app.css
    │   banner.css
    │   controls.css
    │   header.css
    │   home.css
    │   musicPlayer.css
    │   search.css
    │   sideBar.css
    │   songs.css
    │   webplayerMain.css
    │   welcomeNote.css
│   App.js
│   index.js
│   playlistsid.js
│   .gitignore
│   README.md
│   package-lock.json
│   package.json

```
