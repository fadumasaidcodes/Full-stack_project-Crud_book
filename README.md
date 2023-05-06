[Live](https://book-tg75.onrender.com/)[Note: the website may take a few seconds to load as rendering can be slow].
# Bookshop Web Application

The Bookshop Web Application is a full stack web application built using Node.js, Koa, Handlebars (hbs) and SQL that enables users to view, add, update and delete books from the bookshop. It is designed to provide an easy-to-use interface that allows users to manage their books and book-related information effectively. The application stores data such as user information and book details in a database, making it easy to retrieve and update information.

## project description 
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
The application has several routes, including:

- GET '/' - displays a list of books
- GET '/details/:id' - displays details for a specific book
- GET '/form' - displays a form to add a new book
- POST '/add' - adds a new book to the database
- GET '/details/:id/update' - displays a form to update a book
- POST '/details/:id/update' - updates a book in the database
- GET '/details/:id/delete' - deletes a book from the database
- GET '/login' - displays a login form
- POST '/login' - authenticates a user and sets a session
- GET '/homes' - displays a homes page for a logged-in user
- GET '/register' - displays a registration form
- POST '/register' - registers a new user in the database
- The application uses bcrypt to hash and compare passwords, and uses the koa-session middleware to manage user sessions. The crypto module is used to generate a session secret key.

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
Installation
Usage
Future Improvements
Credits
Author

## Installation
To install the Bookshop Web Application, please follow these steps:

- Clone the repository to your local machine.
- Open the terminal and navigate to the project directory.
- Run npm install to install the dependencies.
- Run npm run dev to start the server.

# Usage
To use the Bookshop Web Application, please follow these steps:

- Navigate to http://localhost:3000 in your web browser.
- If you are a new user, click on the "register" button and fill out the registration form with your username, password, and confirm password.
- If you are a registered user, click on the "login" button and provide your username and password.
- Once logged in, you will be able to view a list of books available in the bookshop.
- To view more details about a book, click on the book title in the list.
- To add a new book, click on the "add book" button and fill out the add book form with the book title, ISBN, and description.
- To update a book, click on the "update" button next to a book title in the list of books available in the bookshop.
- To delete a book, click on the "delete" button next to a book title in the list of books available in the bookshop.

* Instructions on how to use the application, including:

- To access the home page, go to https://book-tg75.onrender.com/ (Note: the website may take a few seconds to load as rendering can be slow)

- To view more details about a book, append "/details/<book_id>" to the URL. For example, to view details about book with id=1, go to https://book-tg75.onrender.com/details/2.

- To log in to your account, go to https://book-tg75.onrender.com/login and enter your credentials.

- To register a new account, go to https://book-tg75.onrender.com/register and fill out the registration form.

- To update your account information, go to https://book-tg75.onrender.com/update and enter your updated information.

- To add a new book, go to https://book-tg75.onrender.com/form and fill out the book information form.

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
