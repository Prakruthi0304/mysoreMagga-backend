import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader, ShoppingBag, Scissors, Leaf, Store } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const roles = [
  { id: "consumer", label: "Consumer", desc: "Buy & sell sarees", icon: ShoppingBag },
  { id: "weaver", label: "Weaver", desc: "Sell your handcrafted sarees", icon: Scissors },
  { id: "farmer", label: "Silk Farmer", desc: "Sell raw silk directly", icon: Leaf },
  { id: "store", label: "Retail Store", desc: "Bulk procurement", icon: Store },
];

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"role" | "details">("role");
  const [selectedRole, setSelectedRole] = useState("consumer");
  const [form, setForm] = useState({ name: "", email: "", password: "", businessName: "", location: "", specialization: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
        toast.success("Welcome back!");
      } else {
        await signup(form.name, form.email, form.password, selectedRole, {
          businessName: form.businessName,
          location: form.location,
          specialization: form.specialization,
          phone: form.phone,
        });
        toast.success("Welcome to Silk Heritage!");
      }
      onClose();
      setStep("role");
      setForm({ name: "", email: "", password: "", businessName: "", location: "", specialization: "", phone: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isProducer = selectedRole === "weaver" || selectedRole === "farmer";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <h2 className="font-playfair text-3xl font-bold text-maroon">
                {mode === "login" ? "Welcome Back" : "Join Us"}
              </h2>
              <p className="font-inter text-muted-foreground text-sm mt-1">
                {mode === "login" ? "Sign in to your account" : "Create your Silk Heritage account"}
              </p>
            </div>

            {mode === "signup" && step === "role" && (
              <div>
                <p className="font-inter text-sm font-semibold text-maroon mb-3">I am a...</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedRole === role.id ? "border-maroon bg-maroon/5 shadow-md" : "border-border hover:border-gold"}`}>
                        <Icon size={22} className={selectedRole === role.id ? "text-maroon" : "text-muted-foreground"} />
                        <p className={`font-inter text-sm font-bold mt-2 ${selectedRole === role.id ? "text-maroon" : "text-foreground"}`}>{role.label}</p>
                        <p className="font-inter text-xs text-muted-foreground mt-0.5">{role.desc}</p>
                      </button>
                    );
                  })}
                </div>
                <button onClick={() => setStep("details")}
                  className="w-full py-4 bg-maroon text-gold font-inter font-semibold rounded-full hover:bg-gold hover:text-maroon transition-all">
                  Continue as {roles.find(r => r.id === selectedRole)?.label} →
                </button>
              </div>
            )}

            {mode === "signup" && step === "details" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <button type="button" onClick={() => setStep("role")} className="text-xs text-muted-foreground hover:text-gold font-inter mb-2">← Change role</button>
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Full Name *</label>
                  <input name="name" type="text" value={form.name} onChange={handleChange} required
                    className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="Your name" />
                </div>
                {isProducer && (
                  <div>
                    <label className="font-inter text-xs text-muted-foreground mb-1 block">{selectedRole === "weaver" ? "Weaving Business Name" : "Farm Name"}</label>
                    <input name="businessName" type="text" value={form.businessName} onChange={handleChange}
                      className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold"
                      placeholder={selectedRole === "weaver" ? "e.g. Ramaiah Silk Works" : "e.g. Karnataka Silk Farm"} />
                  </div>
                )}
                {isProducer && (
                  <div>
                    <label className="font-inter text-xs text-muted-foreground mb-1 block">Village / Location</label>
                    <input name="location" type="text" value={form.location} onChange={handleChange}
                      className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="e.g. Mysore, Karnataka" />
                  </div>
                )}
                {selectedRole === "weaver" && (
                  <div>
                    <label className="font-inter text-xs text-muted-foreground mb-1 block">Specialization</label>
                    <input name="specialization" type="text" value={form.specialization} onChange={handleChange}
                      className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="e.g. Gold Zari Weaving" />
                  </div>
                )}
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Phone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                    className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Password *</label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6}
                    className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="Min 6 characters" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-maroon text-gold font-inter font-semibold rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <><Loader size={16} className="animate-spin" /> Please wait...</> : "Create Account"}
                </button>
              </form>
            )}

            {mode === "login" && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="font-inter text-xs text-muted-foreground mb-1 block">Password</label>
                  <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6}
                    className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:border-gold" placeholder="Min 6 characters" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-maroon text-gold font-inter font-semibold rounded-full hover:bg-gold hover:text-maroon transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <><Loader size={16} className="animate-spin" /> Please wait...</> : "Sign In"}
                </button>
              </form>
            )}

            <p className="text-center font-inter text-sm text-muted-foreground mt-6">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setStep("role"); }}
                className="text-gold hover:underline font-semibold">
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;