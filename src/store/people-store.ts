import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { Person } from "../models/person-model";
import {
    DeleteCommand,
    GetCommand,
    GetCommandOutput,
    PutCommand,
    ScanCommand,
    ScanCommandOutput,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBComponent } from "../components/DynamoDB-component";

/**
 * Clase que maneja el almacenamiento de personajes en DynamoDB.
 */
export class PeopleStore
    extends DynamoDBComponent
    implements PeopleStoreInterface
{
    /**
     * Nombre de la tabla de personas en DynamoDB.
     */
    private static tableName = "peopleTable";

    /**
     * Obtiene todas las personas de la tabla.
     * @returns Person[] Todos los personajes.
     */
    public async getPeople(): Promise<Person[]> {
        // Configura los parámetros para consultar la tabla.
        const params: ScanCommand = new ScanCommand({
            TableName: PeopleStore.tableName,
            Limit: 20,
        });

        // Ejecuta el comando de consulta en DynamoDB.
        const result: ScanCommandOutput = await PeopleStore.ddbDocClient.send(
            params
        );

        // Devuelve el resultado como un arreglo de personajes.
        return result.Items as Person[];
    }
    /**
     * Obtiene un personaje específico por su ID.
     * @param id El ID del personaje a obtener.
     * @returns Promise<Person[]> Personaje correspondiente al ID proporcionado.
     */
    public async getPerson(id: string): Promise<Person> {
        // Configura los parámetros para consultar la tabla.
        const params: GetCommand = new GetCommand({
            TableName: PeopleStore.tableName,
            Key: {
                id,
            },
        });

        // Ejecuta el comando de consulta en DynamoDB.
        const result: GetCommandOutput = await PeopleStore.ddbDocClient.send(
            params
        );

        // Devuelve los datos del personaje.
        return result.Item as Person;
    }
    /**
     * Crea un personaje.
     * @param person Personaje que se va a crear.
     * @returns Promise<Person> Personaje recién creada.
     */
    public async createPerson(person: Person): Promise<Person> {
        // Configura los parámetros para la creación el personaje en la tabla.
        const params: PutCommand = new PutCommand({
            TableName: PeopleStore.tableName,
            Item: person,
        });

        // Ejecuta el comando creación en DynamoDB.
        await PeopleStore.ddbDocClient.send(params);

        // Devuelve los datos del personaje creado.
        return person;
    }
    /**
     * Elimina un personaje por su ID.
     * @param id El ID del personaje a eliminar.
     * @returns Promise<boolean> Valor que indica si el personaje fue eliminado correctamente.
     */
    public async deletePerson(id: string): Promise<boolean> {
        // Configura los parámetros para eliminar el personaje de la tabla.
        const params: DeleteCommand = new DeleteCommand({
            TableName: PeopleStore.tableName,
            Key: {
                id,
            },
        });

        // Ejecuta el comando eliminación en DynamoDB.
        await PeopleStore.ddbDocClient.send(params);

        return true;
    }
    /**
     * Actualiza un personaje con los campos proporcionados.
     * @param person Personaje a actualizar.
     * @param updateField Los campos que se van a actualizar del personaje.
     * @returns Partial<Person> Personaje actualizada.
     */
    public async updatePerson(
        person: Person,
        updateField: Partial<Person>
    ): Promise<Person> {
        // Definición de los campos que nunca serán actualziados
        const readonlyFields: (keyof Person)[] = ["id", "created"];

        let expressionAttributeName: Record<string, any> = {};
        let expressionAttributeValues: Record<string, any> = {};
        let expressionUpdate: any[] = [];

        // Iteración del modelo Persona con los datos del personaje para crear
        // de forma dínamica los campos que serán actualizados
        for (const key in person) {
            if (
                Object.prototype.hasOwnProperty.call(updateField, key) &&
                !readonlyFields.includes(key as keyof Person)
            ) {
                expressionAttributeValues[`:${key}`] =
                    updateField[key as keyof Person];
                expressionAttributeName[`#${key}`] = key;
                expressionUpdate.push(`#${key} = :${key}`);
            }
        }

        // Configura los parámetros para actualziar el personaje en la tabla.
        const params: UpdateCommand = new UpdateCommand({
            TableName: PeopleStore.tableName,
            Key: {
                id: person.id,
            },
            ExpressionAttributeNames: expressionAttributeName,
            ExpressionAttributeValues: expressionAttributeValues,
            UpdateExpression: `SET ${expressionUpdate.join(", ")}`,
            ReturnValues: "ALL_NEW",
        });

        // Ejecuta el comando de actualización en DynamoDB.
        const response = await PeopleStore.ddbDocClient.send(params);

        // Devuelve los datos actualizados del personaje.
        return response.Attributes as Person;
    }
}
