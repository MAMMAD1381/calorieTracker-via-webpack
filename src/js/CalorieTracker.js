import Storage from "./Storage";
class CalorieTracker{
    constructor() {
    }

    addMeal(meal){
        Storage.saveMeal(meal)
        this._renderStats()
    }

    removeMeal(mealId){
        Storage.removeMeal(mealId)
        this._renderStats()
    }

    addWorkout(workout){
        Storage.saveWorkout(workout)
        this._renderStats()
    }

    removeWorkout(workoutId){
        Storage.removeWorkout(workoutId)
        this._renderStats()
    }

    resetDay(){
        Storage.clearAll()
        this._renderStats()
    }

    setLimit(value){
        Storage.setCalorieLimit(value)
        this._renderStats()
    }

    loadItems(){
        this._renderStats()
    }

    _displayCaloriesTotal(){
        let totalCalorie = Storage.getTotalCalories()
        let totalCalorieDiv = document.getElementById('calories-total')
        totalCalorieDiv.innerText = totalCalorie
        let parent = totalCalorieDiv.parentElement.parentElement
        if(Number(totalCalorie) < 0 && parent.classList.contains('bg-primary')){
            parent.classList.remove('bg-primary')
            parent.classList.add('bg-danger')
        }else if (Number(totalCalorie) >= 0 && parent.classList.contains('bg-danger')){
            parent.classList.remove('bg-danger')
            parent.classList.add('bg-primary')
        }
    }

    _displayCaloriesLimit(){
        let value = Storage.getCalorieLimit()
        document.getElementById('calories-limit').innerText = value
        document.getElementById('limit').setAttribute('placeholder', value)
    }

    _displayCaloriesConsumed(){
        document.getElementById('calories-consumed').innerText = Storage.getConsumed()
    }

    _displayCaloriesBurned(){
        document.getElementById('calories-burned').innerText = Storage.getBurned()
    }

    _displayCaloriesRemaining(){
        document.getElementById('calories-remaining').innerText = (Storage.getCalorieLimit() - Storage.getTotalCalories()).toString()
    }

    _displayNewMeal(term = ''){
        let meals = Storage.getMeals()
        meals = meals.filter(meal => {
            if(meal.name.match(term))
                return meal
        })
        const mealItems = document.getElementById('meal-items')
        mealItems.innerHTML = ''
        meals.forEach(meal => {
            let div = document.createElement('div');
            div.className = 'card my-2'
            div.setAttribute('meal-id', meal.id)
            div.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calorie}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            `
            mealItems.appendChild(div)
        })

    }

    _displayNewWorkout(term = ''){
        let workouts = Storage.getWorkouts()
        workouts = workouts.filter(workout => {
            if(workout.name.match(term))
                return workout
        })
        const workoutItems = document.getElementById('workout-items')
        workoutItems.innerHTML = ''
        workouts.forEach(workout => {
            let div = document.createElement('div');
            div.className = 'card my-2'
            div.setAttribute('workout-id', workout.id)
            div.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calorie}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            `
            workoutItems.appendChild(div)
        })

    }

    _displayProgressBar(){
        let totalCalorie = Storage.getTotalCalories()
        let limit = Storage.getCalorieLimit()
        let percentage = Math.floor((totalCalorie / limit) * 100)
        if (limit === 0) percentage = 0

        let progressBar = document.getElementById('calorie-progress')
        progressBar.style.width = `${percentage}%`
        if(percentage >= 100 && progressBar.classList.contains('bg-primary')){
            progressBar.classList.remove('bg-primary')
            progressBar.classList.add('bg-danger')
        }
        else if(percentage < 100 && percentage >= 0 && progressBar.classList.contains('bg-danger')){
            progressBar.classList.remove('bg-danger')
            progressBar.classList.add('bg-primary')
        }
    }

    _renderStats(){
        this._displayCaloriesTotal()
        this._displayCaloriesLimit()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
        this._displayNewMeal()
        this._displayNewWorkout()
        this._displayProgressBar()
    }
}

export default CalorieTracker