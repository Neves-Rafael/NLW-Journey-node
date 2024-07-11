import { fastify } from "fastify";
import { createTrip } from "./routes/create-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: "*",
  // TODO: Update for front-end origin
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("Server running in port: 3333 🔥🔥🔥");
});
