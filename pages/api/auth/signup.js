import connectDatabase from "../../../lib/db";

const userCreationHandler = async (req, res) => {
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

    const usersCollection = db.collection('users');

    await usersCollection.insertOne({
        email,
        data
    });
};

export default userCreationHandler;