import { FormEvent, useState } from "react";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type AppointmentRequestFormProps = { dark?: boolean };

export const AppointmentRequestForm = ({ dark = false }: AppointmentRequestFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", reason: "", preferredDate: "", preferredTime: "" });
  const inputClass = dark
    ? "bg-white/10 border-white/20 text-white placeholder:text-slate-400"
    : "bg-white";

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("appointment_requests").insert({
      name: form.name,
      email: form.email,
      reason: form.reason,
      preferred_date: form.preferredDate || null,
      preferred_time: form.preferredTime || null,
      status: "pending",
    });

    if (error) {
      toast.error("We couldn't submit your request. Please try again.");
    } else {
      // Keep the existing Formspree inbox notification in the loop while the
      // Supabase row remains the source of truth for approval status.
      void fetch("https://formspree.io/f/xeokdkaq", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "New appointment request (pending review)",
          message: form.reason,
          preferred_date: form.preferredDate || "Not specified",
          preferred_time: form.preferredTime || "Not specified",
        }),
      }).catch(() => undefined);
      setSubmitted(true);
      toast.success("Your appointment request is pending review.");
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-emerald-300/40 bg-emerald-500/10 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
        <h4 className="text-lg font-semibold">Request received</h4>
        <p className={dark ? "mt-2 text-slate-300" : "mt-2 text-slate-600"}>
          Your request is pending review. I’ll follow up by email to confirm a time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <CalendarClock className="h-5 w-5 text-blue-400" />
        Request a meeting (pending approval)
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input className={inputClass} placeholder="Your name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        <Input className={inputClass} type="email" placeholder="Your email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
      </div>
      <Textarea className={inputClass} placeholder="What would you like to discuss?" value={form.reason} onChange={(e) => update("reason", e.target.value)} required rows={4} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input className={inputClass} type="date" aria-label="Preferred date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)} />
        <Input className={inputClass} placeholder="Preferred time / timezone" value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white hover:bg-blue-700">
        {isSubmitting ? "Sending request..." : "Send appointment request"}
      </Button>
      <p className={dark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
        No payment is required. A meeting is not confirmed until it is reviewed.
      </p>
      <p className={dark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
        After your request is approved, you’ll receive a Calendly link to choose an available time.
      </p>
    </form>
  );
};
