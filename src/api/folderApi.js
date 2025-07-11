const BOSS_ID = 'user-boss-001';
const ADMIN_ID = 'user-admin-002';
const USER1_ID = 'user-normal-003';
const USER2_ID = 'user-normal-004';

const getFolders = () => JSON.parse(localStorage.getItem('mockFolders')) || [
    // Thêm một vài thư mục mẫu có sẵn với chủ sở hữu
    // { id: 'folder_1', name: 'Tài liệu Marketing', isPublic: true, createdAt: new Date().toISOString(), ownerId: BOSS_ID },
    // { id: 'folder_2', name: 'Báo cáo cá nhân', isPublic: false, createdAt: new Date().toISOString(), ownerId: BOSS_ID },
    // { id: 'folder_3', name: 'Dự án bí mật', isPublic: false, createdAt: new Date().toISOString(), ownerId: BOSS_ID },
    // { id: 'folder_4', name: 'Ảnh du lịch', isPublic: true, createdAt: new Date().toISOString(), ownerId: BOSS_ID },
];
// Hàm tiện ích để lưu dữ liệu
const saveFolders = (folders) => {
    localStorage.setItem('mockFolders', JSON.stringify(folders));
};
const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'))

export const folderApi = {
    fetchFolders: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentUser = getCurrentUser()
                if (!currentUser) {
                    return resolve([])
                }
                const allFolders = getFolders();
                const visibleFolders = currentUser.role === 'boss'
                    ? allFolders
                    : allFolders.filter(folder => folder.isPublic || folder.ownerId === currentUser.id)
                resolve(visibleFolders)
            }, 200);
        });
    },
    createFolder: ({ name, isPublic, ownerId }) => {
        console.log("API: Creating new folder with ownerId: ", ownerId);
        return new Promise((resolve) => {
            setTimeout(() => {
                const folders = getFolders();
                const newFolder = {
                    id: `folder_${new Date().getTime()}`,
                    name: name,
                    isPublic: isPublic,
                    createdAt: new Date().toISOString(),
                    ownerId: ownerId,
                };
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
                const currentUser = getCurrentUser()
                let folders = getFolders();
                const targetFolder = folders.find(f => f.id === folderData.id);

                if (!targetFolder || targetFolder.ownerId !== currentUser.id) {
                    return reject(new Error('Không phải chủ, không có quyền sửa.'));
                }

                const updatedFolders = folders.map(f => f.id === folderData.id ? { ...f, ...folderData } : f);
                saveFolders(updatedFolders);
                resolve(updatedFolders.find(f => f.id === folderData.id));
            }, 200);
        });
    },
    deleteFolder: (folderId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentUser = getCurrentUser()
                let folders = getFolders();
                const targetFolder = folders.find(f => f.id === folderId)
                if (!targetFolder || targetFolder.ownerId !== currentUser.id) {
                    return reject(new Error('Không phải chủ, không có quyền xóa.'));
                }

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
