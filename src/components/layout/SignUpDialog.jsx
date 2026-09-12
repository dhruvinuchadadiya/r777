import { Checkbox } from "@radix-ui/react-checkbox";
import { Eye, EyeOff, Lock, Mail, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../core/context/AuthContext";
import { useToast } from "../../core/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SignUpDialog = ({ open, onOpenChange, onSwitchToLogin }) => {
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

  if (!open) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Centered Modal Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] border-2 border-[#0B5563] text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-2 shrink-0 border-b border-[#0B5563]/40">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#0B5563] font-bold text-xl">R</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>
          <p className="text-center text-gray-400 text-xs">
            Join R777 and start winning today!
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSignUp}
          className="space-y-3.5 px-6 pb-6 mt-3 overflow-y-auto max-h-[calc(90vh-100px)]"
        >
          {/* Username */}
          <div className="space-y-1">
            <label
              htmlFor="signup-username"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <User size={14} />
              <span>Username *</span>
            </label>
            <Input
              id="signup-username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-10 text-sm focus:ring-1 focus:ring-[#34D399]"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <Mail size={14} />
              <span>Email Address *</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-10 text-sm focus:ring-1 focus:ring-[#34D399]"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <Phone size={14} />
              <span>Phone Number *</span>
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXXXXXXX"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-10 text-sm focus:ring-1 focus:ring-[#34D399]"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="signup-password"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <Lock size={14} />
              <span>Password *</span>
            </label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pr-10 h-10 text-sm focus:ring-1 focus:ring-[#34D399]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label
              htmlFor="confirm-password"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <Lock size={14} />
              <span>Confirm Password *</span>
            </label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pr-10 h-10 text-sm focus:ring-1 focus:ring-[#34D399]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div className="space-y-1">
            <label
              htmlFor="referral"
              className="text-xs font-semibold text-white"
            >
              Referral Code (Optional)
            </label>
            <Input
              id="referral"
              type="text"
              placeholder="Enter referral code"
              value={formData.referralCode}
              onChange={(e) => handleChange("referralCode", e.target.value)}
              className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-10 text-sm focus:ring-1 focus:ring-[#34D399]"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2 pt-1">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={setAgreeTerms}
              className="w-4 h-4 rounded border-[#0B5563] bg-[#2d2d44] data-[state=checked]:bg-[#34D399] data-[state=checked]:text-[#0f0f1e] mt-0.5 shrink-0"
            />
            <label
              htmlFor="terms"
              className="text-xs text-gray-300 cursor-pointer leading-relaxed select-none"
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
            className="w-full h-10 bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] text-gray-950 font-bold text-base shadow-lg transition mt-2"
          >
            {isLoading ? "Creating Account..." : "SIGN UP"}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2 border-t border-[#2d2d44]">
            <p className="text-xs text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  if (typeof onSwitchToLogin === "function") onSwitchToLogin();
                }}
                className="text-[#34D399] hover:underline font-semibold transition"
              >
                Login Here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default SignUpDialog;
