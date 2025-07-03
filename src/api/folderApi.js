let mockFolders = []

export const folderApi = {
    fetchFolders: () => {
        console.log("Fetch folder")
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockFolders])
            }, 500)
        })
    },
    createFolder: ({ name, isPublic }) => {
        console.log("Create new folder")
        return new Promise((resolve) => {
            setTimeout(() => {
                const newFolder = {
                    id: `folder_${new Date().getTime()}`,
                    name: name,
                    isPublic: isPublic,
                    createAt: new Date().toISOString(),
                }
                mockFolders.push(newFolder)
                resolve(newFolder)
            }, 500)
        })
    },
    updateFolder: (folderData) => {
        console.log('Update folder')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("I dunno: ", folderData)
                
                const index = mockFolders.findIndex(f => f.id === folderData.id)
                console.log("CHeck index: ", index)
                if (index > -1) {
                    console.log("Index here: ", index)
                    mockFolders[index] = { ...mockFolders[index], ...folderData }
                    resolve(mockFolders[index])
                } else {
                    reject(new Error('Update failed'))
                }
                console.log("Check folder list: ", mockFolders)
            }, 500)
        })
    },
    deleteFolder: (folderId) => {
        console.log('Delete folder')
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("I dunno 2: ", folderId)
                mockFolders = mockFolders.filter(f => f.id !== folderId)
                resolve({ success: true, id: folderId })
            }, 500)
        })
    }
}