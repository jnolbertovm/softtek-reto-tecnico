import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import createError from "http-errors";
import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { PeopleStore } from "../store/people-store";
import { Person } from "../models/person-model";
import { PersonMutation } from "../mutators/person-mutator";
import { validateIdParamter } from "../middlewares/validate-id-parameter";

/**
 * Instancia de PeopleStore que se utilizará para interactuar con DynamoDB.
 */
const store: PeopleStoreInterface = new PeopleStore();

/**
 * Función de controlador Lambda que maneja las solicitudes de actualización de personajes.
 * @param event El evento de API Gateway que desencadena la invocación de la función.
 * @returns object Objeto de resultado de API Gateway.
 */
const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    // Obtiene el ID del personaje de los parámetros de la ruta.
    const id: any = event.pathParameters?.id;

    // Parsea el cuerpo de la solicitud para obtener los datos del personaje a actualizar.
    const body = JSON.parse(event?.body || "");

    // Agrega la marca de tiempo de edición al cuerpo del personaje.
    body.edited = new Date().toISOString();

    // Obtiene el personaje actualizada.
    const person: Person | undefined = await store.getPerson(id);

    // Si no se encuentra el personaje , se lanza un error de BadRequest.
    if (person === undefined) {
        throw new createError.BadRequest();
    }

    // Actualiza el personaje con los datos proporcionados.
    const personUpdate: Person = await store.updatePerson(person, body);

    // Retorna la respuesta con el código de estado 200 y los datos del personaje actualizada.
    return {
        statusCode: 200,
        body: JSON.stringify(PersonMutation(personUpdate)),
    };
};

// Middleware que valida el parámetro de ID en la solicitud antes de ejecutar el controlador Lambda.
const handler = middy<APIGatewayProxyEvent>()
    .before(validateIdParamter)
    .handler(lambdaHandler);

// Exporta el controlador Lambda para que pueda ser invocado por AWS Lambda.
export { handler };
