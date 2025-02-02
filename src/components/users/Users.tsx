import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {userSliceActions} from "../../redux/slices/users/usersSlice.tsx";
import {IUser} from "../../models/IUser.ts";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const {users, page, total, user} = useAppSelector(({usersSlice}) => usersSlice);
    const dispatch = useAppDispatch();
    const [userId, setUserId] = useState<string | null>(null);
    const [searchName, setSearchName] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);
    const navigate = useNavigate();
    const limit = 30;

    const handleSearch = () => {

        const trimmedSearch = searchName.trim().toLowerCase();

        if (!trimmedSearch) {
            setFilteredUsers(users);
            return;
        }

        if (!isNaN(Number(trimmedSearch))) {
            setUserId(trimmedSearch);
            dispatch(userSliceActions.loadUser(trimmedSearch));
        } else {
            dispatch(userSliceActions.searchUsers(trimmedSearch));
        }
    };

    useEffect(() => {
        if (userId) {
            if (user) {
                setFilteredUsers([user]);
            } else {
                setFilteredUsers([]);
            }
        } else {
            setFilteredUsers(users);
        }
    }, [userId, user, users]);


    useEffect(() => {
        dispatch(userSliceActions.paginateUsers(page))
    }, [page, dispatch]);


    useEffect(() => {
        if (searchName.trim() === '') {
            setUserId(null);
            dispatch(userSliceActions.paginateUsers(0));
        }
    }, [searchName, dispatch]);


    const handleNextPage = () => {
        dispatch(userSliceActions.setPage(page + 1));
        if (searchName.trim()) {
            dispatch(userSliceActions.searchUsers(searchName));
        } else {
            dispatch(userSliceActions.paginateUsers(page + 1));
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            dispatch(userSliceActions.setPage(page - 1));
            if (searchName.trim()) {
                dispatch(userSliceActions.searchUsers(searchName));
            } else {
                dispatch(userSliceActions.paginateUsers(page - 1));
            }
        }
    };


    const handleUserClick = (id: number) => {
        setUserId(id.toString());
        navigate(`/user/${id}`);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
            <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700">Enter Name or ID</label>
                <div className="flex mt-2">
                    <input
                        value={searchName}
                        type="text"
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500"
                        placeholder="Search by name or ID"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-teal-600 text-white px-6 py-3 rounded-r-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    >
                        Find
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div
                            key={user.id}
                            className="flex items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <img
                                src={user.image || 'https://via.placeholder.com/40'}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            <div>
                                <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-gray-600">{user.age} years old</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No users found</p>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={(page + 1) * limit >= total}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Users;
