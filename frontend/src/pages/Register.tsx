import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mountain, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const employeeIdPrefixes = [
  { value: "AD", label: "AD - Administrator" },
  { value: "SV", label: "SV - Supervisor" },
  { value: "SM", label: "SM - Safety Manager" },
  { value: "OP", label: "OP - Operator" },
];

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeIdPrefix, setEmployeeIdPrefix] = useState("");
  const [employeeIdNumber, setEmployeeIdNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (employeeIdNumber.length !== 4 || !/^\d+$/.test(employeeIdNumber)) {
      toast({
        title: "Invalid Employee ID",
        description: "Employee ID must be exactly 4 digits.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const employeeId = `${employeeIdPrefix}${employeeIdNumber}`;

      // ✅ FIX: await register
      const success = await register({
        firstName,
        lastName,
        email,
        password,
        employeeId,
      });

      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to Terra Watchers!",
        });
        navigate("/dashboard"); // 🔁 safer than direct dashboard
      } else {
        toast({
          title: "Registration failed",
          description: "Email or Employee ID already exists.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Backend not responding.",
        variant: "destructive",
      });
    } finally {
      // ✅ ALWAYS reset loading
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mining-gradient p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary p-4 rounded-full">
              <Mountain className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            TERRA WATCHERS
          </CardTitle>
          <CardDescription>
            Create your account to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Employee ID</Label>
              <div className="flex gap-2">
                <Select value={employeeIdPrefix} onValueChange={setEmployeeIdPrefix}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeIdPrefixes.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="0012"
                  value={employeeIdNumber}
                  onChange={(e) =>
                    setEmployeeIdNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 4)
                    )
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !employeeIdPrefix}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
