import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Person } from "../models/person-model";
import { v4 as uuidv4 } from "uuid";
import { PersonMutation } from "../mutators/person-mutator";
import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { PeopleStore } from "../store/people-store";
import middy from "@middy/core";

const store: PeopleStoreInterface = new PeopleStore();

/**
 * Función de controlador Lambda que maneja las solicitudes para crear un nuevo personaje.
 * @param event El evento de API Gateway que desencadena la invocación de la función.
 * @returns object objeto de resultado de API Gateway.
 */
const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    // Parsea el cuerpo de la solicitud para obtener los datos del nuevo personaje.
    const body = JSON.parse(event?.body || "");

    // Convierte los datos del personaje a un objeto del tipo 'Person'.
    const person: Person = body;

    // Genera un nuevo ID único para el personaje.
    person.id = uuidv4();

    // Agrega la marca de tiempo de creación.
    person.created = new Date().toISOString();

    // Crea el nuevo personaje en DynamoDB
    const item: Person = await store.createPerson(person);

    // Retorna la respuesta con el código de estado 201 y los datos del personaje creado.
    return {
        statusCode: 201,
        body: JSON.stringify(PersonMutation(item)),
    };
};

// Middleware que envuelve el controlador Lambda para agregar funcionalidades adicionales.
const handler = middy().handler(lambdaHandler);

// Exporta el controlador Lambda para que pueda ser invocado por AWS Lambda.
export { handler };
