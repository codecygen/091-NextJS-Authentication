import connectDatabase from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const userCreationHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({ message: 'Invalid input - password should be at least 7 characters.' })
        return;
    }

    const client = await connectDatabase();

    const db = client.db();

    const hashedPassword = await hashPassword(password);

    const usersCollection = db.collection('users');

    const result = await usersCollection.insertOne({
        email,
        password: hashedPassword
    });

    res.status(201).json({ message: 'Created new user!' });
};

export default userCreationHandler;