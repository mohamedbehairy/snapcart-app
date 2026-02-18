"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Full name is required")
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must not exceed 50 characters"),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address (e.g. name@example.com)",
    ),
  message: z
    .string()
    .nonempty("Message is required")
    .min(5, "Message must be at least 5 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent successfully!", {
      description: "We'll get back to you soon.",
      position: "top-center",
    });
    reset();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Get in touch</h1>
            <p className="text-sm text-muted-foreground">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...register("name")}
                  placeholder="Your name"
                  className="pl-9 h-11 bg-background/50 border-input/50 focus:bg-background transition-colors"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-destructive px-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Your email"
                  className="pl-9 h-11 bg-background/50 border-input/50 focus:bg-background transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive px-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  {...register("message")}
                  placeholder="Your message"
                  rows={5}
                  className="pl-9 bg-background/50 border-input/50 focus:bg-background transition-colors resize-none"
                />
              </div>
              {errors.message && (
                <p className="text-xs text-destructive px-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 gap-2 text-base font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⚪</span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Footer Note */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
