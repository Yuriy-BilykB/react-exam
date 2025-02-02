import {createBrowserRouter} from "react-router-dom";
import AuthUserPage from "../pages/AuthUserPage.tsx";
import MainLayout from "../pages/MainLayout.tsx";
import UsersPage from "../pages/UsersPage.tsx";
import RecipesPage from "../pages/RecipesPage.tsx";
import UserPage from "../pages/UserPage.tsx";
import RecipePage from "../pages/RecipePage.tsx";
export const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>,
        children: [
            {path: '/authentication', element: <AuthUserPage/>},
            {path: '/users', element: <UsersPage/>},
            {path: '/recipes', element: <RecipesPage/>},
            {path: "/user/:id", element: <UserPage/>},
            { path: "/recipe/:id", element: <RecipePage/> }
        ]
    }

])