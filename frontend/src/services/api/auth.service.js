import axios from "axios";
import { ApiService } from "@/services/api/api.service";

export class AuthResource extends ApiService {
  constructor(path) {
    super();
    this.path = path;
  }

  setAuthHeader(token) {
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  login(params) {
    return this.$post("api/login", params);
  }

  logout() {
    return this.$delete("api/logout");
  }

  whoami() {
    return this.$get("api/whoAmI");
  }
}
