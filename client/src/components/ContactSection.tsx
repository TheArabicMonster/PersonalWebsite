import { useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { socialLinks, contactInfo } from "../lib/constants";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { RectangleEllipsis, Phone, MapPin, Github, Linkedin, Twitter, Dribbble, Loader2 } from "lucide-react";
import { insertContactMessageSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères."
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide."
  }),
  subject: z.string().min(2, {
    message: "Le sujet doit contenir au moins 2 caractères."
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères."
  })
});

export default function ContactSection() {
  const [sectionRef, isInView] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  const { toast } = useToast();
  
  // Form handling with React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Mutation for contact form submission
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé avec succès !",
        description: "Merci pour votre message. Je vous répondrai bientôt.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur d'envoi",
        description: error.message || "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data);
  };
  
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Me <span className="text-primary">Contacter</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="mt-6 text-lg opacity-80 max-w-2xl mx-auto">
            Vous avez une question ou un projet en tête ? N'hésitez pas à me contacter !
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre nom" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background/80 transition-all"
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Votre email" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background/80 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Sujet de votre message" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background/80 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5} 
                            placeholder="Votre message" 
                            {...field} 
                            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-background/80 transition-all resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  {mutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <RectangleEllipsis className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-background/80 rounded-xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6">Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <RectangleEllipsis className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Email</h4>
                    <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Téléphone</h4>
                    <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="hover:text-primary">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Localisation</h4>
                    <p>{contactInfo.location}</p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <h4 className="text-lg font-medium mb-4">Réseaux sociaux</h4>
                  <div className="flex space-x-4">
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-background/40 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-background/40 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-background/40 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={socialLinks.dribbble}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-background/40 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all"
                      aria-label="Dribbble Profile"
                    >
                      <Dribbble className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
