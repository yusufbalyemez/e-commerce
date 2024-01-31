import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";
import {isAdmin}  from "../config/isAdmin";



//Eğer pathname de /admin yazılıysa Layout değişkenine AdminLayout'u at değilse MainLayout. (Nice idea)
export const Layout = isAdmin ? AdminLayout : MainLayout;