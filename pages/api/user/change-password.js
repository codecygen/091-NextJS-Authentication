import { getSession } from 'next-auth/react';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import connectDatabase from '../../../lib/db';

const passwordChangeHandler = async (req, res) => {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not Authenticated to Change Password!' });
        return;
    }

    // This gets info from session cookie.
    const userEmail = session.user.email;
    const enteredOldPassword = req.body.oldPassword;
    const enteredNewPassword = req.body.newPassword;

    const client = await connectDatabase();
    const db = client.db();
    const usersCollection = db.collection('users');
    const foundUser = await usersCollection.findOne({ email: userEmail });

    if (!foundUser) {
        res.status(404).json({ message: 'User Not Found to Change Password!' });
        client.close();
        return;
    }

    const databaseOldHashedPassword = foundUser.password;

    const isPasswordValid = await verifyPassword(enteredOldPassword, databaseOldHashedPassword);

    if (!isPasswordValid) {
        res.status(403).json({ message: "Your Old Password Don't Match for Password Change Operation!"});
        client.close();
        return;
    }

    const hashOfEnteredNewPassword = await hashPassword(enteredNewPassword);

    const result = await usersCollection.updateOne(
        { email: userEmail }, 
        { $set: { password: hashOfEnteredNewPassword } }
    );

    client.close();
    res.status(200).json({ message: 'Password Updated!' });
};

export default passwordChangeHandler;