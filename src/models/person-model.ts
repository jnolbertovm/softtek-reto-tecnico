/**
 * Interfaz que representa los datos del personaje.
 */
export interface Person {
    /**
     * El ID único del personaje.
     */
    id: string;

    /**
     * El nombre del personaje.
     */
    name: string;

    /**
     * La altura del personaje.
     */
    height: string;

    /**
     * La masa del personaje.
     */
    mass: string;

    /**
     * El color de cabello del personaje.
     */
    hair_color: string;

    /**
     * El color de piel del personaje.
     */
    skin_color: string;

    /**
     * El color de ojos del personaje.
     */
    eye_color: string;

    /**
     * El año de nacimiento del personaje.
     */
    birth_year: string;

    /**
     * El género del personaje.
     */
    gender: string;

    /**
     * La fecha de creación del registro del personaje.
     */
    created: string;

    /**
     * La fecha de edición del registro del personaje (opcional).
     */
    edited?: string;

    /**
     * La URL asociada al personaje (opcional).
     */
    url?: string;
}
