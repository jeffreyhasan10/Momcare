
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, LucideIcon, LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { extendedButtonVariants } from "./ui/button-variants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{
    name: string;
    path: string;
    icon: LucideIcon;
  }>;
  isActive: (path: string) => boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems, isActive }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "An error occurred while signing out",
      });
    }
  };
  
  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleProfileClick = () => {
    navigate('/profile');
    onClose();
  };
  
  const getUserInitials = () => {
    if (!user) return "U";
    const metadata = user.user_metadata;
    if (metadata?.first_name && metadata?.last_name) {
      return `${metadata.first_name.charAt(0)}${metadata.last_name.charAt(0)}`;
    }
    return user.email?.charAt(0).toUpperCase() || "U";
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={onClose} 
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-xl overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-pink-500">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {user && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-4 bg-pink-50 rounded-lg flex items-center gap-4"
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-pink-100 text-pink-800 text-lg">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  {user.user_metadata?.first_name && (
                    <p className="font-medium text-gray-800">{`${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`}</p>
                  )}
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
              </motion.div>
            )}
            
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-pink-100 text-pink-700"
                        : "hover:bg-pink-50 text-gray-700"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 mt-4 border-t border-gray-200"
            >
              {user ? (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className={cn(
                      extendedButtonVariants({ variant: "ghost-pink" }),
                      "w-full justify-start py-3"
                    )}
                    onClick={handleProfileClick}
                  >
                    <User className="mr-2" size={20} />
                    <span>Profile</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 py-3"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2" size={20} />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button
                  className={cn(
                    extendedButtonVariants({ variant: "pink" }),
                    "w-full justify-center py-3"
                  )}
                  onClick={handleLogin}
                >
                  <LogIn className="mr-2" size={20} />
                  <span>Sign In</span>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
