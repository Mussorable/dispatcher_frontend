type DefaultBody = Record<string, unknown>;

export class FetchWrapper {
  #baseURL;

  constructor(baseURL: string) {
    this.#baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    return fetch(this.#baseURL + endpoint).then((response) => response.json());
  }

  post<T, B = DefaultBody>(endpoint: string, body: B): Promise<T> {
    return this.#send<B>("POST", endpoint, body);
  }

  #send<B>(method: string, endpoint: string, body?: B) {
    return fetch(this.#baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => response.json());
  }
}