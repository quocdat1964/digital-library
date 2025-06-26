import testImg from '../assets/avt_nqd.jpg'
import testPdf from '../assets/2022_MT_KHMT.pdf'
// const mockFiles = [
//     { id: '1', name: '2022_MT_KHMT', type: 'pdf', createdAt: '2025-06-23T10:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=PDF+Preview' },
//     { id: '2', name: 'tailoc', type: 'jpg', createdAt: '2025-06-23T11:30:00Z', thumbnailUrl: 'https://placehold.co/100x100/2d2c35/FFF?text=Meo+Anh' },
//     { id: '3', name: 'baocao_final', type: 'word', createdAt: '2025-06-20T15:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Word+Doc' },
//     { id: '4', name: 'logo-cong-ty', type: 'png', createdAt: '2025-06-25T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Logo.png' },
//     { id: '5', name: 'Hehe', type: 'png', createdAt: '2025-06-24T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Hehe' },
//     { id: '6', name: 'Hoho', type: 'svg', createdAt: '2025-06-25T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Hoho' },
//     { id: '7', name: 'Huhu', type: 'jpg', createdAt: '2025-06-22T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Huhu' },
//     { id: '8', name: 'Hihi', type: 'pdf', createdAt: '2025-06-21T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Hihi' },
//     { id: '9', name: 'Haha', type: 'word', createdAt: '2025-06-20T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=Haha' },
//     { id: '10', name: 'I dunno', type: 'png', createdAt: '2025-06-19T09:00:00Z', thumbnailUrl: 'https://placehold.co/100x100/393844/FFF?text=I dunno' },
// ]

// const mockFileDetails = {
//     '1': { id: '1', title: 'Báo cáo môn KHMT', description: 'Đây là file báo cáo môn học...', author: 'Nguyễn Văn A', uploader: 'Nguyễn Quốc Đạt', downloadCount: 5, storageLocation: '3', collection: 'Báo cáo', status: 'On resource', tags: ['báo cáo', 'khmt'], type: 'pdf', name: '2022_MT_KHMT', createdAt: '2025-06-24T15:21:57Z', contentUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
//     '2': { id: '2', title: '', description: '', author: '', uploader: 'Nguyễn Quốc Đạt', downloadCount: 10, storageLocation: '1', collection: null, status: 'On resource', tags: [], type: 'jpg', name: 'tailoc', createdAt: '2025-06-23T11:30:00Z', contentUrl: 'https://placehold.co/1280x720/2d2c35/FFF?text=Ảnh+chi+tiết+của+mèo' },
//     '5': { id: '5', title: 'Video giới thiệu', description: 'Video giới thiệu sản phẩm mới', author: 'Team Marketing', uploader: 'Nguyễn Quốc Đạt', downloadCount: 10, storageLocation: '1', collection: null, status: 'On resource', tags: [], type: 'mp4', name: 'intro-video', createdAt: '2025-06-19T11:30:00Z', contentUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
// };

const mockFiles = [
  { id: '1', name: '2022_MT_KHMT', type: 'pdf', createdAt: '2025-06-23T10:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/393844/FFF?text=Báo+cáo' },
  { id: '2', name: 'tailoc_meo_anh', type: 'jpg', createdAt: '2025-06-23T11:30:00Z', thumbnailUrl: 'https://placehold.co/400x300/2d2c35/FFF?text=Ảnh+mèo' },
  { id: '3', name: 'hop_dong_lao_dong', type: 'word', createdAt: '2025-06-20T15:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/393844/FFF?text=Hợp+đồng' },
  { id: '4', name: 'logo_cong_ty', type: 'png', createdAt: '2025-06-25T09:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/2d2c35/FFF?text=Logo.png' },
  { id: '5', name: 'video_gioi_thieu', type: 'mp4', createdAt: '2025-06-19T09:00:00Z', thumbnailUrl: 'https://placehold.co/400x300/393844/FFF?text=Video.mp4' },
];

// // --- Dữ liệu chi tiết giả lập (Đã bổ sung và sửa lỗi) ---
const mockFileDetails = {
    '1': { 
        id: '1', title: 'Báo cáo môn Kiến trúc máy tính', description: 'Đây là file báo cáo cuối kỳ môn học...', author: 'Nguyễn Văn A', uploader: 'Nguyễn Quốc Đạt', downloadCount: 5, storageLocation: '3', collection: 'Báo cáo', status: 'On resource', tags: ['báo cáo', 'khmt'], type: 'pdf', name: '2022_MT_KHMT', createdAt: '2025-06-24T15:21:57Z', 
        // Bước 2: Sử dụng URL của file PDF thật đã import
        contentUrl: testPdf
    },
    '2': { 
        id: '2', title: '', description: '', author: '', uploader: 'Nguyễn Quốc Đạt', downloadCount: 10, storageLocation: '1', collection: null, status: 'On resource', tags: [], type: 'jpg', name: 'tailoc_meo_anh', createdAt: '2025-06-23T11:30:00Z', 
        contentUrl: 'https://placehold.co/1280x720/2d2c35/FFF?text=Ảnh+chi+tiết+của+mèo' 
    },
    // Bổ sung dữ liệu chi tiết cho file ID '3'
    '3': { 
        id: '3', title: 'Hợp đồng lao động mẫu', description: '', author: 'Phòng nhân sự', uploader: 'Nguyễn Quốc Đạt', downloadCount: 2, storageLocation: '1', collection: 'Tài liệu', status: 'On resource', tags: [], type: 'word', name: 'hop_dong_lao_dong', createdAt: '2025-06-20T15:00:00Z', 
        contentUrl: '' // Word không có xem trước nên để trống
    },
    // Bổ sung dữ liệu chi tiết cho file ID '4'
    '4': { 
        id: '4', title: 'Logo công ty chính thức', description: 'Logo dạng PNG nền trong suốt.', author: 'Team Design', uploader: 'Nguyễn Quốc Đạt', downloadCount: 20, storageLocation: '2', collection: 'Tài sản', status: 'On resource', tags: ['logo', 'brand'], type: 'png', name: 'logo_cong_ty', createdAt: '2025-06-25T09:00:00Z', 
        contentUrl: 'https://placehold.co/1280x720/2d2c35/FFF?text=Logo+công+ty'
    },
    '5': { 
        id: '5', title: 'Video giới thiệu sản phẩm', description: 'Video giới thiệu sản phẩm mới ra mắt.', author: 'Team Marketing', uploader: 'Nguyễn Quốc Đạt', downloadCount: 15, storageLocation: '1', collection: null, status: 'On resource', tags: [], type: 'mp4', name: 'video_gioi_thieu', createdAt: '2025-06-19T11:30:00Z', 
        contentUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' 
    },
};

export const fileApi = {
    fetchFiles: () => {
        console.log("Fake api")
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('API: Files fetched successfully');
                resolve(mockFiles);
            }, 1000); // 1.5 giây
        });
    },
    fetchFileDetails: (fileId)=>{
        console.log(`API: Fetching details for file ID: ${fileId}`);
        return new Promise((resolve)=>{
            setTimeout(()=>{
                const details = mockFileDetails[fileId] || null
                console.log('API: Details fetched:', details);
                resolve(details)
            }, 500)
        })
    },
    updateFileDetails: (fileData)=>{
        console.log('API: Updating file with data:', fileData);
        return new Promise((resolve)=>{
            setTimeout(()=>{
                mockFileDetails[fileData.id] = {...mockFileDetails[fileData.id], ...fileData}
                console.log('API: File updated successfully');
                resolve(mockFileDetails[fileData.id])
            }, 800)
        })
    }
}