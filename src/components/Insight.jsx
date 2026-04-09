import NetWorthHero from './NetWorthHero.jsx';
import TrendChart from './TrendChart.jsx';
import SpendingPie from './SpendingPie.jsx';
import Observations from './Observation.jsx';
export default function Insights() {
    return(
        <main className="flex-1 ">
                
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                  {/* Top Section */}
                  <section className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">Financial Insights</h1>
                    <p className="text-slate-500">Detailed breakdown of your capital performance and behavior.</p>
                  </section>
        
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (Main Charts) */}
                    <div className="lg:col-span-2 space-y-8">
                      <NetWorthHero />
                      
                      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="font-bold mb-4">Trend Analysis</h3>
                        <TrendChart />
                      </div>
                    </div>
        
                    {/* Right Column (Sidebar Widgets) */}
                    <div className="space-y-8">
                      <SpendingPie />
                      <Observations />
                      
                      {/* CTA Card for advice */}
                      <div className="bg-indigo-50 p-6 rounded-[2rem] text-center border border-indigo-100">
                        <h4 className="font-bold text-indigo-900">Book an Advisory Session</h4>
                        <p className="text-xs text-indigo-600 mt-2">Get personalized insights from our wealth experts.</p>
                        <button className="mt-4 w-full py-3 bg-white text-indigo-600 font-bold rounded-2xl shadow-sm hover:bg-indigo-100 transition-colors">
                          Schedule Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
    )
}