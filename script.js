const fetchRecipeData = async () => {
    try{
        const response = await fetch("https://www.themealdb.com/api.php")
        if(!response.ok){
            throw new Error('recipe not found')
        }
    }
}