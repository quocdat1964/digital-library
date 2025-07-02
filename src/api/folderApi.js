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
    }
}