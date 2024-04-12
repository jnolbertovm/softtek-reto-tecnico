import { Person } from "../models/person-model";

/**
 * Función que realiza una mutación en los datos de una persona.
 * @param person Los datos del personaje que se van a mutar.
 * @returns Un objeto con los datos mutados del personaje.
 */
export function PersonMutation(person: Person) {
    // Extrae el ID del personaje, si está definido.
    let { id } = person;

    // Si el ID no está definido, se intenta obtener del campo 'url'.
    if (id === undefined) {
        // Se crea un objeto URL a partir de la URL proporcionada (si está presente).
        const url = new URL(person?.url || "");

        // Se extrae el último segmento de la ruta de la URL como ID.
        id =
            url.pathname
                .split("/")
                .filter((path) => path !== "")
                .pop() || "0"; // Si no se encuentra un ID válido, se asigna '0' como valor predeterminado.
    }

    // Se retorna un objeto con los datos mutados del personaje.
    return {
        id,
        nombre: person.name,
        altura: person.height,
        peso: person.mass,
        color_pelo: person.hair_color,
        color_piel: person.skin_color,
        color_ojos: person.eye_color,
        fecha_nacimiento: person.birth_year,
        genero: person.gender,
        creado: person.created,
        editado: person.edited,
    };
}
