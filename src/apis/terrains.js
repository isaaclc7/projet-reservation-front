import axios from "axios";

const terrainsInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

terrainsInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getAllTerrains() {
  try {
    const { data } = await terrainsInstance.get("/terrains");

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la récupération des terrains"
    );
  }
}

export async function getTerrainByNumero(numero) {
  try {
    const { data } = await terrainsInstance.get(`terrain?numero=${numero}`);

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la réucupération d'un terrain"
    );
  }
}

export async function getTerrainById(id) {
  try {
    const { data } = await terrainsInstance.get(`terrains/${id}`);

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la réucupération d'un terrain"
    );
  }
}

export async function createTerrain(terrain) {
  try {
    const { data } = await terrainsInstance.post("/terrains", terrain);

    return data;
  } catch (e) {
    throw new Error("Une erreur est survenue lors de la création d'un terrain");
  }
}

export async function deleteTerrain(id) {
  try {
    const { data } = await terrainsInstance.delete(`/terrains/${id}`);

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la suppresion d'un terrain"
    );
  }
}
