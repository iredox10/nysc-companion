// scripts/seed.js
const { Client, Databases, ID } = require('appwrite');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // You need to create a server-side API key

const databases = new Databases(client);

const states = [
    { name: 'Abia' }, { name: 'Adamawa' }, { name: 'Akwa Ibom' }, { name: 'Anambra' },
    { name: 'Bauchi' }, { name: 'Bayelsa' }, { name: 'Benue' }, { name: 'Borno' },
    { name: 'Cross River' }, { name: 'Delta' }, { name: 'Ebonyi' }, { name: 'Edo' },
    { name: 'Ekiti' }, { name: 'Enugu' }, { name: 'Gombe' }, { name: 'Imo' },
    { name: 'Jigawa' }, { name: 'Kaduna' }, { name: 'Kano' }, { name: 'Katsina' },
    { name: 'Kebbi' }, { name: 'Kogi' }, { name: 'Kwara' }, { name: 'Lagos' },
    { name: 'Nasarawa' }, { name: 'Niger' }, { name: 'Ogun' }, { name: 'Ondo' },
    { name: 'Osun' }, { name: 'Oyo' }, { name: 'Plateau' }, { name: 'Rivers' },
    { name: 'Sokoto' }, { name: 'Taraba' }, { name: 'Yobe' }, { name: 'Zamfara' },
    { name: 'FCT' }
];

const seedStates = async () => {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = 'states'; // Make sure this collection exists

    for (const state of states) {
        try {
            await databases.createDocument(databaseId, collectionId, ID.unique(), state);
            console.log(`Seeded ${state.name}`);
        } catch (error) {
            console.error(`Error seeding ${state.name}:`, error);
        }
    }
};

seedStates();
