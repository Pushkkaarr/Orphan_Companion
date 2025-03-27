import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Search, Filter, Download, Heart, CheckCircle, XCircle, Clock } from "lucide-react";

// Sample data for full adoptions
const fullAdoptions = [
  { id: 1, applicant: "Mark Johnson", email: "mark@example.com", phone: "555-123-4567", childId: 3, childName: "Emma S.", date: "2023-07-15", status: "Under Review" },
  { id: 2, applicant: "Laura & David Smith", email: "laura@example.com", phone: "555-987-6543", childId: 5, childName: "James L.", date: "2023-07-10", status: "Approved" },
  { id: 3, applicant: "Rachel Williams", email: "rachel@example.com", phone: "555-456-7890", childId: 8, childName: "Sophia R.", date: "2023-07-05", status: "Home Study" },
  { id: 4, applicant: "Kevin & Susan Brown", email: "kevin@example.com", phone: "555-789-0123", childId: 12, childName: "Noah P.", date: "2023-06-28", status: "Final Steps" },
  { id: 5, applicant: "Michelle Taylor", email: "michelle@example.com", phone: "555-234-5678", childId: 15, childName: "Olivia M.", date: "2023-06-20", status: "Rejected" },
  { id: 6, applicant: "Brian Clark", email: "brian@example.com", phone: "555-345-6789", childId: 18, childName: "Ethan K.", date: "2023-06-15", status: "Under Review" },
];

// Sample data for virtual adoptions
const virtualAdoptions = [
  { id: 1, sponsor: "Alice Thompson", email: "alice@example.com", childId: 2, childName: "Isabella J.", amount: "$50/month", duration: "12 months", date: "2023-07-15", status: "Active" },
  { id: 2, sponsor: "John Peterson", email: "john@example.com", childId: 4, childName: "Michael T.", amount: "$30/month", duration: "Ongoing", date: "2023-07-12", status: "Active" },
  { id: 3, sponsor: "Emma Rogers", email: "emma@example.com", childId: 7, childName: "Alexander W.", amount: "$100/month", duration: "6 months", date: "2023-07-08", status: "Active" },
  { id: 4, sponsor: "George Wilson", email: "george@example.com", childId: 9, childName: "Sofia C.", amount: "$50/month", duration: "12 months", date: "2023-07-03", status: "Pending" },
  { id: 5, sponsor: "Hannah Morris", email: "hannah@example.com", childId: 11, childName: "William D.", amount: "$30/month", duration: "24 months", date: "2023-06-25", status: "Active" },
  { id: 6, sponsor: "Samuel Green", email: "samuel@example.com", childId: 14, childName: "Charlotte P.", amount: "$75/month", duration: "Ongoing", date: "2023-06-18", status: "Inactive" },
  { id: 7, sponsor: "Olivia Barnes", email: "olivia@example.com", childId: 16, childName: "Lucas M.", amount: "$40/month", duration: "12 months", date: "2023-06-10", status: "Active" },
  { id: 8, sponsor: "Daniel Johnson", email: "daniel@example.com", childId: 19, childName: "Amelia S.", amount: "$50/month", duration: "6 months", date: "2023-06-05", status: "Pending" },
];

const AdoptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter functions
  const filteredFullAdoptions = fullAdoptions.filter(adoption => {
    const matchesSearch = adoption.applicant.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         adoption.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         adoption.childName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || adoption.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const filteredVirtualAdoptions = virtualAdoptions.filter(adoption => {
    const matchesSearch = adoption.sponsor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         adoption.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         adoption.childName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || adoption.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ( string ) => {
    let color = "bg-gray-100 text-gray-800";
    
    if (status === "Active" || status === "Approved" || status === "Final Steps") {
      color = "bg-green-100 text-green-800";
    } else if (status === "Pending" || status === "Under Review" || status === "Home Study") {
      color = "bg-blue-100 text-blue-800";
    } else if (status === "Rejected" || status === "Inactive") {
      color = "bg-red-100 text-red-800";
    }
    
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Adoption Management</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search adoptions..."
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
              <Heart className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Adoptions</p>
                <p className="text-2xl font-bold">56</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-10 w-10 text-green-500 bg-green-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved/Active</p>
                <p className="text-2xl font-bold">38</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-10 w-10 text-blue-500 bg-blue-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-10 w-10 text-red-500 bg-red-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected/Inactive</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Adoption Tables */}
      <Tabs defaultValue="full" className="w-full">
        <TabsList>
          <TabsTrigger value="full">Full Adoptions</TabsTrigger>
          <TabsTrigger value="virtual">Virtual Adoptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="full">
          <Card>
            <CardHeader>
              <CardTitle>Full Adoption Applications</CardTitle>
              <CardDescription>View and manage full adoption requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Child</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Application Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFullAdoptions.map((adoption) => (
                    <TableRow key={adoption.id}>
                      <TableCell>#{adoption.id}</TableCell>
                      <TableCell className="font-medium">{adoption.applicant}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{adoption.childName}</p>
                          <p className="text-sm text-muted-foreground">ID: {adoption.childId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{adoption.email}</p>
                          <p className="text-sm text-muted-foreground">{adoption.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{adoption.date}</TableCell>
                      <TableCell><StatusBadge status={adoption.status} /></TableCell>
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
        
        <TabsContent value="virtual">
          <Card>
            <CardHeader>
              <CardTitle>Virtual Adoption Sponsorships</CardTitle>
              <CardDescription>View and manage virtual adoption sponsorships</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Sponsor</TableHead>
                    <TableHead>Child</TableHead>
                    <TableHead>Sponsorship</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVirtualAdoptions.map((adoption) => (
                    <TableRow key={adoption.id}>
                      <TableCell>#{adoption.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{adoption.sponsor}</p>
                          <p className="text-sm text-muted-foreground">{adoption.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{adoption.childName}</p>
                          <p className="text-sm text-muted-foreground">ID: {adoption.childId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{adoption.amount}</p>
                          <p className="text-sm text-muted-foreground">{adoption.duration}</p>
                        </div>
                      </TableCell>
                      <TableCell>{adoption.date}</TableCell>
                      <TableCell><StatusBadge status={adoption.status} /></TableCell>
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

export default AdoptionManagement;
