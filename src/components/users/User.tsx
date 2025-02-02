import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { userSliceActions } from "../../redux/slices/users/usersSlice.tsx";
import { recipesSliceActions } from "../../redux/slices/recipes/recipesSlice.ts";

const User = () => {
    const { user, loadState: userLoading } = useAppSelector(({ usersSlice }) => usersSlice);
    const { recipes, loadState: recipesLoading } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(userSliceActions.loadUser(id));
            dispatch(recipesSliceActions.loadRecipesUser(id));
        }
    }, [id, dispatch]);

    const handleRecipeClick = (recipeId: number) => {
        navigate(`/recipe/${recipeId}`);
    };

    if (userLoading || recipesLoading) return <div className="text-center p-8">Loading...</div>;
    if (!user) return <div className="text-center p-8 text-red-600">User not found</div>;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="text-center mb-6">
                <img
                    src={user.image || 'https://via.placeholder.com/150'}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-semibold">{user.firstName} {user.lastName}</h2>
                <p className="text-lg text-gray-600">Age: {user.age}</p>
                <p className="text-sm text-gray-500">{user.gender} | Born: {user.birthDate}</p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Recipes:</h3>
            {recipes.length > 0 ? (
                <ul className="space-y-2">
                    {recipes.map(recipe => (
                        <li
                            key={recipe.id}
                            onClick={() => handleRecipeClick(recipe.id)}
                            className="cursor-pointer text-teal-600 hover:text-teal-800 transition-colors"
                        >
                            {recipe.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No recipes found for this user.</p>
            )}
        </div>
    );
};

export default User;
