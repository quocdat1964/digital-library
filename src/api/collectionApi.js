const getCollections = () => JSON.parse(localStorage.getItem('mockCollections')) || []
const saveCollections = (collections) => {
    localStorage.setItem('mockCollections', JSON.stringify(collections))
}

export const collectionApi = {
    fetchCollections: () => {
        console.log("Fetch collection")
        return new Promise((resolve) => {
            setTimeout(() => {
                const collections = getCollections();
                resolve(collections);
            }, 500)
        })
    },
    createCollection: ({ name }) => {
        console.log("Create new collection")
        return new Promise((resolve) => {
            setTimeout(() => {
                const collections = getCollections()
                const newCollection = {
                    id: `collection_${new Date().getTime()}`,
                    name: name,
                    createAt: new Date().toISOString(),
                }
                const newCollections = [...collections, newCollection];
                saveCollections(newCollections); // Lưu lại mảng mới
                resolve(newCollection);
            }, 500)
        })
    },
    updateCollection: (collectionData) => {
        console.log('Update collection')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let collections = getCollections(); // Luôn lấy dữ liệu mới nhất
                const index = collections.findIndex(c => c.id === collectionData.id);
                if (index > -1) {
                    const updatedCollections = collections.map(c =>
                        c.id === collectionData.id ? { ...c, name: collectionData.name } : c
                    );
                    saveCollections(updatedCollections); // Lưu lại mảng mới
                    resolve(updatedCollections.find(c => c.id === collectionData.id));
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
                let collections = getCollections(); // Luôn lấy dữ liệu mới nhất
                const newCollections = collections.filter(c => c.id !== collectionId);
                saveCollections(newCollections); // Lưu lại mảng mới
                resolve({ success: true, id: collectionId });
            }, 500)
        })
    },
    fetchCollectionDetails: (collectionId) => {
        console.log(`API: Fetching details for COLLECTION ID: ${collectionId}`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const collections = getCollections();
                const collection = collections.find(c => c.id === collectionId);
                resolve(collection || null);
            }, 200);
        });
    },
}