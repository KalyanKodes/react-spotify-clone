# Spotify Clone

A web-based Spotify clone built using React.js and the Spotify Web API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App Locally](#running-the-app-locally)
  - [Environment Variables](#environment-variables)
  - [Testing Mode](#testing-mode)
  - [Building for Production](#building-for-production)
- [Folder Structure](#folder-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **User Authentication**: Sign in with your Spotify account.
- **Playlist Display**: View and interact with your Spotify playlists.
- **Dynamic UI Colors**: UI color scheme adapts to the current album cover.
- **Responsive Design**: Mobile-friendly layout.

## Technologies Used

- **React.js**: UI library for building user interfaces.
- **Spotify Web API**: For fetching data from Spotify and user authentication.
- **React Router**: Client-side routing for a single-page application.
- **Font Awesome**: Icons used throughout the application.
- **Vibrant.js**: Extracts colors from images for dynamic theming.
- **React Color Extractor**: Used for extracting dominant colors from album covers.

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

├── public/
├── src/
│   ├── components/
│   │   ├── WelcomeNote.js
│   │   └── # Other component files...
│   ├── App.js
│   ├── index.js
│   └── # Other JS files...
├── .env
├── package.json
└── README.md
