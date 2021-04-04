
export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());

export const getRecipes = async (search) => {
    const url = `/api/recipes${search}`;
    const res = await fetch(url);
    return await res.json();

}

export function createShop(user){
    const data = { userID: user };
    console.log("in createshop API")
    fetch("/api/createShop",{ method: 'POST', headers: {'Content-Type':'application/json',}, body: JSON.stringify(data),}).then(res => console.log(res));
}

export function getShopList(user){
    console.log("in getshop API")
    return fetch("/api/userShopList/"+user).then(res => res.json());
}