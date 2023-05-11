[Live](https://book-tg75.onrender.com/)[Note: the website may take a few seconds to load as rendering can be slow].
# Bookshop Web Application

The Bookshop Web Application is a full stack web application built using Node.js, Koa, Handlebars (hbs) and SQL that enables users to view, add, update and delete books from the bookshop. It is designed to provide an easy-to-use interface that allows users to manage their books and book-related information effectively. The application stores data such as user information and book details in a database, making it easy to retrieve and update information.

## Project description 
```
* This is a Node.js application.
* It uses the Koa web framework to handle HTTP requests and responses.
* It uses several third-party modules, including:
- bcrypt
- koa-session
- koa-router
- koa-static
- koa-hbs-renderer
- koa-bodyparser
- sqlite3
- The application creates an HTTP server that listens on port 8080.
- When the server receives an HTTP request, 
it uses the Koa router to match the request to a handler function.
- The handler function interacts with a SQLite database 
to perform CRUD operations on a books table.

```
The Bookshop Web Application has several routes, including:

- GET '/' - displays the homepage, which includes a login form
- GET '/details/:id' - displays details for a specific book
- GET '/form' - displays a form to add a new book (accessible only for logged-in users)
- POST '/add' - adds a new book to the database (accessible only for logged-in users)
- GET '/details/:id/update' - displays a form to update a book (accessible only for logged-in users)
- POST '/details/:id/update' - updates a book in the database (accessible only for logged-in users)
- GET '/details/:id/delete' - deletes a book from the database (accessible only for logged-in users)
- GET '/login' - displays a login form
- POST '/login' - authenticates a user and sets a session
- GET '/home' - displays a home page for a logged-in user (accessible only for logged-in users)
- GET '/register' - displays a registration form
- POST '/register' - registers a new user in the database
- The application uses bcrypt to hash and compare passwords, and it utilizes the koa-session middleware to manage user sessions. The crypto module is used to generate a session secret key.

## User Stories
The Bookshop Web Application has the following user stories:
```
- As a new user, I want to be able to register for an account.
- As a registered user, I want to be able to log in to my account.
- As a user, I want to be able to view a list of books available in the bookshop.
- As a user, I want to be able to view more details about a book.
- As a registered user, I want to be able to add a new book to the bookshop.
- As a registered user, I want to be able to update a book in the bookshop.
- As a registered user, I want to be able to delete a book from the bookshop.
```
## Technologies Used
The Bookshop Web Application was built using the following technologies:

* Node.js
* Koa
* SQLite3
* Handlebars
* CSS

## Table of Contents
- Installation
- Usage
- Future Improvements
- Credits
- Author
- Screenshot

## Installation
To install the Bookshop Web Application, please follow these steps:

- Clone the repository to your local machine.
- Open the terminal and navigate to the project directory.
- Run npm install to install the dependencies.


# Usage
To use the Bookshop Web Application, please follow these steps:

#### To access the application:

- Open the Bookshop Web Application by navigating to https://book-tg75.onrender.com/. The homepage with the login form will be displayed.

- If you are a new user, click on the "Register" link to access the registration form. Fill out the form with your desired username, password, and any other required information.

- If you are a registered user, enter your username and password in the login form on the homepage.

- After successfully logging in, you will be redirected to the home page ('/home').

- From the home page, you can view a list of books available in the bookshop.

- Clicking on a book title in the list will take you to the details page for that specific book ('/details/:id').

- If you are a registered user, you can add a new book by clicking on the "Add Book" button, which will take you to the '/form' route. Fill out the book information form and submit it to add the book to the database.

- On the details page, there should be buttons or links specifically for updating and deleting the book. Look for an "Update" or "Edit" button/link to update the book's information, and a "Delete" button/link to delete the book.

- To update the book, click on the "Update" or "Edit" button/link on the details page. This will take you to the '/details/:id/update' route, where you can modify the book's information, such as the title, ISBN, or description. Once you have made the desired changes, you can submit the updated information.

- To delete the book, click on the "Delete" button/link on the details page. This will prompt a confirmation message to ensure you want to delete the book. If you confirm the deletion, the book will be permanently removed from the database.

* Remember, certain routes and actions are only accessible to logged-in users. If you are not logged in, you will only have access to the registration and login routes. Once you log in, you will have access to the full functionality of the application.

## Screenshot
![Screenshot 2023-05-06 at 13 19 35](https://user-images.githubusercontent.com/102771343/236623806-858f737d-dab6-4b43-8dd6-45d495cb16ad.png)
![Screenshot 2023-05-06 at 13 20 13](https://user-images.githubusercontent.com/102771343/236623811-58457754-eb57-4af9-b260-49a8db631780.png)
![Screenshot 2023-05-06 at 13 20 34](https://user-images.githubusercontent.com/102771343/236623816-004472dc-b095-4afb-b221-44a37fe6f55d.png)
![Screenshot 2023-05-06 at 13 20 47](https://user-images.githubusercontent.com/102771343/236623823-f7a3b5a4-543f-4761-b38e-e32348459999.png)
![Screenshot 2023-05-06 at 13 21 08](https://user-images.githubusercontent.com/102771343/236624896-147bc539-e2a2-4c28-b256-0423cd58f001.png)
![Screenshot 2023-05-06 at 13 21 20](https://user-images.githubusercontent.com/102771343/236623832-f8a2b007-985e-4d0f-bd5d-660e13940064.png)
![Screenshot 2023-05-06 at 13 21 38](https://user-images.githubusercontent.com/102771343/236623844-d637cb20-721a-4a94-959c-e18e9a0b5ac1.png)



## Future Improvements
 
The Bookshop Web Application has the following areas that could be improved:

- Add search functionality to the book list page.
- Implement pagination for the book list page.
- Allow users to upload book images.
- Add authentication middleware to protect the routes that require login.
- Improve the UI/UX of the application.

## Credits
The following resources were used in the development of the Bookshop Web Application:

- Node.js: https://nodejs.org/en/
- Koa: https://koajs.com/
- SQLite3: https://www.sqlite.org/index.html
- Handlebars: https://handlebarsjs.com/
- CSS: https://www.w3schools.com/css/default.asp
- Documentation: https://developer.mozilla.org/en-US/
- FreeCodeCamp: https://www.freecodecamp.org/
## Author
The Bookshop Web Application was developed by Faduma Ibrahim. If you have any questions or suggestions, please feel free to contact me.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
