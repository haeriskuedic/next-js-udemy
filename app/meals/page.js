import classes from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";
import {Suspense} from "react";

async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}

export default function MealsPage() { // async habe hier auch entfernt
    // const meals = await getMeals(); // -> this is the old way, haben wir nach oben verschoben

    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created <span className={classes.highlight}>by you</span></h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href={"/meals/share"}>
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                {/*<MealsGrid meals={meals}/>*/}
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    );
}