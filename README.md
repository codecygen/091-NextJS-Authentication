# NextJS Authentication
- **next-auth** package is used for this project for authentication.
- **bcrypt** package is used for this project for encryption of passwords.

# Environmental Variable:
This environmental variable has to be set for authentication.

Options
Environment Variables
NEXTAUTH_URL
When deploying to production, set the NEXTAUTH_URL environment variable to the canonical URL of your site.

NEXTAUTH_URL=https://example.com

If your Next.js application uses a custom base path, specify the route to the API endpoint in full. More information about the usage of custom base path here.

# How it Works - Next-Auth
I am using **next-auth**, v4 for this project.

## Front End
### Front End - Sign in
- **Signing in:** **./components/auth/auth-form.js** is the front end of the app. This component file uses "next-auth" client library to sign the user in.
- **Enable Using useSession Hook:** In order useSession hook to work, we need to wrap **./pages/_app.js** file with **SessionProvider**  'next-auth/react' component. This will be useful for the upcoming sections.
- **Not Rendering Links If Unauthenticated:** Once login happens sessions has to be kept in the form of JWT. This is accomplished by using **./components/layout/main-navigation.js** file. This component is used in **./components/layout/layout.js** so the navigation section is pretty much the fixed component in every page. We will use the **useSesssion** hook of the "next-auth/client" library. **useSesssion** will control **const { data: session, status } = useSession();** session data which then can be used to render various links such as "Login", "Profile" and "Logout" buttons in the same page.
- **Client Side Declining Access to Pages:** In order to authenticate access to individual pages, for example **./pages/user-info.js**, we can use **const { data: session, status } = useSession();** on that page to render whether we have or don't have the session token. We have to also do this to prevent people to type manually to access the link.
- **Server Side Declining Access to Pages (getServerSideProps):** Page **./pages/password.js** is used for this example. The method is getSession.
- **Server Side Declining Access to Auth Form if Signed In:** Check **./pages/auth.js** for detail. The method is getSession.
- **Server Side Declining Access to Password Change:** Check **./pages/user/change-password.js**. The method is getSession.
- **Signing Out:** Signout functionality is also controlled by **./components/layout/main-navigation.js** file.
- **Password Changing:** The **./components/profile/profile-form.js** is the file that we can change password. The entered password then hoisted to **./components/profile/user-profile.js**.

## Back End
### Back End - Sign Up
- **./pages/api/auth/signup.js** checks the validity of the credentials to sign up. If the username and password are valid, requests connection to the database and save it to database. It uses **./lib/db.js** for database connection and **./lib/auth.js** for password hashing and it uses "bcrypt" library.
- **./pages/api/auth/[...nextauth].js**. This file is used to check if the signing in user typed the correct email and password. It is connected to **./components/auth/auth-form.js**. signIn method in the front end directly connects to the [...nextauth].js because both front end and back end uses "credentials" as a parameter to access both credentials.email and credentials.password on the backend. **IMPORTANT NOTE::::** Make sure the location of [...nextauth].js is always under "/api/auth/". Otherwise it will give an error. Refer to [this project](https://github.com/codecygen/083-NextJS-Blog-Website) for more information about [...nextauth].js file. In this project, there are methods to force **session** to have more info in it.
- **./pages/api/user/change-password.js** is used to change the password of the authenticated user.

### Back End - Sign in
- **./lib/auth.js** file's "verifyPassword" function is used in **./pages/api/auth/[...nextauth].js**.