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
      className="py-24 relative overflow-hidden"
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
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            className="order-2 lg:order-1 lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/80 dark:bg-background/60 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 dark:border-gray-800/30">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Nom</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Votre nom" 
                                {...field} 
                                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white/50 dark:bg-background/40 transition-all border-gray-200 dark:border-gray-700"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Email</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="Votre email" 
                                {...field} 
                                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white/50 dark:bg-background/40 transition-all border-gray-200 dark:border-gray-700"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Sujet</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="Sujet de votre message" 
                                {...field} 
                                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white/50 dark:bg-background/40 transition-all border-gray-200 dark:border-gray-700"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">Message</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Textarea 
                                rows={5} 
                                placeholder="Votre message" 
                                {...field} 
                                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white/50 dark:bg-background/40 transition-all resize-none border-gray-200 dark:border-gray-700"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                  >
                    {mutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <span>Envoyer le message</span>
                        <RectangleEllipsis className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2 lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-slate-800 to-gray-900 dark:from-slate-800 dark:to-gray-900 from-blue-100 to-blue-200 text-slate-900 dark:text-white rounded-2xl p-8 shadow-xl h-full relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-primary/20 opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-blue-700/30 opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 border-b border-slate-900/20 dark:border-white/20 pb-4">Coordonnées</h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <RectangleEllipsis className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium opacity-80">Email</h4>
                      <a href={`mailto:${contactInfo.email}`} className="hover:underline transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                        {contactInfo.email}
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium opacity-80">Téléphone</h4>
                      <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="hover:underline transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium opacity-80">Localisation</h4>
                      <p className="text-gray-800 dark:text-gray-200">{contactInfo.location}</p>
                    </div>
                  </motion.div>
                  
                  <div className="pt-6 mt-6 border-t border-slate-900/20 dark:border-white/20">
                    <h4 className="text-lg font-medium mb-4 opacity-80">Suivez-moi</h4>
                    <div className="flex space-x-3">
                      <motion.a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600/40 transition-all"
                        whileHover={{ scale: 1.1 }}
                        aria-label="GitHub Profile"
                      >
                        <Github className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600/40 transition-all"
                        whileHover={{ scale: 1.1 }}
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600/40 transition-all"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Twitter Profile"
                      >
                        <Twitter className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href={socialLinks.dribbble}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-blue-700/20 dark:bg-blue-700/30 backdrop-blur-sm flex items-center justify-center hover:bg-blue-600/40 transition-all"
                        whileHover={{ scale: 1.1 }}
                        aria-label="Dribbble Profile"
                      >
                        <Dribbble className="h-5 w-5" />
                      </motion.a>
                    </div>
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
