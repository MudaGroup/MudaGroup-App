import axios from 'axios';

const API_URL = 'http://localhost:1337/api/buildings';

export const getBuildings = async () => {
    const response = await axios.get(`${API_URL}?populate=image`);
    return response.data;
};

export const createBuilding = async (data) => {
    const response = await axios.post(API_URL, { data });
    return response.data;
};

export const updateBuilding = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, { data });
    return response.data;
};

export const deleteBuilding = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
