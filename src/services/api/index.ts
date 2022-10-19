import { LocationData } from "./types";

const IP_STACK_API_KEY = "ea511f69e991df799239fb5fc5db61f0";

class Api {
  private fetch = async (url: string) => {
    try {
      const response = await fetch(url);
      const body = await response.json();
      if (response.ok) {
        if (body.error) {
          throw body.error;
        }
        return body;
      }
      throw body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getLocation = (ip: string): Promise<LocationData> =>
    this.fetch(`http://api.ipstack.com/${ip}?access_key=${IP_STACK_API_KEY}`);

  getUserIp = (): Promise<{ ip: string }> =>
    this.fetch("https://api.ipify.org?format=json");
}

const api = new Api();

export default api;
