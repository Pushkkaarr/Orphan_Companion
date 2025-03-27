import React, { useState } from "react";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ChildManagement from "@/components/admin/ChildManagement";
import DonationsManagement from "@/components/admin/DonationsManagement";
import InventoryManagement from "@/components/admin/InventoryManagement";
import ReportsAnalytics from "@/components/admin/ReportsAnalytics";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLogin = (username, password) => {
    // For demo purposes, using hardcoded credentials
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Portal</h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
        >
          Logout
        </button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid grid-cols-5 gap-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="children">Children</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="children">
          <ChildManagement />
        </TabsContent>
        
        <TabsContent value="donations">
          <DonationsManagement />
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
