import { getUser } from "./services/users";
import { getSummaryReport, getDetailedReport } from "./services/reports";
import { addClients, showClients } from "./services/clients";
import { addProject } from "./services/projects";

// getUser();

// getSummaryReport();
getDetailedReport();

// Best to do them 10 per call to avoid being rate limited
// const newClientNames = ["Foo", "Bar", "Baz"];
// addClients(newClientNames);
// showClients();

const project = {
  name: "Project Foo",
  clientId: "62f57948ee5e075289365ec0", // Contour
  isBillable: true
};
//addProject(project);
