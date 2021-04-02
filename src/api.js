export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());
export const getRecipes = () => fetch("/api/recipes").then(res => res.json());