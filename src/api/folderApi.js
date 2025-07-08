// Hàm tiện ích để đọc dữ liệu một cách an toàn
const getFolders = () => JSON.parse(localStorage.getItem('mockFolders')) || [];

// Hàm tiện ích để lưu dữ liệu
const saveFolders = (folders) => {
    localStorage.setItem('mockFolders', JSON.stringify(folders));
};

export const folderApi = {
    fetchFolders: () => {
        console.log("API: Reading folders directly from localStorage...");
        return new Promise((resolve) => {
            setTimeout(() => {
                const folders = getFolders();
                resolve(folders);
            }, 200);
        });
    },
    createFolder: ({ name, isPublic }) => {
        console.log("API: Creating new folder...");
        return new Promise((resolve) => {
            setTimeout(() => {
                const folders = getFolders();
                const newFolder = {
                    id: `folder_${new Date().getTime()}`,
                    name: name,
                    isPublic: isPublic,
                    createdAt: new Date().toISOString(),
                };
                // <-- THAY ĐỔI: Tạo một mảng mới chứa tất cả folder cũ và folder mới
                const newFolders = [...folders, newFolder];
                saveFolders(newFolders); // Lưu lại mảng mới
                resolve(newFolder);
            }, 200);
        });
    },
    updateFolder: (folderData) => {
        console.log('API: Updating folder...');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let folders = getFolders();
                const index = folders.findIndex(f => f.id === folderData.id);
                if (index > -1) {
                    // <-- THAY ĐỔI: Dùng map() để tạo một mảng mới, không sửa trực tiếp
                    const updatedFolders = folders.map(folder =>
                        folder.id === folderData.id
                            ? { ...folder, ...folderData }
                            : folder
                    );
                    saveFolders(updatedFolders); // Lưu lại mảng mới
                    resolve(updatedFolders.find(f => f.id === folderData.id));
                } else {
                    reject(new Error('Update failed: Folder not found'));
                }
            }, 200);
        });
    },
    deleteFolder: (folderId) => {
        console.log('API: Deleting folder...');
        return new Promise((resolve) => {
            setTimeout(() => {
                let folders = getFolders();
                const newFolders = folders.filter(f => f.id !== folderId);
                saveFolders(newFolders); // Lưu lại mảng mới
                resolve({ success: true, id: folderId });
            }, 200);
        });
    },
    fetchFolderDetails: (folderId) => {
        console.log(`API: Fetching details for FOLDER ID: ${folderId}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const folders = getFolders();
                const folder = folders.find(f => f.id === folderId);
                resolve(folder || null);
            }, 200);
        });
    }
};
