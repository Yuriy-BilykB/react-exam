import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { useEffect } from "react";
import { recipesSliceActions } from "../../redux/slices/recipes/recipesSlice.ts";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
    const { recipe, loadState: recipeLoading } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(recipesSliceActions.loadRecipe(id));
        }
    }, [id, dispatch]);

    if (recipeLoading) return <div className="text-center p-8 text-xl">Loading...</div>;
    if (!recipe) return <div className="text-center p-8 text-xl text-red-600">Recipe not found</div>;

    const handleUserClick = (userId: number) => {
        navigate(`/user/${userId}`);
    };

    return (
        <div className="space-y-6 p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="text-center">
                <h2 className="text-4xl font-semibold text-blue-600">{recipe.name}</h2>
                <p className="text-xl text-gray-500">{recipe.servings} servings</p>
            </div>

            <div className="mt-6">
                <h3 className="text-2xl font-medium text-gray-700">Ingredients:</h3>
                <ul className="list-disc ml-6 space-y-2 text-gray-600">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="hover:text-blue-500 transition-colors">{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h3 className="text-2xl font-medium text-gray-700">Instructions:</h3>
                <p className="text-gray-600">{recipe.instructions}</p>
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => handleUserClick(recipe.userId)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                    View Author
                </button>
            </div>
        </div>
    );
};

export default Recipe;
