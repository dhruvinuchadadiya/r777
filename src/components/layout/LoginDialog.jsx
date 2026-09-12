import { Checkbox } from "@radix-ui/react-checkbox";
import { Eye, EyeOff, Lock, RefreshCw, Shield, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../core/context/AuthContext";
import { useToast } from "../../core/hooks/use-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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

  if (!open) return null;

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Centered Modal Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] border-2 border-[#0B5563] text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition p-1"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-2 shrink-0">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#0B5563] font-bold text-xl">R</span>
            </div>
            <h2 className="text-2xl font-bold text-white">R777 Login</h2>
          </div>
          <p className="text-center text-gray-400 text-xs">
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleLogin}
          className="space-y-4 px-6 pb-6 mt-2 overflow-y-auto max-h-[calc(90vh-100px)]"
        >
          {/* Username */}
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <User size={14} />
              <span>Username / User ID</span>
            </label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pl-10 h-10 text-sm"
              />
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <Lock size={14} />
              <span>Password</span>
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 pl-10 pr-10 h-10 text-sm"
              />
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
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

          {/* Captcha */}
          <div className="space-y-1">
            <label
              htmlFor="captcha"
              className="text-xs font-semibold text-white flex items-center space-x-2"
            >
              <Shield size={14} />
              <span>Verification Code</span>
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="captcha"
                  type="text"
                  placeholder="Enter code"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="bg-[#2d2d44] border-[#0B5563] text-white placeholder:text-gray-500 h-10 text-sm"
                  maxLength={6}
                />
              </div>
              <div className="h-10 px-4 bg-gradient-to-r from-[#0B5563] to-[#0D6F7E] rounded flex items-center justify-center select-none shrink-0">
                <span
                  className="text-lg font-bold tracking-wider text-white"
                  style={{
                    fontFamily: "monospace",
                    letterSpacing: "3px",
                  }}
                >
                  {captchaCode}
                </span>
              </div>
              <Button
                type="button"
                onClick={generateCaptcha}
                className="h-10 w-10 p-0 bg-[#2d2d44] hover:bg-[#3d3d54] border border-[#0B5563] shrink-0"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={setRememberMe}
                className="w-4 h-4 rounded border-[#0B5563] bg-[#2d2d44] data-[state=checked]:bg-[#34D399]"
              />
              <label
                htmlFor="remember"
                className="text-gray-300 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <button type="button" className="text-[#34D399] hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-10 bg-gradient-to-r from-[#34D399] to-[#10B981] text-gray-950 font-bold text-base shadow-lg transition mt-2"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="animate-spin" size={16} />
                <span>Logging in...</span>
              </div>
            ) : (
              "LOGIN"
            )}
          </Button>

          {/* Demo Credentials */}
          <div className="bg-[#2d2d44]/80 p-2.5 rounded-lg border border-[#0B5563]">
            <p className="text-[11px] text-gray-400 text-center mb-1">
              Demo Credentials:
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <div>
                <span className="text-gray-400">ID:</span>
                <span className="text-[#34D399] ml-1 font-mono font-bold">
                  demo
                </span>
              </div>
              <div>
                <span className="text-gray-400">Pass:</span>
                <span className="text-[#34D399] ml-1 font-mono font-bold">
                  Abcd1234
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUsername("demo");
                setPassword("Abcd1234");
              }}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 mt-1 w-full text-center underline"
            >
              Click to auto-fill
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-2 border-t border-[#2d2d44]">
            <p className="text-xs text-gray-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  if (typeof onSwitchToSignUp === "function")
                    onSwitchToSignUp();
                }}
                className="text-[#34D399] hover:underline font-semibold"
              >
                Sign Up Now
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default LoginDialog;
