import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { loginUserActions } from "../../redux/slices/authorization/authSlice.ts";
import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
    type userDataType = {
        username: string,
        password: string
    };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(({ authSlice }) => authSlice);

    const [userData, setUserData] = useState<userDataType>({
        username: '',
        password: ''
    });
    const handleSaveData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSave = () => {
        dispatch(loginUserActions.loginUser(userData));
        setUserData({ username: '', password: '' });
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={userData.username}
                            onChange={handleSaveData}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleSaveData}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full p-3 mt-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthUser;
