//fetching the data based on the searched keyword 
const meals = (name) => {
    console.log(name);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => response.json())
    .then(data => handleMeals(data))
    .catch(error => {
        noResult();
    });
}

//showing all the fetched data, showing the search result
const handleMeals = (data) => {
    {
        data.meals.forEach(meals => {
            console.log(meals.strMeal);
            const mealsDiv = document.getElementById("meals");
            const mealDiv = document.createElement("div");
            mealDiv.className = "meal";
            //created an anchor tag to make the mealDiv clickable
            const clickContainer = document.createElement("a");
            clickContainer.className = "clickMeal"
            const mealInfo = `
                <h3>${meals.strMeal}</h3>
                <img src = "${meals.strMealThumb}">
            `;
            mealDiv.innerHTML = mealInfo;
            clickContainer.appendChild(mealDiv)
            mealsDiv.appendChild(clickContainer);
            clickContainer.addEventListener("click", function(){
                getTheDetails(meals.strMeal);
            })
        });
    }
}

//showing the meal details on top of the page
function getTheDetails(detail) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${detail}`)
    .then(response => response.json())
    .then(data => {
        const mealInfo = data.meals[0];
        document.getElementById("mealDetail").innerHTML = `
        <img src = "${mealInfo.strMealThumb}">
        <h3>${mealInfo.strMeal}</h3>
        <h5>Ingredients</h5>
        <li>${mealInfo.strIngredient1}</li>
        <li>${mealInfo.strIngredient2}</li>
        <li>${mealInfo.strIngredient3}</li>
        <li>${mealInfo.strIngredient4}</li>
        <li>${mealInfo.strIngredient5}</li>
        <li>${mealInfo.strIngredient6}</li>
        <li>${mealInfo.strIngredient7}</li>
        `;
        
    });
}

function noResult() {
    const noResult = document.createElement("div");
    noResult.className = "error";
    noResult.innerHTML = `
    <h2>Error 404 no result found</h2>
    `;
    const mealDetails = document.getElementById("mealDetail");
    mealDetails.appendChild(noResult);
}

//getting value from the search input
document.getElementById("searchButton").addEventListener("click", function(){
    const keyword = document.getElementById("search").value; 
    meals(keyword);
})

// after searching a food you need to refresh the page to search again, I can console log the data 2nd time but can't show the result. 
//sorry for the awful design :(



