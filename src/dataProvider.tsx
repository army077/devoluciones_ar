import { DataProvider } from "@pankod/refine-core";
import axios from "axios";

const API_URL = "https://www.desarrollotecnologicoar.com/api1";

export const dataProvider: DataProvider = {
    getList: async ({ resource, pagination, sort, filters }) => {
        try {
            const response = await axios.get(`${API_URL}/${resource}`);
            return {
                data: response.data,
                total: response.data.length, // O ajusta según el formato de respuesta de tu API
            };
        } catch (error) {
            throw new Error("Error al obtener la lista de recursos");
        }
    },

    getOne: async ({ resource, id }) => {
        try {
            const response = await axios.get(`${API_URL}/${resource}/${id}`);
            return {
                data: response.data,
            };
        } catch (error) {
            throw new Error("Error al obtener el recurso por ID");
        }
    },

    create: async ({ resource, variables }) => {
        try {
            const response = await axios.post(`${API_URL}/${resource}`, variables);
            return {
                data: response.data,
            };
        } catch (error) {
            throw new Error("Error al crear el recurso");
        }
    },

    update: async ({ resource, id, variables }) => {
        try {
            const response = await axios.put(`${API_URL}/${resource}/${id}`, variables);
            return {
                data: response.data,
            };
        } catch (error) {
            throw new Error("Error al actualizar el recurso");
        }
    },

    deleteOne: async ({ resource, id }) => {
        try {
            const response = await axios.delete(`${API_URL}/${resource}/${id}`);
            return {
                data: response.data,
            };
        } catch (error) {
            throw new Error("Error al eliminar el recurso");
        }
    },
    // Implementa getApiUrl aquí
    getApiUrl: () => API_URL,
    // Implementar otros métodos como updateMany, deleteMany, etc., según sea necesario
};