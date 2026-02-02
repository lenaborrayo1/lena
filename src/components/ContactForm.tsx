import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate inputs
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission (in production, this would send to a backend)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Open WhatsApp with the message
    const whatsappMessage = encodeURIComponent(
      `Hello Lena! My name is ${trimmedName}.\n\nPhone: ${trimmedPhone || "Not provided"}\nEmail: ${trimmedEmail}\n\nMessage: ${trimmedMessage}`
    );
    window.open(`https://wa.me/17863440357?text=${whatsappMessage}`, "_blank");

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting Lena. She will respond soon!",
    });

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold-dark rounded-full text-sm font-semibold mb-4 font-body">
              Contact Lena
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
              Let's Find Your Dream Home
            </h2>
            <p className="text-muted-foreground font-body">
              Fill out the form below and Lena will get back to you as soon as
              possible.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-navy font-body"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-gold focus:ring-gold"
                  maxLength={100}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-navy font-body"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-gray-300 focus:border-gold focus:ring-gold"
                  maxLength={20}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-navy font-body"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="border-gray-300 focus:border-gold focus:ring-gold"
                maxLength={255}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-semibold text-navy font-body"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell Lena about your real estate needs..."
                value={formData.message}
                onChange={handleChange}
                className="border-gray-300 focus:border-gold focus:ring-gold min-h-[120px]"
                maxLength={1000}
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || isSubmitted}
              className="w-full bg-gold hover:bg-gold-dark text-navy font-semibold text-lg font-body"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message Sent!
                </>
              ) : isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
