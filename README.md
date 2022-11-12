# NextJS Authentication
- **next-auth** package is used for this project for authentication.
- **bcrypt** package is used for this project for encryption of passwords.

# How it Works

## Front End
### Front End - Sign in
- **./components/auth/auth-form.js** is the front end of the app. This component file uses "next-auth" client library to sign the user in.
- Once login happens sessions has to be kept in the form of JWT. This is accomplished by using **./components/layout/main-navigation.js** file. This component is used in **./components/layout/layout.js** so the navigation section is pretty much the fixed compoenent in every page. We will use the **useSesssion** hook of the "next-auth/client" library. **useSesssion** will control **const { data: session, status } = useSession();** session data which then can be used to render various links such as "Login", "Profile" and "Logout" buttons in the same page.
- In order useSession hook to work, we need to wrap **./pages/_app.js** file with **SessionProvider**  'next-auth/react' component.
- Signout functionality is also controlled by **./components/layout/main-navigation.js** file.

## Back End
### Back End - Sign Up
- **./pages/api/auth/signup.js** checks the validity of the credentials to sign up. If the username and password are valid, requests connection to the database and save it to database. It uses **./lib/db.js** for database connection and **./lib/auth.js** for password hashing and it uses "bcrypt" library.
- **./pages/api/auth/signup.js** will also have **./pages/api/auth/[...nextauth].js**. This file is used to check if the user that you are currently signing up is already registered in the database thus it will act as a mediator (a configuration file) to sign the user in. It uses "next-auth" library.

### Back End - Sign in
- **./lib/auth.js** file's "verifyPassword" function is used in **./pages/api/auth/[...nextauth].js**.