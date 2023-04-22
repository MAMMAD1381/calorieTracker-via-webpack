import '@fortawesome/fontawesome-free/js/all'
import './css/bootstrap.css'
import './css/style.css'
import {Modal, Collapse} from "bootstrap";
import Meal from './js/Meal'
import Workout from "./js/Workout";
import CalorieTracker from "./js/CalorieTracker";


class App{
    constructor() {
        this.calorieTracker = new CalorieTracker()
        this.calorieTracker.loadItems()
        this._addEventListeners()   //adding event listeners
    }
    _newItem(e){
        e.preventDefault()
        let id = e.currentTarget.id
        if(id === 'meal-form'){
            const mealName = document.getElementById('meal-name').value
            const mealCalorie = document.getElementById('meal-calories').value
            if(mealName === '' || mealCalorie === ''){
                alert(`you didn't fill the meal form`)
                return
            }
            const id = this._randomID();
            let meal = new Meal(id, mealName, mealCalorie)
            this.calorieTracker.addMeal(meal)
            document.getElementById('add-meal-collapse').click()
            document.getElementById('meal-name').value = ''
            document.getElementById('meal-calories').value = ''
        }
        else if(id === 'workout-form'){
            const workoutName = document.getElementById('workout-name').value
            const workoutCalorie = document.getElementById('workout-calories').value
            if(workoutName === '' || workoutCalorie === ''){
                alert(`you didn't fill the workout form`)
                return
            }
            const id = this._randomID();
            let workout = new Workout(id, workoutName, workoutCalorie)
            this.calorieTracker.addWorkout(workout)
            document.getElementById('add-workout-collapse').click()
            document.getElementById('workout-name').value = ''
            document.getElementById('workout-calories').value = ''
        }
    }

    _removeItem(e){
        e.preventDefault()
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
            let itemDiv;
            if(e.target.classList.contains('fa-xmark'))
                itemDiv = e.target.parentElement.parentElement.parentElement.parentElement
            else
                itemDiv = e.target.parentElement.parentElement.parentElement
            if(itemDiv.hasAttribute('meal-id')){
                let mealId = itemDiv.getAttribute('meal-id')
                this.calorieTracker.removeMeal(mealId)
            }
            else if(itemDiv.hasAttribute('workout-id')){
                let workoutId = itemDiv.getAttribute('workout-id')
                this.calorieTracker.removeWorkout(workoutId)
            }
        }
    }

    _filterItems(e){
        e.preventDefault()
        if(e.target.getAttribute('id') === 'filter-meals'){
            let term = e.target.value
            this.calorieTracker._displayNewMeal(term)
        }
        else if(e.target.getAttribute('id') === 'filter-workouts'){
            let term = e.target.value
            this.calorieTracker._displayNewWorkout(term)
        }
    }

    _reset(e){
        e.preventDefault()
        this.calorieTracker.resetDay()
    }

    _setLimit(e){
        e.preventDefault()
        const input= document.getElementById('limit-form').getElementsByTagName('input')[0]
        let value = input.value
        if(!isNaN(value) && !isNaN(parseFloat(value))){
            // this.calorieTracker.setLimit(input.value)
            this.calorieTracker.setLimit(input.value)
            input.value = ''
            document.getElementById('close-btn-modal').click()
            return
        }
        alert('pls enter just digits')
        return;
    }

    _addEventListeners(){
        const addMealForm = document.getElementById('meal-form')
        const mealItems = document.getElementById('meal-items')
        const addWorkoutForm = document.getElementById('workout-form')
        const workoutItems = document.getElementById('workout-items')
        const limitForm = document.getElementById('limit-form')
        const reset = document.getElementById('reset')
        const filterMeals = document.getElementById('filter-meals')
        const filterWorkouts = document.getElementById('filter-workouts')

        addMealForm.addEventListener('submit', this._newItem.bind(this))
        addWorkoutForm.addEventListener('submit', this._newItem.bind(this))
        mealItems.addEventListener('click', this._removeItem.bind(this))
        workoutItems.addEventListener('click', this._removeItem.bind(this))
        limitForm.addEventListener('submit', this._setLimit.bind(this))
        reset.addEventListener('click', this._reset.bind(this))
        filterMeals.addEventListener('input', this._filterItems.bind(this))
        filterWorkouts.addEventListener('input', this._filterItems.bind(this))
    }

    _randomID(){
        return Math.random().toString(36).substring(2,12)
    }
}

new App()