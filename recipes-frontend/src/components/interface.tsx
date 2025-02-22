export default interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strArea: string;
  strInstructions: string;
  [key: string]: string | null; // Для інгредієнтів
}
