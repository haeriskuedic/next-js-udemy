import classes from './page.module.css';
import Image from "next/image";
import {getMeal} from "@/lib/meals";
import {notFound} from "next/navigation";

export default function MealDetailsPage({params}) {
    const meal = getMeal(params.slug)

    if (!meal) {
        // call the nearest not found or error page
        notFound()
    }

    // line breaks einbauen
    meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

    return (
        // <main>
        //     <h1>Meal Details</h1>
        //     <p>Detail content</p>
        //     <p>{params.slug}</p>
        // </main>
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image fill src={meal.image} alt={meal.title}/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}>
                </p>
            </main>
        </>
    );
}