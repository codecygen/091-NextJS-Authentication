# NextJS Authentication
- **next-auth** package is used for this project for authentication.
- **bcrypt** package is used for this project for encryption of passwords.

# How it Works - Next-Auth
I am using **next-auth**, v4 for this project.

## Front End
### Front End - Sign in
- **Signing in:** **./components/auth/auth-form.js** is the front end of the app. This component file uses "next-auth" client library to sign the user in.
- **Enable Using useSession Hook:** In order useSession hook to work, we need to wrap **./pages/_app.js** file with **SessionProvider**  'next-auth/react' component. This will be useful for the upcoming sections.
- **Not Rendering Links If Unauthenticated:** Once login happens sessions has to be kept in the form of JWT. This is accomplished by using **./components/layout/main-navigation.js** file. This component is used in **./components/layout/layout.js** so the navigation section is pretty much the fixed component in every page. We will use the **useSesssion** hook of the "next-auth/client" library. **useSesssion** will control **const { data: session, status } = useSession();** session data which then can be used to render various links such as "Login", "Profile" and "Logout" buttons in the same page.
- **Client Side Declining Access to Pages:** In order to authenticate access to individual pages, for example **./pages/profile.js**, we can use **const { data: session, status } = useSession();** on that page to render whether we have or don't have the session token. We have to also do this to prevent people to type manually to access the link.
- **Server Side Declining Access to Pages (getServerSideProps):** Page **./pages/profile2.js** is used for this example.
- **Declining Access to Auth Form if Signed In:** Check **./pages/auth.js** for detail.
- **Signing Out:** Signout functionality is also controlled by **./components/layout/main-navigation.js** file.

## Back End
### Back End - Sign Up
- **./pages/api/auth/signup.js** checks the validity of the credentials to sign up. If the username and password are valid, requests connection to the database and save it to database. It uses **./lib/db.js** for database connection and **./lib/auth.js** for password hashing and it uses "bcrypt" library.
- **./pages/api/auth/signup.js** will also have **./pages/api/auth/[...nextauth].js**. This file is used to check if the user that you are currently signing up is already registered in the database thus it will act as a mediator (a configuration file) to sign the user in. It uses "next-auth" library.

### Back End - Sign in
- **./lib/auth.js** file's "verifyPassword" function is used in **./pages/api/auth/[...nextauth].js**.