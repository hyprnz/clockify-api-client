import * as dotenv from "dotenv";
dotenv.config();

import { apiConfig } from "./ApiConfig";
import { getUser } from "./users";
import { getSummaryReport } from "./reports";
import { addClients, showClients } from "./clients";
import { addProject } from "./projects";

// getUser(apiConfig);

// getSummaryReport(apiConfig);

// Best to do them 10 per call to avoid being rate limited
// const newClientNames = ["Foo", "Bar", "Baz"];
// addClients(apiConfig, newClientNames);
// showClients(apiConfig);

const project = {
  name: "Project Foo",
  clientId: "62f57948ee5e075289365ec0", // Contour
  isBillable: true
}
addProject(apiConfig, project);
