# office-lunch-menu-management
A simple lunch management webapp where users can select available lunch options for the current day, built with Node.js and Express.js for the backend, and React.js for the frontend.

## Features
- Admin can add lunch options
- Admin can view which employees choose which items
- Employees can choose their lunch options

## Project requirements
Node version **20** or higher is required to run this project. The project might work on a lower version as well.

## How to run backend
First, you need to set environment variables. Go the the `backend` folder. If you don't use Docker to run this project, open a `.env` file inside the backend folder. Then copy everything from the `.env.example` file and assign values to the variables. `ALLOWED_ORIGIN` is the url of the frontend. For example, if the frontend website address is `http://localhost:5173`, the value of `ALLOWED_ORIGIN` will be this address. `PORT` is the port for the backend. `JWT_SECRET` will be a large random string to generate `jwt-token` for authentication. You need to provide value in milliseconds in `JWT_LIFETIME`. If you want to remain logged in for two days, the value will be `172800000`. The rest of the variables are self-explanatory.

After setting the variables, run `npm run install` to install all the dependencies. Then, to run the backend, go to the **backend** folder and run `npm run prod`.

## How to run frontend
First, go to the `frontend` folder. Then similar to the backend, you need to open the `.env` file in the frontend folder. Copy everything from the.env.example file. Set the value of `VITE_API_BASE_URL` to the address of the backend. For instance, if the backend is running on `http://localhost:3000`, set the value of that variable to this. Now run `npm run install` to install all the dependencies. After the installation is done, run `npm run dev` to run the frontend in development mode. If you run it in production mode, first run `npm run build` to build the project and then run `npm run preview`.

## How to run frontend and backend inside docker container
If you do not want to take on those hustles, you can use Docker to run this application. You need to set environment variables inside the `frontend` and `backend` folders. Now the name of the `.env` variable inside the `backend` folder will be `.env.docker`. If you use Windows OS and PostgreSQL is on your Windows machine, set the variable `DB_HOST` to `host.docker.internal`. Otherwise, the database will fail to establish a connection with the backend Docker container. The rest of the variables are the same as before. Now come to the root directory where the `docker-compose.yml` file is located. Just run `docker compose up -d --build` and you are good to go. To remove containers run `docker compose down`.
**If you set the PORT of the backend other than 3000, go to the `docker-compose.yml` and change line no. 11 to `<your-selected-port>:<your-selected-port>`**.

## Api documentation:
Upload the [json file](https://drive.google.com/file/d/1uiNmPZrtw3k8o08IVfGPG3YePVG7AKUL/view?usp=sharing) to Postman. 

## How to create an admin user:
Run the backend first. Then go to postman and go here:
<div>
  <img width="200px" height"250px" src="https://github.com/AtiqurRahmanAni/office-lunch-menu-management/assets/56642339/f9c8dd41-86d5-4a73-a12d-c66ff7298cd8" alt="Postman Screenshot">
</div>
Then, enter the necessary information.

## Databse Schema:
<div>
  <img width="500px" height"400px" src="https://github.com/AtiqurRahmanAni/office-lunch-menu-management/assets/56642339/fe93619a-d38f-4be0-8603-61d2b65fc582" alt="Database Schema">
</div>

## Area of improvements
- Only JWT token authentication is used, which is not very secure. A more secure `access` and `refresh` token-based authentication system can be considered if security is a concern.
- Email verification or OTP system can be integrated upon sign-up to ensure real email addresses.
