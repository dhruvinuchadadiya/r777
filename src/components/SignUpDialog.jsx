import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Eye, EyeOff, User, Lock, Mail, Phone } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "../context/AuthContext";

const SignUpDialog = ({ open, onOpenChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { signUp } = useAuth();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to terms and conditions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData);
      toast({
        title: "Registration Successful!",
        description: "Your account has been created",
        className: "bg-green-500 text-white",
      });
      onOpenChange(false);
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] border-2 border-[#0B5563] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white mb-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0B5563] font-bold text-xl">R</span>
              </div>
              <span>Create Account</span>
            </div>
          </DialogTitle>
          <p className="text-center text-gray-400 text-sm">
            Join R777 and start winning today!
          </p>
        </DialogHeader>

        <form onSubmit={handleSignUp} className="space-y-4 mt-4">
          {/* Username */}
          <div className="space-y-2">
            <Label
              htmlFor="signup-username"
              className="text-white flex items-center space-x-2"
            >
              <User size={16} />
              <span>Username *</span>
            </Label>
            <Input
              id="signup-username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-11"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-white flex items-center space-x-2"
            >
              <Mail size={16} />
              <span>Email Address *</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-11"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-white flex items-center space-x-2"
            >
              <Phone size={16} />
              <span>Phone Number *</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXXXXXXX"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="signup-password"
              className="text-white flex items-center space-x-2"
            >
              <Lock size={16} />
              <span>Password *</span>
            </Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pr-10 h-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirm-password"
              className="text-white flex items-center space-x-2"
            >
              <Lock size={16} />
              <span>Confirm Password *</span>
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pr-10 h-11"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div className="space-y-2">
            <Label htmlFor="referral" className="text-white text-sm">
              Referral Code (Optional)
            </Label>
            <Input
              id="referral"
              type="text"
              placeholder="Enter referral code"
              value={formData.referralCode}
              onChange={(e) => handleChange("referralCode", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-11"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={setAgreeTerms}
              className="border-[#0B5563] data-[state=checked]:bg-[#34D399] mt-1"
            />
            <label
              htmlFor="terms"
              className="text-xs text-gray-300 cursor-pointer leading-relaxed"
            >
              I agree to the{" "}
              <span className="text-[#34D399] hover:underline">
                Terms & Conditions
              </span>
              ,{" "}
              <span className="text-[#34D399] hover:underline">
                Privacy Policy
              </span>
              , and confirm that I am 18 years or older.
            </label>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] text-white font-bold text-lg shadow-lg transition"
          >
            {isLoading ? "Creating Account..." : "SIGN UP"}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-3 border-t border-[#2d2d44]">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-[#34D399] hover:text-[#10B981] font-semibold transition"
              >
                Login Here
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
