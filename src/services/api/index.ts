import { LocationData } from "./types";

const IP_STACK_API_KEY = "ada9b9c48b6ea3d3f66efaa50609e86c";

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

  getLocation = async (ip: string): Promise<LocationData> => {
    const cachedResponse = localStorage.getItem(ip);
    if (cachedResponse) {
      // if there already was a request for this ip use cached data then
      return JSON.parse(cachedResponse) as LocationData;
    }
    const response = await this.fetch(
      `http://api.ipstack.com/${ip}?access_key=${IP_STACK_API_KEY}`
    );
    // cache data for this ip
    localStorage.setItem(ip, JSON.stringify(response));
    return response;
  };

  getUserIp = (): Promise<{ ip: string }> =>
    this.fetch("https://api.ipify.org?format=json");
}

const api = new Api();

export default api;
