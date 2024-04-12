import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Clase base para componentes que interactúan con DynamoDB.
 */
export class DynamoDBComponent {
    /**
     * Cliente DynamoDB estándar utilizado para realizar operaciones directas con DynamoDB.
     */
    public static ddbClient: DynamoDBClient = new DynamoDBClient({});

    /**
     * Cliente DynamoDB Document utilizado para operaciones de alto nivel con DynamoDB, proporcionando una interfaz simplificada.
     */
    public static ddbDocClient: DynamoDBDocumentClient =
        DynamoDBDocumentClient.from(DynamoDBComponent.ddbClient);
}
