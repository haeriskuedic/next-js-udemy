import sql from "better-sqlite3"

const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate slow network

    // throw new Error('Something went wrong!');
    return db.prepare('SELECT * FROM meals').all(); // multiple rows - .run() for single row
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}