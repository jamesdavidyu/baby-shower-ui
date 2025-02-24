/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  guestsFormSchema,
  GuestsFormSchemaValidationSchemaType,
  rsvpFormSchema,
  RsvpFormSchemaValidationSchemaType,
} from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import axios from "axios";
import { Select, SelectItem, SelectTrigger } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";

interface RsvpFormValues {
  rsvp: string;
}

interface GuestsFormValues {
  guests: string;
}

interface RsvpFormProps {
  rsvps: any;
  guests: any;
}

export const RSVPForm = ({ rsvps, guests }: RsvpFormProps) => {
  const [newRsvp, setNewRsvp] = useState<string>("");

  const form = useForm<RsvpFormSchemaValidationSchemaType>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      rsvp: "Yes",
    },
  });

  const guestsForm = useForm<GuestsFormSchemaValidationSchemaType>({
    resolver: zodResolver(guestsFormSchema),
  });

  const handleCreateRsvp = useCallback(async (formValues: RsvpFormValues) => {
    try {
      await axios.post("/api/rsvp", formValues);
      window.location.reload();
      toast.info("Successfully submitted!");
    } catch (e: any) {
      toast.error("Not submitted.");
    }
  }, []);

  const handlePutRsvp = useCallback(async (formValues: RsvpFormValues) => {
    try {
      await axios.put("/api/rsvp", formValues);
      window.location.reload();
      toast.info("Successfully submitted");
    } catch (e: any) {
      toast.error("Not submitted");
    }
  }, []);

  const handleCreateGuests = useCallback(
    async (formValues: GuestsFormValues) => {
      try {
        await axios.post("/api/guests", formValues);
        window.location.reload();
        toast.info("Successfully submitted!");
      } catch (e: any) {
        toast.error("Not submitted.");
      }
    },
    []
  );

  const handlePutGuests = useCallback(async (formValues: GuestsFormValues) => {
    try {
      await axios.put("/api/guests", formValues);
      window.location.reload();
      toast.info("Successfully submitted!");
    } catch (e: any) {
      toast.error("Not submitted.");
    }
  }, []);

  return rsvps?.rsvp === "Yes" ||
    rsvps?.rsvp === "Virtual" ||
    rsvps?.rsvp === "No" ? (
    <div className="p-4 space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePutRsvp)} className="space-y-2">
          <FormField
            control={form.control}
            name="rsvp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setNewRsvp(value);
                    }}
                  >
                    <SelectTrigger
                      title="Change RSVP"
                      className="flex justify-center font-semibold text-[#5c1d1e] hover:bg-[#a43335]"
                    >
                      Your RSVP is: {newRsvp === "" ? rsvps?.rsvp : newRsvp}
                    </SelectTrigger>
                    <SelectContent className="w-72 sm:w-[25.9rem] bg-[#ffc521] border rounded-md">
                      <SelectItem
                        className="flex justify-center text-[#5c1d1e] focus:text-[#5c1d1e] font-semibold focus:bg-[#a43335]"
                        value="Yes"
                        disabled={rsvps?.rsvp === "Yes" ? true : false}
                      >
                        Yes
                      </SelectItem>
                      <SelectItem
                        className="flex justify-center text-[#5c1d1e] focus:text-[#5c1d1e] font-semibold focus:bg-[#a43335]"
                        value="No"
                        disabled={rsvps?.rsvp === "No" ? true : false}
                      >
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {newRsvp === "" ? null : (
            <Button type="submit" className="w-full">
              Submit New RSVP
            </Button>
          )}
        </form>
      </Form>
      {rsvps?.rsvp === "Yes" ? (
        <div>
          <Form {...guestsForm}>
            <form
              onSubmit={
                guests?.guests === ""
                  ? guestsForm.handleSubmit(handleCreateGuests)
                  : guestsForm.handleSubmit(handlePutGuests)
              }
              className="space-y-2"
            >
              <FormField
                control={guestsForm.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder={
                          guests?.guests === ""
                            ? "(Optional) Please write the name of your guests."
                            : "Your guests: " + guests?.guests
                        }
                        className="text-[#5c1d1e] italic"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {guests?.guests === "" ? (
                  <p>Submit Guests</p>
                ) : (
                  <p>Update Guest List</p>
                )}
              </Button>
            </form>
          </Form>
        </div>
      ) : rsvps?.rsvp === "Virtual" ? (
        <div className="flex flex-col items-center space-y-2 w-full">
          <a
            href="https://cayuga-cc-edu.zoom.us/j/9302098328"
            target="_blank"
            className="w-full"
          >
            <Button className="w-full">Zoom Link</Button>
          </a>
          <div className="flex flex-col w-full items-center">
            <p className="flex font-bold text-sm w-fit text-[#5c1d1e]">
              Save the Link!&nbsp;
            </p>
            <a
              href="https://cayuga-cc-edu.zoom.us/j/9302098328"
              target="_blank"
              className="flex text-xs sm:text-sm hover:underline w-fit text-[#5c1d1e]"
            >
              https://cayuga-cc-edu.zoom.us/j/9302098328
            </a>
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateRsvp)}
          className="flex flex-col space-y-4"
        >
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="rsvp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-2"
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex justify-center items-center space-x-2">
                        <RadioGroupItem value="Yes" id="r1" />
                        <Label
                          htmlFor="r1"
                          className="text-[#5c1d1e] font-bold"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex justify-center items-center space-x-2">
                        <RadioGroupItem value="No" id="r3" />
                        <Label
                          htmlFor="r3"
                          className="text-[#5c1d1e] font-bold"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="text-lg">
            RSVP
          </Button>
        </form>
      </Form>
    </div>
  );
};
