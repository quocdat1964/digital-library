import axiosInstance from "../utils/axiosInstance";

const folderService = {
    createFolder: async (folderData) => {
        try {
            const response = await axiosInstance.post('/folders', folderData)
            return response.data
        } catch (error) {
            console.error('Failed to create folder:', error.response?.data || error.message);
            throw error;
        }
    },
    updateFolder: async (folderId, folderData) => {
        try {
            const response = await axiosInstance.put(`/folders/${folderId}`, folderData)
            return response.data
        } catch (error) {
            console.error(`Failed to update folder with ID ${folderId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    deleteFolder: async (folderId) => {
        try {
            console.log("Checkkkkk: ",`/folders/${folderId}`)
            await axiosInstance.delete(`/folders/${folderId}`)
        } catch (error) {
            console.error(`Failed to delete folder with ID ${folderId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getFolderById: async (folderId) => {
        try {
            const response = await axiosInstance.get(`/folders/${folderId}`)
            return response.data
        } catch (error) {
            console.error(`Failed to fetch folder with ID ${folderId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getAllFolders: async () => {
        try {
            const response = await axiosInstance.get('/folders')
            return response.data
        } catch (error) {
            console.error('Failed to fetch all folders:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default folderService;