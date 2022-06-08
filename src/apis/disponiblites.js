import axios from "axios";

const disponibilitesInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

disponibilitesInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getDisponiblitesByTerrain(numero) {
  try {
    const { data } = await disponibilitesInstance.get(
      `/disponibilites?numero=${numero}`
    );

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la récupération des disponibilités d'un terrain"
    );
  }
}

export async function deleteDisponibiliteById(id) {
  try {
    const { data } = await disponibilitesInstance.delete(
      `/disponibilites/${id}`
    );

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la suppresion d'une disponibilité d'une terrain"
    );
  }
}
