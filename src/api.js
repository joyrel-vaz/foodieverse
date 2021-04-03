export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());
export const getRecipes = () => fetch("/api/recipes").then(res => res.json());

export function createShop(user){
    const data = { userID: user };
    console.log("in createshop API")
    fetch("/api/createShop",{ method: 'POST', headers: {'Content-Type':'application/json',}, body: JSON.stringify(data),}).then(res => console.log(res));
}