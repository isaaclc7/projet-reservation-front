import axios from "axios";

const utilisateursInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

utilisateursInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function getUtilisateurByMail(mail) {
  try {
    const { data } = await utilisateursInstance.get(
      `/utilisateurs?mail=${mail}`
    );

    return data;
  } catch (e) {
    return new Error(
      "Une erreur est survenue lors de la récupération d'un utilisateur"
    );
  }
}

export async function createUtilisateur(utilisateur) {
  try {
    const { data } = await utilisateursInstance.post(
      "/utilisateurs",
      utilisateur
    );

    return data;
  } catch (e) {
    return new Error(
      "Une erreur est survenue lors de la récupération d'un utilisateur"
    );
  }
}
