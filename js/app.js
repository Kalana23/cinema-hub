// Step 1: The Data Arrays (Movies and TV Shows)
const movies = [
    { id: 1, title: "Oppenheimer", year: 2023, rating: 8.9, genre: "Drama", badge: "trending", type: "movie", image: "images/oppenheimer.jpg" },
    { id: 2, title: "Barbie", year: 2023, rating: 7.0, genre: "Comedy", badge: "new", type: "movie", image: "images/barbie.jpg" },
    { id: 3, title: "Spider-Man", year: 2023, rating: 8.7, genre: "Action", badge: "trending", type: "movie", image: "images/spiderman.jpg" },
    { id: 4, title: "Killers of the Flower Moon", year: 2023, rating: 7.7, genre: "Drama", badge: null, type: "movie", image: "images/killers-of-the-flower-moon.jpg" },
    { id: 5, title: "Poor Things", year: 2023, rating: 8.4, genre: "Comedy", badge: "new", type: "movie", image: "images/poor-things.jpg" },
    { id: 6, title: "Past Lives", year: 2023, rating: 8.0, genre: "Romance", badge: null, type: "movie", image: "images/past-lives.jpg" },
    { id: 7, title: "Anatomy of a Fall", year: 2023, rating: 7.8, genre: "Thriller", badge: "top", type: "movie", image: "images/anatomy-of-a-fall.jpg" },
    { id: 8, title: "The Holdovers", year: 2023, rating: 8.0, genre: "Comedy", badge: null, type: "movie", image: "images/the-holdovers.jpg" },
    // Tasks 1 & 3: Added 3 more movies including "classic" badges for pre-2000 films
    { id: 9, title: "The Matrix", year: 1999, rating: 8.7, genre: "Sci-Fi", badge: "classic", type: "movie", image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
    { id: 10, title: "Jurassic Park", year: 1993, rating: 8.2, genre: "Adventure", badge: "classic", type: "movie", image: "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg" },
    { id: 11, title: "Gladiator", year: 2000, rating: 8.5, genre: "Action", badge: "top", type: "movie", image: "images/gladiator-2.jpg" }
];

const tvShows = [
    { id: 101, title: "Breaking Bad", year: 2008, rating: 9.5, genre: "Crime", badge: "top", type: "tv", image: "TV_Shows/breaking-bad.jpg" },
    { id: 102, title: "Game of Thrones", year: 2011, rating: 9.2, genre: "Fantasy", badge: "trending", type: "tv", image: "TV_Shows/game-of-thrones.jpg" },
    { id: 103, title: "Stranger Things", year: 2016, rating: 8.7, genre: "Sci-Fi", badge: null, type: "tv", image: "TV_Shows/stranger-things.jpg" },
    { id: 104, title: "The Last of Us", year: 2023, rating: 8.8, genre: "Drama", badge: "new", type: "tv", image: "TV_Shows/the-last-of-us.jpg" },
    { id: 105, title: "Succession", year: 2018, rating: 8.9, genre: "Drama", badge: "top", type: "tv", image: "TV_Shows/succession.jpg" },
    { id: 106, title: "The Bear", year: 2022, rating: 8.6, genre: "Comedy", badge: "trending", type: "tv", image: "TV_Shows/the-bear.jpg" },
    { id: 107, title: "Ted Lasso", year: 2020, rating: 8.8, genre: "Comedy", badge: null, type: "tv", image: "TV_Shows/ted-lasso.jpg" }
];

// Step 2 & Task 2: getRatingClass - Updated high threshold from 8.0 to 8.5
function getRatingClass(rating) {
    if (rating >= 8.5) {
        return "high";   
    } else if (rating >= 6.0) {
        return "mid";    
    } else {
        return "low";    
    }
}

// Step 3 & Task 3: getBadgeHTML - Added the "classic" badge case
function getBadgeHTML(badge) {
    const badgeStyles = "position: absolute; top: 10px; right: 25px; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; pointer-events: none;";
    switch (badge) {
        case "trending":
            return `<span style="${badgeStyles} background: #e50914; color: white;">Trending</span>`;
        case "new":
            return `<span style="${badgeStyles} background: #3498db; color: white;">New</span>`;
        case "top":
            return `<span style="${badgeStyles} background: #f1c40f; color: black;">Top 10</span>`;
        case "classic":
            return `<span style="${badgeStyles} background: #95a5a6; color: white;">Classic</span>`;
        default:
            return ""; 
    }
}

// Step 4: createCardHTML - Renders badge over the movie/show image
function createCardHTML(item) {
    const ratingClass = getRatingClass(item.rating);
    const badgeHTML = getBadgeHTML(item.badge);
    const linkPage = item.type === 'tv' ? 'breaking-bad-info.html' : 'dune-info.html';

    return `
    <div style="position: relative; display: inline-block;">
        <img src="${item.image}" alt="${item.title}" class="row-poster" onclick="window.location.href='${linkPage}'">
        ${badgeHTML}
    </div>
    `;
}

// Step 5 & Task 4: renderCards - Uses a "while" loop instead of a "for" loop
function renderCards(dataArray, targetId) {
    const container = document.getElementById(targetId);
    if (!container) return; 

    let allCardsHTML = "";
    
    // Task 4: while loop implementation
    let i = 0; 
    while (i < dataArray.length) {
        allCardsHTML += createCardHTML(dataArray[i]);
        i++;
    }

    container.innerHTML = allCardsHTML;
}

// Step 6 & Task 5: Page detection & Homepage challenge
const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "index.html" || currentPage === "") {
    // Task 5: Homepage challenge - Filtering movies with ratings higher than 8.0 using a while loop
    const highRatedMovies = [];
    let i = 0;
    while (i < movies.length) {
        if (movies[i].rating > 8.0) {
            highRatedMovies.push(movies[i]);
        }
        i++;
    }
    renderCards(highRatedMovies, "trending-movies-grid");
}

if (currentPage === "tv-shows.html") {
    renderCards(tvShows, "tvshows-grid");
}