import React from "react";
import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (): string => {
    if (!user) return "U";
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-primary flex items-center justify-between px-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-primary-foreground/20 p-2 rounded-lg">
          <Mountain className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-primary-foreground tracking-wide">
          TERRA WATCHERS
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-primary-foreground font-medium">
          {user?.firstName} {user?.lastName}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full p-0 hover:bg-primary-foreground/20"
            >
              <Avatar className="h-10 w-10 border-2 border-primary-foreground">
                <AvatarFallback className="bg-primary-foreground text-primary font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-card" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-semibold">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employee ID:</span>
                <span className="font-medium">{user?.employeeId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Job Role:</span>
                <span className="font-medium">{user?.jobRole}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive cursor-pointer"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
