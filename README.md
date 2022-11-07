# NextJS Authentication
- **next-auth** package is used for this project for authentication.
- **bycrypt** package is used for this project for encryption of passwords.

# How it Works
- **./pages/api/auth/signup.js** checks the validity of the credentials to sign up. If the username and password are valid, requests connection to the database and save it to database. It uses **./lib/db.js** for database connection and **./lib/auth.js** for password hashing.
- **./pages/api/auth/signup.js** will also have **./pages/api/auth/[...nextauth].js**