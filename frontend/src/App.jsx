import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layout/MainLayout";
import SinglePostPage from "./pages/SinglePostPage";
import Write from "./pages/Write";
import PostListPage from "./pages/PostListPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<SinglePostPage />} />
          <Route path="/posts" element={<PostListPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/write" element={<Write />} />

          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}
