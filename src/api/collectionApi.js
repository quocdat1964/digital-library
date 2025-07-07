let mockCollections = JSON.parse(localStorage.getItem('mockCollections')) || []

const saveCollections = () => {
    localStorage.setItem('mockCollections', JSON.stringify(mockCollections))
}

export const collectionApi = {
    fetchCollections: () => {
        console.log("Fetch collection")
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockCollections])
            }, 500)
        })
    },
    createCollection: ({ name }) => {
        console.log("Create new collection")
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCollection = {
                    id: `collection_${new Date().getTime()}`,
                    name: name,
                    createAt: new Date().toISOString(),
                }
                mockCollections.push(newCollection)
                saveCollections()
                resolve(newCollection)
            }, 500)
        })
    },
    updateCollection: (collectionData) => {
        console.log('Update collection')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = mockCollections.findIndex(c => c.id === collectionData.id)
                console.log("CHeck index: ", index)
                if (index > -1) {
                    mockCollections = mockCollections.map(c =>
                        c.id === collectionData.id ? { ...c, name: collectionData.name } : c
                    );
                    saveCollections()
                    resolve(mockCollections.find(c => c.id === collectionData.id));
                } else {
                    reject(new Error("Không tìm thấy bộ sưu tập để cập nhật."));
                }

            }, 500)
        })
    },
    deleteCollection: (collectionId) => {
        console.log('Delete collection')
        return new Promise((resolve) => {
            setTimeout(() => {
                mockCollections = mockCollections.filter(c => c.id !== collectionId)
                saveCollections()
                resolve({ success: true, id: collectionId })
            }, 500)
        })
    },
    fetchCollectionDetails: (collectionId) => {
        console.log(`API: Fetching details for COLLECTION ID: ${collectionId}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const collections = getCollections(); // Giả sử có hàm này
                const collection = collections.find(c => c.id === collectionId);
                resolve(collection || null);
            }, 200);
        });
    },
}