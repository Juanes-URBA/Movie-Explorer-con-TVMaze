import { save, load } from "./storage.js";

export function addFavorite(id){
  let favs = load("favorites").map(Number);

  if(!favs.includes(Number(id))){
    favs.push(Number(id));
    save("favorites", favs);
  }
}

export function removeFavorite(id){
  let favs = load("favorites")
    .map(Number)
    .filter(f => f !== Number(id));

  save("favorites", favs);
}

export function getFavorites(){
  return load("favorites").map(Number);
}