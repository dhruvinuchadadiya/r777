import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/core/context/AuthContext";
import { useToast } from "@/core/hooks/use-toast";
import { Eye, EyeOff, Lock, RefreshCw, Shield, User } from "lucide-react";
import { useEffect, useState } from "react";

const LoginDialog = ({ open, onOpenChange, onSwitchToSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput("");
  };

  useEffect(() => {
    if (open) {
      generateCaptcha();
    }
  }, [open]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter username and password",
        variant: "destructive",
      });
      return;
    }

    if (captchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
      toast({
        title: "Invalid Captcha",
        description: "Please enter the correct captcha code",
        variant: "destructive",
      });
      generateCaptcha();
      return;
    }

    setIsLoading(true);

    try {
      await login(username, password);
      toast({
        title: "Login Successful!",
        description: "Welcome to R777 Casino",
        className: "bg-green-500 text-white",
      });
      onOpenChange(false);
      setUsername("");
      setPassword("");
      setCaptchaInput("");
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.message || "Invalid credentials",
        variant: "destructive",
      });
      generateCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] flex flex-col bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] border-2 border-[#0B5563] text-white p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
          <DialogTitle className="text-center text-2xl font-bold text-white mb-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0B5563] font-bold text-xl">R</span>
              </div>
              <span>R777 Login</span>
            </div>
          </DialogTitle>
          <p className="text-center text-gray-400 text-sm">
            Welcome back! Please login to your account
          </p>
        </DialogHeader>

        <form
          onSubmit={handleLogin}
          className="space-y-5 px-6 pb-6 mt-2 overflow-y-auto"
        >
          {/* Username */}
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-white flex items-center space-x-2"
            >
              <User size={16} />
              <span>Username / User ID</span>
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pl-10 h-12"
              />
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-white flex items-center space-x-2"
            >
              <Lock size={16} />
              <span>Password</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pl-10 pr-10 h-12"
              />
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
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

          {/* Captcha */}
          <div className="space-y-2">
            <Label
              htmlFor="captcha"
              className="text-white flex items-center space-x-2"
            >
              <Shield size={16} />
              <span>Verification Code</span>
            </Label>
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  id="captcha"
                  type="text"
                  placeholder="Enter code"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-12"
                  maxLength={6}
                />
              </div>
              <div className="relative">
                <div className="h-12 px-6 bg-gradient-to-r from-[#0B5563] to-[#0D6F7E] rounded flex items-center justify-center select-none">
                  <span
                    className="text-2xl font-bold tracking-wider text-white"
                    style={{
                      fontFamily: "monospace",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                      letterSpacing: "4px",
                    }}
                  >
                    {captchaCode}
                  </span>
                </div>
              </div>
              <Button
                type="button"
                onClick={generateCaptcha}
                className="h-12 w-12 bg-[#2d2d44] hover:bg-[#3d3d54] border border-[#0B5563]"
              >
                <RefreshCw size={18} />
              </Button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="border-[#0B5563] data-[state=checked]:bg-[#34D399]"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-300 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-[#34D399] hover:text-[#10B981] transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#10B981] hover:to-[#059669] text-white font-bold text-lg shadow-lg transition"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="animate-spin" size={20} />
                <span>Logging in...</span>
              </div>
            ) : (
              "LOGIN"
            )}
          </Button>

          {/* Demo Credentials */}
          <div className="bg-[#2d2d44] p-4 rounded-lg border border-[#0B5563]">
            <p className="text-xs text-gray-400 text-center mb-2">
              Demo Credentials:
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <div>
                <span className="text-gray-500">ID:</span>
                <span className="text-[#34D399] ml-1 font-mono">demo</span>
              </div>
              <div>
                <span className="text-gray-500">Pass:</span>
                <span className="text-[#34D399] ml-1 font-mono">Abcd1234</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUsername("demo");
                setPassword("Abcd1234");
              }}
              className="text-xs text-cyan-400 hover:text-cyan-300 mt-2 w-full"
            >
              Click to auto-fill
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-[#2d2d44]">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  if (typeof onSwitchToSignUp === "function")
                    onSwitchToSignUp();
                }}
                className="text-[#34D399] hover:text-[#10B981] font-semibold transition"
              >
                Sign Up Now
              </button>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
