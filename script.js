document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#searchForm');
    const searchInput = document.querySelector('#search');
    const resultsList = document.querySelector('#results');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchRecipes();
    });

    async function searchRecipes() {
        const searchValue = searchInput.value.trim();
        if (searchValue === '') return; // Avoid making a request with an empty search

        try {
            const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            displayRecipes(data.hits);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            resultsList.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
        }
    }

    function displayRecipes(recipes) {
        let html = '';
        recipes.forEach((recipe) => {
            html += `
            <div>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <ul>
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div> 
            `;
        });
        resultsList.innerHTML = html;
    }
});
