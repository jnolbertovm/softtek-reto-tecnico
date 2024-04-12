# Proyecto Serverless con AWS API Gateway, DynamoDB y Lambda

Este proyecto implementa una API RESTful utilizando el framework Serverless de AWS. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en una tabla de personas almacenada en DynamoDB. Utiliza AWS Lambda para ejecutar las funciones y AWS API Gateway para exponer la API REST.

## Documentación Interactiva

Puedes explorar y probar la API utilizando la documentación interactiva proporcionada a continuación:

[![Swagger UI](https://img.shields.io/badge/Swagger-UI-blue.svg)](https://app.swaggerhub.com/apis-docs/JNOLBERTOVM/softtek-api/1.0)

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

-   `src/`: Contiene el código fuente de las funciones Lambda.
-   `serverless.yml`: Archivo de configuración del framework Serverless que define los recursos de AWS que serán creados, como las funciones Lambda, el API Gateway y la tabla de DynamoDB.

## Requisitos

Antes de comenzar, asegúrate de tener instalado Node.js y el framework Serverless de AWS. También necesitarás tener una cuenta en AWS y configurar tus credenciales de AWS localmente.

## Configuración

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto ejecutando `npm install`.
3. Configura tus credenciales de AWS ejecutando `serverless config credentials --provider aws --key <YOUR_ACCESS_KEY> --secret <YOUR_SECRET_KEY>`.

## Despliegue

Para desplegar el proyecto en tu cuenta de AWS, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm run deploy
```
