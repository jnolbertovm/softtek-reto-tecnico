import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import { getPerson } from "../services/people-service";
import { PersonMutation } from "../mutators/person-mutator";
import createError from "http-errors";
import { validate as uuidValidate } from "uuid";
import { PeopleStoreInterface } from "../interfaces/peopleStore-interface";
import { PeopleStore } from "../store/people-store";

const store: PeopleStoreInterface = new PeopleStore();

const validator = async (handler) => {
    const id = handler.event.pathParameters?.id;
    if (id === undefined) {
        throw new createError.BadRequest();
    }
};

const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const id: any = event.pathParameters?.id;

    const person = await (uuidValidate(id)
        ? store.getPerson(id)
        : getPerson(id));

    return {
        statusCode: 200,
        body: JSON.stringify(PersonMutation(person)),
    };
};

const handler = middy().before(validator).handler(lambdaHandler);

export { handler };
