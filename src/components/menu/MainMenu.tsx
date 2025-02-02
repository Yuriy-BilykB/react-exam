import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useNavigate} from "react-router-dom";
import {loginUserActions} from "../../redux/slices/authorization/authSlice.ts";
const MainMenu = () => {
    const { isAuthenticated } = useAppSelector(({ authSlice }) => authSlice);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(loginUserActions.logoutUser());
        navigate('/authentication');
    };
    return (
        <header className="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-5 shadow-2xl">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <nav className="flex space-x-8">
                        <Link
                            to="/"
                            className="text-lg hover:text-pink-400 transition-colors duration-300 px-3 py-2 rounded-lg"
                        >
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/users"
                                    className="text-lg hover:text-pink-400 transition-colors duration-300 px-3 py-2 rounded-lg"
                                >
                                    Users
                                </Link>
                                <Link
                                    to="/recipes"
                                    className="text-lg hover:text-pink-400 transition-colors duration-300 px-3 py-2 rounded-lg"
                                >
                                    Recipes
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/authentication"
                                className="text-lg hover:text-pink-400 transition-colors duration-300 px-3 py-2 rounded-lg"
                            >
                                Login
                            </Link>
                        )}
                    </nav>
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition-all ml-4"
                        >
                            Log Out
                        </button>
                    )}
                </div>
                <div className="text-3xl font-bold tracking-tight">
                    <Link to="/" className="text-white hover:text-pink-400 transition-all duration-500">
                        MyApp
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default MainMenu;
