import { useAppSelector } from "../../redux/hooks/useAppSelector.ts";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch.ts";
import { useState, useEffect } from "react";
import { recipesSliceActions } from "../../redux/slices/recipes/recipesSlice.ts";
import { IRecipe } from "../../models/IRecipe.ts";
import { useNavigate } from "react-router-dom";
const Recipes = () => {
    const { recipes, page, total } = useAppSelector(({ recipesSlice }) => recipesSlice);
    const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>(recipes);
    const [searchName, setSearchName] = useState('');
    const limit = 30;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipesSliceActions.loadRecipes(page))
    }, [page]);


    useEffect(() => {
        setFilteredRecipes(recipes);
    }, [recipes]);

    const handleNextPage = () => {
        if ((page + 1) * limit < total) {
            dispatch(recipesSliceActions.setPage(page + 1));
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            dispatch(recipesSliceActions.setPage(page - 1));
        }
    };

    const handleSearch = () => {
        if (searchName.trim() === '') {
            setFilteredRecipes(recipes);
        } else {
            setFilteredRecipes(
                recipes.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchName.toLowerCase())
                )
            );
        }
    };

    const handleRecipeClick = (id: number) => {
        navigate(`/recipe/${id}`);
    };
    const handleTagClick = (tag: string) => {
        dispatch(recipesSliceActions.fetchRecipesByTag(tag));
    };
    return (
        <div className="space-y-6">
            <div className="flex space-x-2">
                <input
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="p-2 rounded border border-gray-300 w-1/2"
                    placeholder="Search for a recipe"
                />
                <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">Search</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="border p-4 rounded shadow-md hover:shadow-lg transition-all">
                            <p onClick={() => handleRecipeClick(recipe.id)} className="font-semibold text-lg cursor-pointer">{recipe.name}</p>
                            <ul className="mt-2">
                                {recipe.tags.map(tag => (
                                    <li key={tag} className="inline-block bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded-full m-1 cursor-pointer hover:bg-blue-200" onClick={() => handleTagClick(tag)}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>
            <div className="flex justify-between mt-6">
                <button onClick={handlePrevPage} disabled={page === 0} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all disabled:opacity-50">Previous</button>
                <button onClick={handleNextPage} disabled={(page + 1) * limit >= total} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-all disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};

export default Recipes;
