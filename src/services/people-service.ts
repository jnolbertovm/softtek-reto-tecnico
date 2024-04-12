import { SWAPIClient } from "../components/SWAPIClient-component";
import { Person } from "../models/person-model";

// export function getPeople() {
//   return SWAPIClient.get("people").then<Person[]>(
//     (response) => response.data.result as Person[]
//   );
// }

/**
 * Función que obtiene todos los personajes de la API de Star Wars (SWAPI).
 * @returns Todos los personajes.
 * @throws Un error si ocurre algún problema durante la solicitud.
 */
export const getPeople = async (): Promise<Person[]> => {
    try {
        // Realiza una solicitud GET a la ruta 'people' de la API de Star Wars.
        const {
            data: { results: people },
        } = await SWAPIClient.get("people");

        // Retorna el arreglo de personas obtenido de la respuesta.
        return people as Person[];
    } catch (e) {
        // Lanza un error si ocurre algún problema durante la solicitud.
        throw Error(e);
    }
};

/**
 * Función que obtiene los detalles de un personaje específico de la API de Star Wars (SWAPI).
 * @param id El ID del que se desea obtener.
 * @returns Datos del personaje solicitado.
 * @throws Un error si ocurre algún problema durante la solicitud.
 */
export const getPerson = async (id: string): Promise<Person> => {
    try {
        // Realiza una solicitud GET a la ruta 'people/{id}' de la API de Star Wars.
        const { data: person } = await SWAPIClient.get(`people/${id}`);

        // Retorna los detalles de la persona obtenidos de la respuesta.
        return person as Person;
    } catch (e) {
        // Lanza un error si ocurre algún problema durante la solicitud.
        throw Error(e);
    }
};
