import axiosInstance from "../utils/axiosInstance";

const collectionService = {
    createCollection: async (collectionData) => {
        try {
            const response = await axiosInstance.post('/collections', collectionData)
            return response.data
        } catch (error) {
            console.error('Failed to create collection:', error.response?.data || error.message);
            throw error;
        }
    },
    updateCollection: async (collectionId, collectionData) => {
        try {
            const response = await axiosInstance.put(`/collections/${collectionId}`, {name: collectionData})
            return response.data
        } catch (error) {
            console.error(`Failed to update collection with ID ${collectionId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    deleteCollection: async (collectionId) => {
        try {
            await axiosInstance.delete(`/collections/${collectionId}`)
        } catch (error) {
            console.error(`Failed to delete collection with ID ${collectionId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getCollectionById: async (collectionId) => {
        try {
            const response = await axiosInstance.get(`/collections/${collectionId}`)
            return response.data
        } catch (error) {
            console.error(`Failed to fetch collection with ID ${collectionId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getAllCollections: async () => {
        try {
            const response = await axiosInstance.get('/collections')
            return response.data
        } catch (error) {
            console.error('Failed to fetch all collections:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default collectionService;