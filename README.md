# shop app Frontend

Shop app Frontend is the user interface for the Online Shopping Platform designed to track which items are added to a basket but removed before checkout. This data is beneficial for the sales team to offer targeted discounts.

---

## Getting Started

1. git clone this repository & cd into the project directory

## Pre-requisites

* Node.js 12.x or greater
* npm or yarn
* Git
* A code editor such as VSCode, WebStorm, or any other of your preferred choice.

## Installing

* Install [Node.js](https://nodejs.org/en/download/) if you don't have it installed.
* Install [git](https://www.digitalocean.com/community/tutorials/how-to-contribute-to-open-source-getting-started-with-git) (optional) if you don't have it installed.

## Configuration

* Open the `.env` or `src/utils/api.js` file and set the `API_URL` to your backend URL. If you don't set it, the application will attempt to connect to `http://localhost:3000` by default.

## Running the project

#### Using VSCode

1. Launch VSCode editor.
2. Open the terminal in VSCode.
3. Run `npm install` or `yarn` to install the project dependencies.
4. Run `npm run dev` or `yarn dev` to start the local development server.
5. The port your application is running on will be provided in your terminal.
6. Congratulations! You have successfully launched the shop app Frontend!

#### Using Docker

> For this, you need to have [Docker](https://www.docker.com/) installed on your system.

1. Run `docker build -t <image-name> .` to build the Docker image.
2. Run `docker run -p 8080:8080 <image-name>` to run the image. This will expose port `8080`.

#### Using Docker compose

> For this, you need to have [Docker](https://www.docker.com/) and [Docker compose](https://docs.docker.com/compose/) installed on your system.

1. Run `docker-compose up` to build and run the Docker images.

## Testing

Run `npm test` or `yarn test`

## Built With

* Vue.js
* Node.js
* Vite
* Tailwind CSS
* npm or yarn (package manager)

## Authors

* **Alain MUCYO** (https://github.com/alainmucyo)

## Licence

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
