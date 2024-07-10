import { fastify } from "fastify";

const app = fastify();

app.listen({
  port: 3333,
  host: "0.0.0.0",
}).then(()=> {
  console.log("Server running in port: 3333 🔥🔥🔥")
})