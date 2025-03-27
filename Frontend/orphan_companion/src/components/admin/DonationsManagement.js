import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Package, Eye, CheckCircle, XCircle, Download, Search, Filter } from "lucide-react";

// Sample data for monetary donations
const monetaryDonations = [
  { id: 1, donor: "John Smith", email: "john@example.com", amount: 100, date: "2023-07-15", status: "Completed", type: "One-time" },
  { id: 2, donor: "Emily Johnson", email: "emily@example.com", amount: 50, date: "2023-07-14", status: "Completed", type: "Monthly" },
  { id: 3, donor: "Michael Brown", email: "michael@example.com", amount: 200, date: "2023-07-13", status: "Completed", type: "One-time" },
  { id: 4, donor: "Sarah Davis", email: "sarah@example.com", amount: 75, date: "2023-07-12", status: "Pending", type: "One-time" },
  { id: 5, donor: "Robert Wilson", email: "robert@example.com", amount: 150, date: "2023-07-11", status: "Completed", type: "Monthly" },
  { id: 6, donor: "Jennifer Taylor", email: "jennifer@example.com", amount: 25, date: "2023-07-10", status: "Failed", type: "One-time" },
  { id: 7, donor: "David Miller", email: "david@example.com", amount: 300, date: "2023-07-09", status: "Completed", type: "One-time" },
  { id: 8, donor: "Lisa Anderson", email: "lisa@example.com", amount: 60, date: "2023-07-08", status: "Completed", type: "Monthly" },
];

// Sample data for physical donations
const physicalDonations = [
  { id: 1, donor: "Amanda Clark", email: "amanda@example.com", items: "Winter clothes (10 pcs)", category: "Clothes", date: "2023-07-15", status: "Received", method: "Drop-off" },
  { id: 2, donor: "Thomas White", email: "thomas@example.com", items: "Children's books (15 pcs)", category: "Books", date: "2023-07-14", status: "Scheduled", method: "Pickup" },
  { id: 3, donor: "Patricia Moore", email: "patricia@example.com", items: "Toys (5 pcs)", category: "Toys", date: "2023-07-13", status: "Received", method: "Drop-off" },
  { id: 4, donor: "James Lee", email: "james@example.com", items: "School supplies", category: "Stationery", date: "2023-07-12", status: "Scheduled", method: "Pickup" },
  { id: 5, donor: "Jessica Harris", email: "jessica@example.com", items: "Food packages (20 pcs)", category: "Food", date: "2023-07-11", status: "Received", method: "Drop-off" },
  { id: 6, donor: "Daniel Martin", email: "daniel@example.com", items: "Art supplies", category: "Stationery", date: "2023-07-10", status: "In transit", method: "Pickup" },
];

const DonationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter functions
  const filteredMonetaryDonations = monetaryDonations.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const filteredPhysicalDonations = physicalDonations.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donation.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         donation.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || donation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = (string ) => {
    let color = "bg-gray-100 text-gray-800";
    
    if (status === "Completed" || status === "Received") {
      color = "bg-green-100 text-green-800";
    } else if (status === "Pending" || status === "Scheduled" || status === "In transit") {
      color = "bg-blue-100 text-blue-800";
    } else if (status === "Failed") {
      color = "bg-red-100 text-red-800";
    }
    
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Donations Management</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search donations..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden md:inline">Filter</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                <p className="text-2xl font-bold">$36,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Package className="h-10 w-10 text-orange-500 bg-orange-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Physical Items</p>
                <p className="text-2xl font-bold">250 items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-10 w-10 text-green-500 bg-green-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-10 w-10 text-red-500 bg-red-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed/Pending</p>
                <p className="text-2xl font-bold">15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Donation Tables */}
      <Tabs defaultValue="monetary" className="w-full">
        <TabsList>
          <TabsTrigger value="monetary">Monetary Donations</TabsTrigger>
          <TabsTrigger value="physical">Physical Donations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monetary">
          <Card>
            <CardHeader>
              <CardTitle>Monetary Donations</CardTitle>
              <CardDescription>View and manage all monetary donations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMonetaryDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>#{donation.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{donation.donor}</p>
                          <p className="text-sm text-muted-foreground">{donation.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>${donation.amount}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.type}</TableCell>
                      <TableCell><StatusBadge status={donation.status} /></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="physical">
          <Card>
            <CardHeader>
              <CardTitle>Physical Donations</CardTitle>
              <CardDescription>View and manage all physical item donations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPhysicalDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>#{donation.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{donation.donor}</p>
                          <p className="text-sm text-muted-foreground">{donation.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{donation.items}</TableCell>
                      <TableCell>{donation.category}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.method}</TableCell>
                      <TableCell><StatusBadge status={donation.status} /></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonationsManagement;
