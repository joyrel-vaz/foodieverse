export const getRemedies = () => fetch("/api/home-remedies").then(res => res.json());
export const getRecipes = () => fetch("/api/recipes").then(res => res.json());

export function createShop(user){
    const data = { userID: user };
    console.log("in createshop API")
    fetch("/api/createShop",{ method: 'POST', headers: {'Content-Type':'application/json',}, body: JSON.stringify(data),}).then(res => console.log(res));
}

export function getShopList(user){
    console.log("in getshop API")
    return fetch("/api/userShopList/"+user).then(res => res.json());
}

export function addShopList(user,item){
    console.log("in updateshop add API")
    return fetch("/api/userShopList/add/"+user+"/"+item).then(res => res.json());
}

export function delShopList(user,item){
    console.log("in updateshop del API")
    return fetch("/api/userShopList/del/"+user+"/"+item).then(res => res.json());
}