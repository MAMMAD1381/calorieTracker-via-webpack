class Storage{
    static getCalorieLimit(){
        let limit
        if(window.localStorage.getItem('calorieLimit') === null){
            limit = 0
        }
        else {
            limit = window.localStorage.getItem('calorieLimit')
        }
        return limit
    }

    static setCalorieLimit(limit){
        window.localStorage.setItem('calorieLimit', limit+'')
    }

    static getTotalCalories(){
        return this.getConsumed() - this.getBurned()
    }

    static saveMeal(meal){
        let meals = this.getMeals()
        meals.push(meal)
        this.setConsumed(Number(meal.calorie))
        window.localStorage.setItem('meals', JSON.stringify(meals))
    }

    static removeMeal(id){
        let meals = Storage.getMeals()
        let temp = []
        for (let meal of meals) {

            if (meal.id !== id) {
                temp.push(meal)
            }
            else{
                this.setConsumed(-Number(meal.calorie))
            }
        }
        meals = temp
        window.localStorage.setItem('meals', JSON.stringify(meals))
    }

    static saveWorkout(workout){
        let workouts = this.getWorkouts()
        workouts.push(workout)
        this.setBurned(Number(workout.calorie))
        window.localStorage.setItem('workouts', JSON.stringify(workouts))
    }

    static removeWorkout(id){
        let workouts = Storage.getWorkouts()
        let temp = []
        for (let workout of workouts) {
            if (workout.id !== id) {
                temp.push(workout)
            }
            else{
                this.setBurned(-Number(workout.calorie))
            }
        }
        workouts = temp
        window.localStorage.setItem('workouts', JSON.stringify(workouts))
    }

    static getMeals(){
        let meals = JSON.parse(window.localStorage.getItem('meals'))
        if (meals === null)
            meals = []
        return meals
    }

    static getWorkouts(){
        let workouts = JSON.parse(window.localStorage.getItem('workouts'))
        if (workouts === null)
            workouts = []
        return workouts
    }

    static setConsumed(calorie){
        let totalConsumed = this.getConsumed()
        totalConsumed += calorie
        window.localStorage.setItem('consumed', totalConsumed)
    }

    static getConsumed(){
        let meals = this.getMeals()
        let totalConsumed = 0
        meals.forEach(meal => {
            totalConsumed += Number(meal.calorie)
        })
        if(meals.length === 0)
            totalConsumed = 0
        window.localStorage.setItem('consumed', totalConsumed)
        return totalConsumed
    }

    static setBurned(calorie){
        let totalBurned = this.getBurned()
        totalBurned += calorie
        window.localStorage.setItem('burned', totalBurned)
    }

    static getBurned(){
        let workouts = this.getWorkouts()
        let totalBurned = 0
        workouts.forEach(workout => {
            totalBurned += Number(workout.calorie)
        })
        if (workouts.length === 0)
            totalBurned = 0
        window.localStorage.setItem('burned', totalBurned)
        return totalBurned
    }

    static clearAll(){
        window.localStorage.clear()
    }
}

export default Storage