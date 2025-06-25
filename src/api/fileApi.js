const mockFiles = [
    { id: '1', name: '2022_MT_KHMT', type: 'pdf', createdAt: '2025-06-23T10:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=PDF+Preview' },
    { id: '2', name: 'tailoc', type: 'jpg', createdAt: '2025-06-23T11:30:00Z', thumbnailUrl: 'https://placehold.co/100x100/2d2c35/FFF?text=Meo+Anh' },
    { id: '3', name: 'baocao_final', type: 'word', createdAt: '2025-06-20T15:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Word+Doc' },
    { id: '4', name: 'logo-cong-ty', type: 'png', createdAt: '2025-06-25T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Logo.png' },
    { id: '5', name: 'Hehe', type: 'png', createdAt: '2025-06-24T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Hehe' },
    { id: '6', name: 'Hoho', type: 'svg', createdAt: '2025-06-25T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Hoho' },
    { id: '7', name: 'Huhu', type: 'jpg', createdAt: '2025-06-22T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Huhu' },
    { id: '8', name: 'Hihi', type: 'pdf', createdAt: '2025-06-21T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Hihi' },
    { id: '9', name: 'Haha', type: 'word', createdAt: '2025-06-20T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Haha' },
    { id: '10', name: 'I dunno', type: 'png', createdAt: '2025-06-19T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=I dunno' },
]

export const fileApi = {
    fetchFiles: () => {
        console.log("Fake api")
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('API: Files fetched successfully');
                resolve(mockFiles);
            }, 1000); // 1.5 giây
        });
    }
}