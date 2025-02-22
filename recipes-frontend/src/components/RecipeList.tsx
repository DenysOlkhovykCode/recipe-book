import { useState, useEffect } from "react";
import Recipe from "./interface";
import axios from "axios";

const RecipeList = ({
  recipes,
  SetAPI_URL,
}: {
  recipes: Recipe[];
  SetAPI_URL: (url: string) => void;
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [recipesinCategory, setRecipesinCategory] = useState<Recipe[]>([]);
  const [header, setHeader] = useState<string>("Recipes");
  useEffect(() => {
    if (recipes.length > 0 && isSelected) {
      makeListByCategory();
    }
  }, [recipes, isSelected]);

  if (!recipes.length) return <div className="no-recipes">Loading ... </div>;

  const showMoreInfo = (recipe: Recipe) => {
    SetAPI_URL(`http://localhost:5000/recipe/${recipe.idMeal}`);
    setHeader("Information about " + recipe.strMeal);
    setIsSelected(true);
  };

  const filterByCountry = (country: string) => {
    SetAPI_URL(`http://localhost:5000/recipes/country/${country}`);
    setHeader("Recipes by " + country);
    setIsSelected(false);
  };

  const makeListByCategory = () => {
    axios
      .get(`http://localhost:5000/recipes/category/${recipes[0].strCategory}`)
      .then((res) => setRecipesinCategory(res.data.meals || []));
  };

  const filterByIngredient = (ingredient: string) => {
    SetAPI_URL(`http://localhost:5000/recipes/ingredient/${ingredient}`);
    setHeader("Recipes by " + ingredient);
    setIsSelected(false);
  };

  const goBack = () => {
    SetAPI_URL("http://localhost:5000/");
    setHeader("Recipes");
    setIsSelected(false);
  };

  const ingredients = Object.keys(recipes[0])
    .filter((key) => key.startsWith("strIngredient") && recipes[0][key])
    .map((key) => ({
      name: (recipes[0][key] as string) || "",
    }));

  return (
    <div>
      <h1>{header}</h1>
      <div className="recipe-list-container">
        {!isSelected ? (
          <div className="recipe-list">
            {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="recipe-item">
                <h3>{recipe.strMeal}</h3>
                <button onClick={() => showMoreInfo(recipe)}>More Info</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="recipe-info-container">
            <div className="recipe-info">
              <img src={recipes[0].strMealThumb} alt="recipe" className="recipe-img" />
              <h3>{recipes[0].strMeal}</h3>
              <button onClick={() => filterByCountry(recipes[0].strArea)} className="filter-btn">
                {recipes[0].strArea}
              </button>
              <p>{recipes[0].strInstructions}</p>
              <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                  <button
                    key={index}
                    onClick={() => filterByIngredient(ingredient.name)}
                    className="ingredient-btn"
                  >
                    {ingredient.name}
                  </button>
                ))}
              </ul>
              <button onClick={goBack} className="back-btn">
                Go Back
              </button>
            </div>
            <aside className="recipe-sidebar">
              <h4>More in {recipes[0].strCategory}</h4>
              <ul>
                {recipesinCategory.map((recipe) => (
                  <li key={recipe.idMeal}>
                    <button onClick={() => showMoreInfo(recipe)}>{recipe.strMeal}</button>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
