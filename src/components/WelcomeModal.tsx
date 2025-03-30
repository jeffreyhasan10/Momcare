
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, Heart, BarChart2, BookOpen, Users } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const features = [
    {
      icon: BarChart2,
      title: "Track Your Journey",
      description: "Monitor your baby's growth, feeding patterns, sleep schedules, and your own wellness metrics."
    },
    {
      icon: BookOpen,
      title: "Expert Resources",
      description: "Access evidence-based articles, videos, and guides for every stage of motherhood."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with other mothers, share experiences, and get advice from those who understand."
    },
    {
      icon: Heart,
      title: "Wellness Focus",
      description: "Tools and resources designed specifically for maternal mental and physical health."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        <DialogHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <DialogTitle className="text-3xl font-lora mb-2">Welcome to MomCare</DialogTitle>
          <DialogDescription className="text-white/90 text-base">
            Your personal companion for the journey through motherhood
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            MomCare is designed to support you through every stage of your maternal journey, 
            providing personalized tools, resources, and community support.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex gap-3 p-3 border border-gray-100 rounded-lg bg-white shadow-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                  <feature.icon size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
