import axios, { AxiosInstance } from "axios";

interface LoginPayload {
  name: string;
  password: string;
}

interface RsvpPayload {
  rsvp: string;
}

interface GuestPayload {
  guests: string;
}

interface NewGuestsPayload {
  name: string;
  rsvp: string;
  guests: string;
}

// interface NewInviteePayload {
//     name: string;
//     rsvp: string;
// }

export const getGrpApiHttpClient = (accessToken?: string) => {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.GRP_API_URL,
    timeout: 18000,
    headers: {
      ...(accessToken ? { Authorization: `${accessToken}` } : {}),
    },
  });
  const client = new GrpApiHttpClient(instance);

  return client;
};

class GrpApiHttpClient {
  constructor(private client: AxiosInstance) {}

  public async loginUser(payload: LoginPayload) {
    const response = await this.client
      .post("/api/v1/auth/login", payload)
      .catch((e) => {
        this.client
          .post("/api/v1/newinvitee", {
            name: payload.name,
          })
          .catch((e) => {
            throw new Error(e);
          });
        throw new Error(e);
      });

    return response;
  }

  public async createRsvp(payload: RsvpPayload) {
    const response = await this.client
      .post("/api/v1/rsvp/create/auth", payload)
      .catch((e) => {
        throw new Error(e);
      });

    return response;
  }

  public async getRsvp() {
    const response = await this.client.get("/api/v1/rsvp/auth").catch((e) => {
      throw new Error(e);
    });

    return response?.data;
  }

  public async putRsvp(payload: RsvpPayload) {
    const response = await this.client
      .put("/api/v1/rsvp/update/auth", payload)
      .catch((e) => {
        throw new Error(e);
      });

    return response;
  }

  public async createGuests(payload: GuestPayload) {
    const response = await this.client
      .post("/api/v1/guests/create/auth", payload)
      .catch((e) => {
        throw new Error(e);
      });

    return response;
  }

  public async createNewGuests(payload: NewGuestsPayload) {
    const response = await this.client
      .post("/api/v1/newguests", payload)
      .catch((e) => {
        throw new Error(e);
      });

    return response;
  }

  public async getGuests() {
    const response = await this.client.get("/api/v1/guests/auth").catch((e) => {
      throw new Error(e);
    });

    return response?.data;
  }

  public async putGuests(payload: GuestPayload) {
    const response = await this.client
      .put("/api/v1/guests/update/auth", payload)
      .catch((e) => {
        throw new Error(e);
      });

    return response;
  }

  public async getDashboard() {
    const response = await this.client
      .get("/api/v1/dashboard/auth")
      .catch((e) => {
        throw new Error(e);
      });

    return response?.data;
  }
}
