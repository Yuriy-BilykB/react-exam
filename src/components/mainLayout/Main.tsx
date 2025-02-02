import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useEffect, useState} from "react";
import MainMenu from "../menu/MainMenu.tsx";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, loadingAuth } = useAppSelector(state => state.authSlice);
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (!isAuthenticated){
            navigate('')
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!user && !loadingAuth) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    }, [user, loadingAuth]);

    if (loadingAuth) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
            <div className="bg-gray-50 min-h-screen flex flex-col relative">
                {isAuthenticated && user && (
                    <div className="absolute top-3 right-10">
                        <img
                            src={user.image}
                            alt="User Avatar"
                            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                        />
                    </div>
                )}

                <MainMenu/>

                <hr className="my-4"/>
                <div className="flex-grow p-4">
                    <Outlet/>
                </div>
                {showAlert && !isAuthenticated && (
                    <>
                        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
                        <div
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-4 rounded-lg shadow-xl z-20 text-center animate__animated animate__fadeIn animate__delay-1s">
                            <h3 className="text-2xl font-semibold">Please log in!</h3>
                            <p className="mt-2">To access the features, you need to log in first.</p>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="mt-4 bg-white text-red-600 px-4 py-2 rounded hover:bg-red-200 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
    );
};

export default Main;