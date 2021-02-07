//fetching the data based on the searched keyword 
const meals = (name) => {
    console.log(name);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => response.json())
    .then(data => handleMeals(data));
}

//showing all the fetched data actually showing the search result
const handleMeals = (data) => {
    {
        data.meals.forEach(meals => {
            console.log(meals.strMeal);
            const mealsDiv = document.getElementById("meals");
            const mealDiv = document.createElement("div");
            mealDiv.className = "meal";
            const mealInfo = `
                <h3>${meals.strMeal}</h3>
                <img src = "${meals.strMealThumb}">
                <button onclick='getTheDetails("${meals.strMeal}")'>See more details</button>
            `;
            mealDiv.innerHTML = mealInfo;
            mealsDiv.appendChild(mealDiv);
        });
    }
}

//showing the meal details on top of the page
function getTheDetails(detail) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${detail}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("mealDetail").innerHTML = `
        <img src = "${data.meals[0].strMealThumb}">
        <h3>${data.meals[0].strMeal}</h3>
        <h5>Ingredients</h5>
        <li>${data.meals[0].strIngredient1}</li>
        <li>${data.meals[0].strIngredient2}</li>
        <li>${data.meals[0].strIngredient3}</li>
        <li>${data.meals[0].strIngredient4}</li>
        <li>${data.meals[0].strIngredient5}</li>
        <li>${data.meals[0].strIngredient6}</li>
        <li>${data.meals[0].strIngredient7}</li>
        `
    });
}

//getting value from the search input
document.getElementById("searchButton").addEventListener("click", function(){
    const keyword = document.getElementById("search").value; 
    meals(keyword);
})




