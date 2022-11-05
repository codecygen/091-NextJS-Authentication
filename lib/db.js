import { MongoClient } from 'mongodb';

const connectDatabase = async () => {
    const mongoAtlasLink = process.env.MONGODB_ATLAS_LINK;

    const client = await MongoClient.connect(mongoAtlasLink);

    return client;
};

export default connectDatabase;