
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Heart, Users, BarChart2, AlertCircle, Menu, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import MobileMenu from "./MobileMenu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleSignOut = async () => {
    try {
      await signOut();
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

  const getUserInitials = () => {
    if (!user) return "U";
    const metadata = user.user_metadata;
    if (metadata?.first_name && metadata?.last_name) {
      return `${metadata.first_name.charAt(0)}${metadata.last_name.charAt(0)}`;
    }
    return user.email?.charAt(0).toUpperCase() || "U";
  };
  
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Resources", path: "/resources", icon: BookOpen },
    { name: "Wellness", path: "/wellness", icon: Heart },
    { name: "Community", path: "/community", icon: Users },
    { name: "Tracking", path: "/tracking", icon: BarChart2 },
    { name: "Emergency", path: "/emergency", icon: AlertCircle },
  ];

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-40 flex justify-between items-center">
        <Link to="/" className="text-2xl font-lora text-pink-500 font-semibold">MomCare</Link>
        
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? "bg-pink-100 text-pink-700" 
                  : "hover:bg-pink-50 text-gray-700"
              }`}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-pink-100 text-pink-800">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user.user_metadata?.first_name && (
                      <p className="font-medium">{`${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`}</p>
                    )}
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => navigate('/profile')}
                >
                  <User size={16} />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-500 flex items-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="p-2 rounded-lg bg-pink-50 text-pink-500"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navItems={navItems}
        isActive={isActive}
      />
    </>
  );
};

export default Navigation;
