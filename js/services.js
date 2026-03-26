// URL base de la API
const URL = "https://api.tvmaze.com";

// Trae todas las series
export async function getShows(){
    const res = await fetch(`${URL}/shows`);
    return await res.json();
}
// Busca series por texto
export async function searchShows(query){
    const res = await fetch(`${URL}/search/shows?q=${query}`);
    return await res.json();
}
// Trae una serie por ID
export async function getShowById(id){
    const res = await fetch(`${URL}/shows/${id}`);
    return await res.json();
}