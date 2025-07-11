const getCollections = () => JSON.parse(localStorage.getItem('mockCollections')) || []
const saveCollections = (collections) => {
    localStorage.setItem('mockCollections', JSON.stringify(collections))
}

const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'))

export const collectionApi = {
    fetchCollections: () => {
        console.log("Fetch collection")
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentUser = getCurrentUser()
                const collections = getCollections();
                const myCollections = collections.filter(c => c.ownerId === currentUser.id)
                resolve(myCollections);
            }, 500)
        })
    },
    createCollection: ({ name, ownerId }) => {

        return new Promise((resolve) => {
            setTimeout(() => {
                const collections = getCollections()
                const newCollection = {
                    id: `collection_${new Date().getTime()}`,
                    name: name,
                    createAt: new Date().toISOString(),
                    ownerId: ownerId,
                }
                const newCollections = [...collections, newCollection];
                saveCollections(newCollections); // Lưu lại mảng mới
                resolve(newCollection);
            }, 500)
        })
    },
    updateCollection: (collectionData) => {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currentUser = getCurrentUser()
                let collections = getCollections(); // Luôn lấy dữ liệu mới nhất
                const targetCollection = collections.find(c => c.id === collectionData.id)

                if (!targetCollection || targetCollection.ownerId !== currentUser.id) {
                    return reject(new Error("Không phải của mày, không được sửa."));
                }

                const updatedCollections = collections.map(c => c.id === collectionData.id ? { ...c, name: collectionData.name } : c)
                saveCollections(updatedCollections)
                resolve(updatedCollections.find(c => c.id === collectionData.id))
            }, 500)
        })
    },
    deleteCollection: (collectionId) => {
        console.log('Delete collection')
        return new Promise((resolve) => {
            setTimeout(() => {
                const currentUser = getCurrentUser();
                if (!currentUser) return reject(new Error("Mày chưa đăng nhập."));

                const collections = getCollections();
                const targetCollection = collections.find(c => c.id === collectionId);

                // Chỉ chủ sở hữu mới được xóa
                if (!targetCollection || targetCollection.ownerId !== currentUser.id) {
                    return reject(new Error("Không phải của mày, không được xóa."));
                }

                const newCollections = collections.filter(c => c.id !== collectionId);
                saveCollections(newCollections);
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