const form = document.getElementById("search-form");
const recipeList = document.getElementById("recipe-list");
if (form) {
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const meal = formData.get("meal");
		const data = await fetchRecipeData(meal);
		if (recipeList && data) {
			recipeList.innerHTML = "";
			data.forEach((recipe) => {
				const item = document.createElement("li");
				const link = document.createElement("a");
				const img = document.createElement("img");
				const span = document.createElement("span");
				img.src = recipe["strMealThumb"];
				img.alt = recipe["strMeal"];
				span.textContent = recipe["strMeal"];

				item.classList.add("recipe-card");

				link.appendChild(img);
				link.appendChild(span);
				link.href = `Recipe-list.html?id=${recipe["idMeal"]}`;

				item.appendChild(link);
				recipeList.appendChild(item);
			});
		}
	});
}

const fetchRecipeData = async (meal) => {
	try {
		const response = await fetch(
			"https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal
		);
		if (!response.ok) {
			throw new Error("recipe not found");
		}
		const data = await response.json();
		return data.meals;
	} catch {
		alert("error fetching meal");
		return [];
	}
};
