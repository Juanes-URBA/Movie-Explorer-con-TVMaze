import { addFavorite, removeFavorite, getFavorites } from "./persistance.js";
import { getShowById } from "./service.js";

export function renderShows(shows){
    const container = document.getElementById("cards");
    if(!container) return;

    const favorites = getFavorites();

    container.innerHTML = "";

    shows.forEach(show => {
    const isFav = favorites.includes(show.id);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${show.image?.medium || ''}">
        
        <div class="card-info">
            <div>
            <h3>${show.name}</h3>
            <p class="meta">
                🎭 ${show.genres[0] || "N/A"} | ⭐ ${show.rating.average || "N/A"}
            </p>
            </div>

            <button class="fav-btn ${isFav ? "active" : ""}">
            ${isFav ? "❤️" : "🤍"}
            </button>
        </div>
    `;

    card.addEventListener("click", () => {
        window.location.href = `show.html?id=${show.id}`;
    });

    // 👉 FAVORITO
    const btn = card.querySelector(".fav-btn");

    btn.addEventListener("click", (e) => {
        e.stopPropagation();

        if(isFav){
        removeFavorite(show.id);
        } else {
            addFavorite(show.id);
        }

        btn.classList.toggle("active");
        btn.textContent = btn.classList.contains("active") ? "❤️" : "🤍";
    });

    container.appendChild(card);
    });
}

export function renderShowDetail(show){
    const container = document.getElementById("detail");
    if(!container) return;

    const favorites = getFavorites();
    let isFav = favorites.includes(show.id);

    container.innerHTML = `
        <div class="detail-card">
        <img src="${show.image?.original || ''}">

        <div class="info">
            <h1>${show.name}</h1>
            <p><strong>Géneros:</strong> ${show.genres.join(", ")}</p>
            <p><strong>⭐ Rating:</strong> ${show.rating.average || "N/A"}</p>
            <p><strong>Idioma:</strong> ${show.language}</p>
            <p><strong>Estado:</strong> ${show.status}</p>
            <p><strong>Estreno:</strong> ${show.premiered}</p>

            <div class="summary">
            ${show.summary || "Sin descripción"}
            </div>

            <button id="favBtn" class="${isFav ? "active" : ""}">
            ${isFav ? "❤️" : "🤍"}
            </button>
        </div>
        </div>
    `;

    const btn = document.getElementById("favBtn");

    btn.addEventListener("click", () => {

        if(isFav){
        removeFavorite(show.id);
        } else {
        addFavorite(show.id);
        }

        isFav = !isFav;

        btn.classList.toggle("active");
        btn.textContent = isFav ? "❤️" : "🤍";
    });
}

export async function renderFavorites(ids){
    const container = document.getElementById("favorites");
    if(!container) return;

    container.innerHTML = "";

    for (let id of ids){
        const show = await getShowById(id);

        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
        <img src="${show.image?.medium}">
        <h3>${show.name}</h3>
        <a href="show.html?id=${show.id}">Ver</a>
        <button class="fav-btn active">❤️</button>
        `;

        div.querySelector("button")
        .addEventListener("click", () => {
            removeFavorite(show.id);
            renderFavorites(ids.filter(i => i !== show.id));
        });
        container.appendChild(div);
    }
}