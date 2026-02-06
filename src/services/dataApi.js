import { BaseService } from "./baseService";

export class DataService extends BaseService {
  addData(payload) {
    return this.httpClient.post("/data", payload);
  }

  getData() {
    return this.httpClient.get("/data");
  }
}
