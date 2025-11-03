import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Event } from "@shared/schema";
import { format } from "date-fns";

const rsvpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  attendees: z.number().min(1).max(10),
});

type RSVPFormData = z.infer<typeof rsvpFormSchema>;

interface RSVPDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RSVPDialog({ event, open, onOpenChange }: RSVPDialogProps) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      attendees: 1,
    },
  });

  const rsvpMutation = useMutation({
    mutationFn: async (data: RSVPFormData & { eventId: number }) => {
      const res = await apiRequest("POST", "/api/rsvps", data);
      return await res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "RSVP Confirmed!",
        description: "Check your email for confirmation details.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "RSVP Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RSVPFormData) => {
    if (!event) return;
    rsvpMutation.mutate({
      ...data,
      eventId: event.id,
    });
  };

  const handleClose = () => {
    setSubmitted(false);
    form.reset();
    onOpenChange(false);
  };

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register for Event</DialogTitle>
          <DialogDescription>
            {event.title} on {format(new Date(event.eventDate), "MMMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">Registration Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              A confirmation email has been sent to your inbox with event details.
            </p>
            <Button onClick={handleClose} className="w-full" data-testid="button-close-rsvp">
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        {...field}
                        data-testid="input-rsvp-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        data-testid="input-rsvp-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+27 12 345 6789"
                        {...field}
                        data-testid="input-rsvp-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Attendees</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                        data-testid="input-rsvp-attendees"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  data-testid="button-cancel-rsvp"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={rsvpMutation.isPending}
                  data-testid="button-submit-rsvp"
                >
                  {rsvpMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm RSVP"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
