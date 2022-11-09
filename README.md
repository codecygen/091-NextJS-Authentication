# NextJS Authentication
- **next-auth** package is used for this project for authentication.
- **bcrypt** package is used for this project for encryption of passwords.

# How it Works
- **./components/auth/auth-form.js** is the front end of the app. This component file uses "next-auth" client library to sign the user in.
- **./pages/api/auth/signup.js** checks the validity of the credentials to sign up. If the username and password are valid, requests connection to the database and save it to database. It uses **./lib/db.js** for database connection and **./lib/auth.js** for password hashing and it uses "bcrypt" library.
- **./pages/api/auth/signup.js** will also have **./pages/api/auth/[...nextauth].js**. This file is used to check if the user that you are currently signing up is already registered in the database and it uses "next-auth" library. **./pages/api/auth/[...nextauth].js** is used in **./lib/auth.js** as a function "verifyPassword".