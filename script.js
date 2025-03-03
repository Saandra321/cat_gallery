const API_KEY = 'live_4cQ9GTnYNYg99sTGURgbJSvMYbuAYB4q4wWZOXupvlCE9rLHXn0eVWOpTn1Sa0pL';  // Get it from https://thecatapi.com/
const BASE_URL = 'https://api.thecatapi.com/v1/images/search?limit=6';
const BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const breedSelect = document.getElementById("breedSelect");

// Fetch breeds and populate dropdown
async function loadBreeds() {
    const response = await fetch(BREEDS_URL, {
        headers: { "x-api-key": API_KEY }
    });
    const breeds = await response.json();

    breeds.forEach(breed => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
    });
}

// Fetch cat images
async function loadCats(breed = '') {
    let url = BASE_URL;
    if (breed) url += `&breed_ids=${breed}`;

    const response = await fetch(url, {
        headers: { "x-api-key": API_KEY }
    });
    const data = await response.json();

    gallery.innerHTML = ''; // Clear previous images
    data.forEach(cat => {
        const img = document.createElement("img");
        img.src = cat.url;
        gallery.appendChild(img);
    });
}

// Load images on startup
loadBreeds();
loadCats();

// Load more button
loadMoreBtn.addEventListener("click", () => {
    loadCats(breedSelect.value);
});

// Filter by breed
breedSelect.addEventListener("change", () => {
    loadCats(breedSelect.value);
});
