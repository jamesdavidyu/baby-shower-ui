import { z } from "zod";

export const loginFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Please input a valid name." }),
    password: z.string().min(3, { message: "Please input a valid password." }),
});

export type LoginValidationSchemaType = z.infer<typeof loginFormSchema>;

export const rsvpFormSchema = z.object({
    rsvp: z.string().min(1, { message: "You must select one." }),
});

export type RsvpFormSchemaValidationSchemaType = z.infer<typeof rsvpFormSchema>;

export const guestsFormSchema = z.object({
    guests: z.string().min(3, { message: "Please input valid names for your guests." }),
});

export type GuestsFormSchemaValidationSchemaType = z.infer<typeof guestsFormSchema>;

export const newGuestsFormSchema = z.object({
    name: z.string(),
    guests: z.string().min(3, { message: "Please input valid names for your guests." }),
});

export type NewGuestsFormSchemaValidationSchemaType = z.infer<typeof newGuestsFormSchema>;