const mockFiles = [
    { id: '1', name: '2022_MT_KHMT', type: 'pdf', createdAt: '2025-06-23T10:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/393844/FFF?text=PDF+Preview' },
    { id: '2', name: 'tailoc', type: 'jpg', createdAt: '2025-06-23T11:30:00Z', thumbnailUrl: 'https://placehold.co/400x300/2d2c35/FFF?text=Meo+Anh' },
    { id: '3', name: 'baocao_final', type: 'word', createdAt: '2025-06-20T15:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/393844/FFF?text=Word+Doc' },
    { id: '4', name: 'logo-cong-ty', type: 'png', createdAt: '2025-06-25T09:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/393844/FFF?text=Logo.png' },
]

export const fileApi = {
    fetchFiles: () => {
        console.log("Fake api")
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('API: Files fetched successfully');
                resolve(mockFiles);
            }, 1500); // 1.5 giây
        });
    }
}