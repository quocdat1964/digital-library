import axiosInstance from "../utils/axiosInstance";

const fileService = {
    createFile: async (fileData) => {
        try {
            const response = await axiosInstance.post('/files', fileData)
            return response.data
        } catch (error) {
            console.error('Failed to create file metadata:', error.response?.data || error.message);
            throw error;
        }
    },
    updateFile: async (fileId, fileData) => {
        try {
            const response = await axiosInstance.put(`/files/${fileId}`, fileData)
            return response.data
        } catch (error) {
            console.error(`Failed to update file metadata with ID ${fileId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    deleteFile: async (fileId) => {
        try {
            await axiosInstance.delete(`/files/${fileId}`)
        } catch (error) {
            console.error(`Failed to delete file with ID ${fileId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getFileById: async (fileId) => {
        try {
            const response = await axiosInstance.get(`/files/${fileId}`)
            return response.data
        } catch (error) {
            console.error(`Failed to fetch file with ID ${fileId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getAllFiles: async () => {
        try {
            const response = await axiosInstance.get('/files')
            return response.data
        } catch (error) {
            console.error('Failed to fetch all files:', error.response?.data || error.message);
            throw error;
        }
    },
    getFilesByUploader: async (uploaderId) => {
        try {
            const response = await axiosInstance.get(`/files/uploader/${uploaderId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch files by uploader ID ${uploaderId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getFilesByFolder: async (folderId) => {
        try {
            const response = await axiosInstance.get(`/files/folder/${folderId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch files by folder ID ${folderId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    addFileToCollection: async (fileId, collectionId) => {
        try {
            const response = await axiosInstance.post(`/files/${fileId}/addToCollection/${collectionId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to add file ${fileId} to collection ${collectionId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    getFilesInCollection: async (collectionId) => {
        try {
            const response = await axiosInstance.get(`/files/collection/${collectionId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch files in collection ${collectionId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    removeFileFromCollection: async (fileId, collectionId) => {
        try {
            await axiosInstance.delete(`/files/${fileId}/removeFromCollection/${collectionId}`);
        } catch (error) {
            console.error(`Failed to remove file ${fileId} from collection ${collectionId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    uploadFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file)

            const response = await axiosInstance.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Failed to upload file:', error.response?.data || error.message);
            throw error;
        }
    },
    // downloadFile: async (fileName) => {
    //     try {
    //         const response = await axiosInstance.get(`/files/download/${fileName}`, {
    //             responseType: 'blob'
    //         });

    //         // Lấy content-type từ header để giữ đúng định dạng
    //         const contentType = response.headers['content-type'] || 'application/octet-stream';
    //         const blob = new Blob([response.data], { type: contentType });
    //         const url = window.URL.createObjectURL(blob);

    //         // Tạo tên file mặc định
    //         let originalFileName = fileName;

    //         // Lấy tên file từ Content-Disposition (nếu có)
    //         const contentDisposition = response.headers['content-disposition'];
    //         if (contentDisposition) {
    //             const utf8FilenameRegex = /filename\*=(?:UTF-8'')?([^;]+)/i;
    //             const asciiFilenameRegex = /filename="([^"]+)"/i;

    //             let match = contentDisposition.match(utf8FilenameRegex);
    //             if (match && match[1]) {
    //                 originalFileName = decodeURIComponent(match[1]);
    //             } else {
    //                 match = contentDisposition.match(asciiFilenameRegex);
    //                 if (match && match[1]) {
    //                     originalFileName = match[1];
    //                 }
    //             }
    //         }

    //         // Tạo thẻ a để tải file
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', originalFileName);
    //         document.body.appendChild(link);
    //         link.click();

    //         // Dọn dẹp
    //         link.remove();
    //         window.URL.revokeObjectURL(url);

    //         return "File download initiated";
    //     } catch (error) {
    //         console.error(`Failed to download file ${fileName}:`, error.response?.data || error.message);
    //         throw error;
    //     }
    // },

    downloadFile: async (fileName, customName) => {
        try {
            const response = await axiosInstance.get(`/files/download/${fileName}`, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;

            // Nếu có customName thì dùng, không thì lấy từ Content-Disposition
            let downloadName = customName || fileName;
            const contentDisposition = response.headers['content-disposition'];
            if (!customName && contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match && match.length > 1) {
                    downloadName = match[1];
                }
            }

            link.setAttribute('download', downloadName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            return "File download initiated";
        } catch (error) {
            console.error(`Failed to download file ${fileName}:`, error.response?.data || error.message);
            throw error;
        }
    },
    viewFile: async (storagePath, fileType) => {
        try {
            const response = await axiosInstance.get(`/files/name/${storagePath}`, {
                responseType: 'blob'
            })

            if (response.data) {
                const url = window.URL.createObjectURL(response.data)
                return url
            } else {
                throw new Error('No file data received')
            }

        } catch (error) {
            console.error(`Failed to view file ${storagePath}:`, error.response?.data || error.message);
            throw error;
        }
    },
    uploadAndSaveFile: async (formData) => {
        try {
            const response = await axiosInstance.post('/files/upload-and-save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            return response.data
        } catch (error) {
            console.error('Failed to upload and save file:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default fileService;