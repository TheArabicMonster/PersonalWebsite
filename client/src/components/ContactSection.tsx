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
import { useTheme } from "../contexts/ThemeContext";
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
  const { theme } = useTheme();
  
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
      className="py-24 relative overflow-visible bg-transparent"
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
            <div className="relative bg-gradient-to-br from-white via-primary/5 to-secondary/10 dark:from-[#181c24] dark:via-[#23283a]/80 dark:to-[#181c24] dark:bg-none backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-white/40 dark:border-gray-800/60 overflow-hidden transition-colors duration-300">
              {/* Déco gradient animée */}
              {theme !== 'dark' && (
                <motion.div
                  className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl opacity-40"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              )}
              <motion.div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/10 dark:from-secondary/10 dark:to-primary/10 blur-2xl opacity-30"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <div className="relative z-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nom */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold flex items-center gap-2 text-primary dark:text-primary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4Z"/></svg>
                              Nom
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Votre nom"
                                className="w-full px-4 py-3 rounded-xl border-2 border-white/60 dark:border-blue-400 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 dark:bg-background/80 transition-all placeholder-gray-500 dark:placeholder-gray-400 shadow focus:shadow-primary/10 dark:focus:shadow-primary/20 backdrop-blur-md"
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold flex items-center gap-2 text-primary dark:text-primary">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m22 5-10 7L2 5"/></svg>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="Votre email"
                                className="w-full px-4 py-3 rounded-xl border-2 border-white/60 dark:border-blue-400 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 dark:bg-background/80 transition-all placeholder-gray-500 dark:placeholder-gray-400 shadow focus:shadow-primary/10 dark:focus:shadow-primary/20 backdrop-blur-md"
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Sujet */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold flex items-center gap-2 text-primary dark:text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"/><rect width="20" height="14" x="2" y="7" rx="2"/></svg>
                            Sujet
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Sujet de votre message"
                              className="w-full px-4 py-3 rounded-xl border-2 border-white/60 dark:border-blue-400 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 dark:bg-background/80 transition-all placeholder-gray-500 dark:placeholder-gray-400 shadow focus:shadow-primary/10 dark:focus:shadow-primary/20 backdrop-blur-md"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold flex items-center gap-2 text-primary dark:text-primary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="m8 10 4 4 4-4"/></svg>
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder="Votre message..."
                              className="w-full px-4 py-3 rounded-xl border-2 border-white/60 dark:border-blue-400 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 dark:bg-background/80 transition-all resize-none placeholder-gray-500 dark:placeholder-gray-400 shadow focus:shadow-primary/10 dark:focus:shadow-primary/20 backdrop-blur-md"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-500 dark:text-red-400" />
                        </FormItem>
                      )}
                    />
                    {/* Bouton d'envoi */}
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="pt-2"
                    >
                      <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 tracking-wide border-2 border-white/60 dark:border-blue-700"
                      >
                        {mutation.isPending ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Envoyer
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="order-1 lg:order-2 lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white text-foreground border-gray-200/60 dark:bg-gray-900/90 dark:text-white dark:border-gray-800/60 rounded-lg shadow-lg border p-8 h-full relative overflow-hidden backdrop-blur-sm transition-colors duration-300">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-primary/20 opacity-10 transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-blue-700/30 opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 border-b border-white/20 pb-4">Coordonnées</h3>
                
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
                      <a href={`mailto:${contactInfo.email}`} className="hover:underline transition-colors hover:text-blue-300">
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
                      <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="hover:underline transition-colors hover:text-blue-300">
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
                      <p className="hover:underline transition-colors hover:text-blue-300">{contactInfo.location}</p>
                    </div>
                  </motion.div>
                  
                  <div className="pt-6 mt-6 border-t border-white/20">
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
