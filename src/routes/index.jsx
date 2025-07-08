import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ArchivePage from "../pages/ArchivePage";
import UploadPage from "../pages/UploadPage";
import FolderDetailPage from "../pages/FolderDetailPage";
import CollectionDetailPage from "../pages/CollectionDetailPage";
import ProtectedRoute from "./ProtectedRoute";
import App from "../App";
import CollectionsPage from "../pages/CollectionsPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="archive" element={<ArchivePage />} />
                    <Route path="archive/:folderId" element={<FolderDetailPage />} />
                    <Route path="collections" element={<CollectionsPage />} />
                    <Route path="collections/:collectionId" element={<CollectionDetailPage />} />
                    <Route path="upload" element={<UploadPage />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRoutes