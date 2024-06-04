import classes from "./meals-grid.module.css";
import MealItem from "@/components/meals/meal-item";
export default function MealsGrid({meals}) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <div>
                       <MealItem {...meal}/>
                    </div>
                </li>
            ))}
        </ul>
    );
}