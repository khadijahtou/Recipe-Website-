const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

document.addEventListener('DOMContentLoaded', async () => {
	const recipe = await fetchRecipeData(id)
	console.log(recipe)
	if (recipe) {
		const recipeNameEl = document.getElementById('recipe-name')
		if (recipeNameEl) {
			recipeNameEl.textContent = recipe['strMeal']
		}
		const recipeImgEl = document.getElementById('recipe-img')
		if (recipeImgEl) {
			recipeImgEl.src = recipe['strMealThumb']
			recipeImgEl.alt = recipe['strMeal']
		}
		const recipeIngredientsEl = document.getElementById('ingredient-list')
		if (recipeIngredientsEl) {
			const ingredients = getIngredients(recipe)
			ingredients.forEach((ingredient) => {
				const li = document.createElement('li')
				li.textContent = ingredient
				recipeIngredientsEl.appendChild(li)
			})
		}
		const recipeInstructionsEl = document.getElementById('recipe-intructions')
		if (recipeInstructionsEl) {
			recipeInstructionsEl.textContent = recipe['strInstructions']
		}

		const videoInstruction = document.getElementById('video-instruction')
		if (videoInstruction) {
			videoInstruction.href = recipe['strYoutube']
		}
	}
})

async function fetchRecipeData(id) {
	try {
		const res = await fetch(
			'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
		)
		const data = await res.json()
		return data.meals[0]
	} catch (error) {
		console.log('error fetching recipe')
		alert('Error fetching Recipe')
		return null
	}
}

function getIngredients(recipe) {
	const ingredients = []
	for (let i = 1; i <= 20; i++) {
		const ingredient = recipe[`strIngredient${i}`]
		const measure = recipe[`strMeasure${i}`]
		if (ingredient && ingredient.trim() !== '') {
			ingredients.push(`${measure} ${ingredient}`)
		}
	}
	return ingredients
}
