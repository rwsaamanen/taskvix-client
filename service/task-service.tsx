import axios, { AxiosResponse } from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:8080";

export async function getRequest(URL: any) {
    try {
        const response: AxiosResponse = await axiosClient.get(URL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // rethrow the error if needed
    }
}

export async function postRequest(URL: any, data: any) {
    try {
        const response: AxiosResponse = await axiosClient.post(URL, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // rethrow the error if needed
    }
}

export async function putRequest(URL: any, data: any) {
    try {
        const response: AxiosResponse = await axiosClient.put(URL, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // rethrow the error if needed
    }
}

export async function deleteRequest(URL: any) {
    try {
        const response: AxiosResponse = await axiosClient.delete(URL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // rethrow the error if needed
    }
}
