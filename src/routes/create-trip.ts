import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import dayjs from "dayjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { getMailClient } from "../lib/mail";
import nodemailer from "nodemailer"

export async function createTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/trips",{
      schema: {
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
          owner_name: z.string(),
          owner_email: z.string().email(),
        }),
      },
    }, async (request, reply) => {
      const { destination, ends_at, starts_at, owner_email, owner_name } = request.body;

      if(dayjs(starts_at).isBefore(new Date())){
        throw new Error("Invalid trip start date ❌❌❌")
      }

      if(dayjs(ends_at).isBefore(starts_at)){
        throw new Error("Invalid trip end date ❌❌❌")
      }

      const trip = await prisma.trip.create({
        data:{
          destination,
          ends_at,
          starts_at
        }
      })

      const mail = await getMailClient()

      const message = await mail.sendMail({
        from: {
          name: "Equipe plann.er",
          address: "oi@plann.er"
        },
        to:{
          name: owner_name,
          address: owner_email,
        },
        subject: "Testing function send email",
        html: `<p>Test send e-mail</p>`
      })

      console.log(nodemailer.getTestMessageUrl(message))

      return reply.send({trip_id: trip.id});
    },
  );
}
