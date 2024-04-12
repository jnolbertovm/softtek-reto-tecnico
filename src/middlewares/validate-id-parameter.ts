import middy from "@middy/core";
import { validate as uuidValidate } from "uuid";
import createError from "http-errors";

/**
 * Función que valida el parámetro de ID en la solicitud.
 * @param req El objeto de solicitud HTTP proporcionado por Middy.
 * @throws {createError.BadRequest} Si el parámetro de ID está ausente o no es un UUID válido.
 */
export function validateIdParamter(req: middy.Request) {
    const id = req.event.pathParameters?.id;
    if (id === undefined || uuidValidate(id)) {
        throw new createError.BadRequest();
    }
}
