import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { getPerson } from "../services/people-service";
import { PersonMutation } from "../mutators/person-mutator";
import createError from "http-errors";
import { validate as uuidValidate } from "uuid";
import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { PeopleStore } from "../store/people-store";

/**
 * Instancia de PeopleStore que se utilizará para interactuar con DynamoDB.
 */
const store: PeopleStoreInterface = new PeopleStore();

/**
 * Middleware para validar el identificador del personaje en la solicitud.
 * Si el identificador es indefinido, lanza un error BadRequest.
 * @param req El objeto de solicitud HTTP proporcionado por Middy.
 * @throws {createError.BadRequest} Si el parámetro de ID está ausente.
 */
const validator = async (req: middy.Request) => {
    const id = req.event.pathParameters?.id;
    if (id === undefined) {
        throw new createError.BadRequest();
    }
};

/**
 * Controlador de Lambda para obtener el detalle de un personaje.
 * Si el identificador del personaje es válido, obtiene los detalles de DynamoDB.
 * Si no es válido, busca los detalles en SWAPI.
 * @param event El evento de la solicitud de la API Gateway.
 * @returns objet objeto APIGatewayProxyResult.
 */
const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const id: any = event.pathParameters?.id;

    // Determina si el identificador de la persona es un UUID válido para buscar
    // en DynamoDB o de lo contrario consultara a SWAPI
    const person = await (uuidValidate(id)
        ? store.getPerson(id)
        : getPerson(id));

    return {
        statusCode: 200,
        body: JSON.stringify(PersonMutation(person)),
    };
};

// Middleware que valida el parámetro de ID en la solicitud antes de ejecutar el controlador Lambda.
const handler = middy().before(validator).handler(lambdaHandler);

// Exporta el controlador Lambda para que pueda ser invocado por AWS Lambda.
export { handler };
