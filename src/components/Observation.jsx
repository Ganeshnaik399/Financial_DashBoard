import { ShoppingCart, Trophy, Zap } from 'lucide-react';

const ObsItem = ({ icon: Icon, color, text }) => (
  <div className="flex gap-4">
    <div className={`p-2 rounded-lg bg-slate-800/50 ${color}`}>
      <Icon size={18} />
    </div>
    <p className="text-xs leading-relaxed text-slate-300 font-medium">{text}</p>
  </div>
);

export default function Observations() {
  return (
    <div className="bg-[#1E1E2D] p-8 rounded-[2rem] text-white shadow-xl">
      <div className="flex items-center gap-2 mb-8 opacity-60 uppercase text-[10px] font-black tracking-widest">
        <Zap size={14} /> Observations
      </div>
      <div className="space-y-8">
        <ObsItem 
          icon={ShoppingCart} color="text-indigo-400" 
          text="Your grocery spending is up 15% this month. Consider checking your subscription services." 
        />
        <ObsItem 
          icon={Trophy} color="text-emerald-400" 
          text="Great job! You saved more than usual in march . Your liquid buffer grew by ₹1,200." 
        />
      </div>
    </div>
  );
}