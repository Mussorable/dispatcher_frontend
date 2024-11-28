type DefaultBody = Record<string, unknown>;

export class FetchWrapper {
  #baseURL;

  constructor(baseURL: string) {
    this.#baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    return fetch(this.#baseURL + endpoint, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (!response.ok) {
        console.error(response.statusText);
      }
      return response.json();
    });
  }

  async post<T, B = DefaultBody>(endpoint: string, body: B): Promise<T> {
    return this.#send<B>("POST", endpoint, body);
  }

  async #send<B>(method: string, endpoint: string, body?: B) {
    return fetch(this.#baseURL + endpoint, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        console.error(response.statusText);
      }
      return response.json();
    });
  }
}