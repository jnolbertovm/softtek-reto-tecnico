import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { getPeople } from "../services/people-service";
import { PersonMutation } from "../mutators/person-mutator";
import { PeopleStore } from "../store/people-store";
import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { Person } from "../models/person-model";

/**
 * Instancia de PeopleStore que se utilizará para interactuar con DynamoDB.
 */
const store: PeopleStoreInterface = new PeopleStore();

/**
 * Función de controlador Lambda que maneja las solicitudes para obtener todos los personajes.
 * Combina los personajes almacenadas en DynamoDB con los personajes obtenidos de SWAPI.
 * @returns object Objeto de resultado de API Gateway.
 */
const lambdaHandler = async (): Promise<APIGatewayProxyResult> => {
    // Obtiene todas los personajes de DynamoDB.
    const peopleStore: Person[] = await store.getPeople();

    // Obtiene todas los personajes de SWAPI.
    const peopleSWAPI: Person[] = await getPeople();

    // Combina los personajes almacenadas en DynamoDB con los personajes obtenidas de SWAPI.
    const people: Person[] = peopleStore.concat(peopleSWAPI);

    // Retorna la respuesta con el código de estado 200 y el cuerpo que contiene todos los personajes.
    return {
        statusCode: 200,
        body: JSON.stringify(people.map(PersonMutation)),
    };
};

// Middleware que envuelve el controlador Lambda para agregar funcionalidades adicionales.
const handler = middy().handler(lambdaHandler);

// Exporta el controlador Lambda para que pueda ser invocado por AWS Lambda.
export { handler };
