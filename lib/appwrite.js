import { Account, Avatars, Databases, ID } from 'react-native-appwrite';
import { Client } from 'react-native-appwrite';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'js.master.hongsonit',
    projectId: '66b6d9e4003a17f976b1',
    databaseId: '66b6dccd0037bd4be937',
    userCollectionId: '66b6dce4000473a7c7d7',
    videoCollectionId: '66b6dd06003745b3d7b3',
    storageId: '66b6e00d001f3296704e'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) // Your config Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        const avatarUrl = await avatars.getInitials(username);
        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId, 
            config.userCollectionId,
            ID.unique(),
            {
                id: newAccount.$id,
                username,
                email,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
    }
}