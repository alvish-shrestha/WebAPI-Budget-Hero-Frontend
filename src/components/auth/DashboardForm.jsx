import { useState } from "react"
import { Calendar, BarChart3, CreditCard, MoreHorizontal, Plus, Smartphone, UtensilsCrossed, Menu } from "lucide-react"

export default function DashboardForm() {
  const [activeTab, setActiveTab] = useState("05/05")

  const summaryData = [
    { label: "Income", value: "8700.00", color: "text-blue-600" },
    { label: "Exp", value: "6100.00", color: "text-red-500" },
    { label: "Total", value: "Rs. 2600.00", color: "text-gray-800" },
  ]

  const historyItems = [
    {
      icon: UtensilsCrossed,
      category: "Food",
      account: "Momo Bank Account",
      amount: "Rs 6000",
      color: "text-red-500",
    },
    {
      icon: Smartphone,
      category: "Balance",
      account: "Phone Bank Account",
      amount: "Rs 100.00",
      color: "text-red-500",
    },
  ]

  const sidebarItems = [
    { icon: Calendar, label: "05/05", active: true },
    { icon: BarChart3, label: "Stats", active: false },
    { icon: CreditCard, label: "Accounts", active: false },
    { icon: MoreHorizontal, label: "More", active: false },
  ]

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-80 bg-gradient-to-b from-red-400 to-red-500 p-6 flex flex-col">
        {/* User Profile */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img src="/placeholder.svg?height=48&width=48" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">Hi, Alvish Shrestha</h3>
            </div>
            <Menu className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-3 flex-1">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all duration-200 ${item.label === activeTab
                  ? "bg-white text-gray-800 shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={confirmLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {summaryData.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium mb-2">{item.label}</p>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">History:</h2>

          <div className="space-y-4">
            {historyItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{item.category}</p>
                    <p className="text-gray-500 text-sm">{item.account}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${item.color}`}>{item.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Add Button */}
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group">
          <Plus className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  )
}
