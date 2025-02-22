import { useEffect, useState } from "react";
import axios from "axios";

import RecipeList from "./components/RecipeList";
import Recipe from "./components/interface";

function App() {
  const [API_URL, SetAPI_URL] = useState<string>("http://localhost:5000/");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    axios.get(API_URL).then((res) => setRecipes(res.data.meals || []));
  }, [API_URL]);

  return <RecipeList recipes={recipes} SetAPI_URL={SetAPI_URL} />;
}

export default App;
