import { Person } from "../models/person-model";

/**
 * Interfaz que define los métodos para el manejo de personajes en DynamoDB.
 */
export interface PeopleStoreInterface {
    /**
     * Obtiene todas los personajes almacenados.
     * @returns Promise<Person[]> Todos los personajes.
     */
    getPeople: () => Promise<Person[]>;
    /**
     * Obtiene un personaje específico por su ID.
     * @param id El ID del personaje a obtener.
     * @returns Promise<Person[]> Personaje correspondiente al ID proporcionado.
     */
    getPerson: (id: string) => Promise<Person>;
    /**
     * Crea un personaje.
     * @param person Personaje que se va a crear.
     * @returns Promise<Person> Personaje recién creada.
     */
    createPerson: (person: Person) => Promise<Person>;
    /**
     * Elimina un personaje por su ID.
     * @param id El ID del personaje a eliminar.
     * @returns Promise<boolean> Valor que indica si el personaje fue eliminado correctamente.
     */
    deletePerson: (id: string) => Promise<boolean>;
    /**
     * Actualiza un personaje con los campos proporcionados.
     * @param person Personaje a actualizar.
     * @param updateField Los campos que se van a actualizar del personaje.
     * @returns Partial<Person> Personaje actualizada.
     */
    updatePerson: (
        person: Person,
        updateField: Partial<Person>
    ) => Promise<Person>;
}
