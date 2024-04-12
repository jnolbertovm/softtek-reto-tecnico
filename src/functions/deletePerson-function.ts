import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import createError from "http-errors";
import { validate as uuidValidate } from "uuid";
import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { PeopleStore } from "../store/people-store";
import { Person } from "../models/person-model";
import { validateIdParamter } from "../middlewares/validate-id-parameter";

/**
 * Instancia de PeopleStore que se utilizará para interactuar con DynamoDB.
 */
const store: PeopleStoreInterface = new PeopleStore();

/**
 * Función de controlador Lambda que maneja las solicitudes para eliminar un personaje.
 * @param event El evento de API Gateway que desencadena la invocación de la función.
 * @returns object objeto de resultado de API Gateway.
 * @throws {createError.BadRequest} Si el personaje con el ID proporcionado no existe.
 */
const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    // Obtiene el ID del personaje de los parámetros de la ruta.
    const id: any = event.pathParameters?.id;

    // Obtiene el personaje correspondiente al ID proporcionado.
    const person: Person | undefined = await store.getPerson(id);

    // Si no se encuentra el personaje, se lanza un error de BadRequest.
    if (person === undefined) {
        throw new createError.BadRequest();
    }

    // Elimina el personaje.
    await store.deletePerson(id);

    // Retorna la respuesta con el código de estado 200 y un mensaje de éxito.
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "person deleted successfully",
        }),
    };
};

// Middleware que valida el parámetro de ID en la solicitud antes de ejecutar el controlador Lambda.
const handler = middy<APIGatewayProxyEvent>()
    .before(validateIdParamter)
    .handler(lambdaHandler);

// Exporta el controlador Lambda para que pueda ser invocado por AWS Lambda.
export { handler };
