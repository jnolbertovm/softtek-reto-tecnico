import axios, { AxiosInstance } from "axios";

/**
 * Cliente para realizar solicitudes a la API de Star Wars (SWAPI).
 */
export const SWAPIClient: AxiosInstance = axios.create({
    /**
     * La URL base de la API SWAPI de Star Wars.
     */
    baseURL: "https://swapi.py4e.com/api/",

    /**
     * El tiempo máximo de espera para las solicitudes, en milisegundos.
     */
    timeout: 1000,

    /**
     * Encabezados por defecto para las solicitudes, especificando que el contenido es de tipo JSON.
     */
    headers: { "Content-Type": "application/json" },
});
