import axios from "axios";

const reservationInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

reservationInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function createReservation(reservation) {
  try {
    const { data } = await reservationInstance.post(
      "/reservation",
      reservation
    );

    return data;
  } catch (e) {
    return new Error(
      "Une erreur est survenue lors de la création d'une réservation"
    );
  }
}

export async function getReservationById(id) {
  try {
    const { data } = await reservationInstance.get(`/reservation/${id}`);

    return data;
  } catch (e) {
    throw new Error(
      "Une erreur est survenue lors de la récupération d'une réservation"
    );
  }
}
