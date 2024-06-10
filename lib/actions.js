'use server';

import {redirect} from 'next/navigation';

import {saveMeal} from './meals';
import {revalidatePath} from 'next/cache';

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: 'Invalid input.',
        };
    }

    await saveMeal(meal);
    revalidatePath('/meals');
    // mit dem kann ich sagen den cache einer bestimmten seite zu löschen, aber nicht die nested pages
    // um die nested pages zurückzusetzen, muss ich das layout verwenden
    // da sind alle drinnen weil wir layout haben, man kann auch pages angeben
    // revalidatePath('/meals/', "layout");
    redirect('/meals');
}