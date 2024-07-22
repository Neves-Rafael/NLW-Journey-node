import { fastify } from "fastify";
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import cors from "@fastify/cors";
import { confirmParticipants } from "./routes/confirm-participant";
import { createActivities } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trips-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./utils/error-handler";
import { env } from "./utils/env";

const app = fastify();

app.register(cors, {
  origin: "*",
  // TODO: Update for front-end origin
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivities);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("Server running in port: 3333 🔥🔥🔥");
});
