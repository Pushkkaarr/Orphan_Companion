import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, Search, Filter, Pencil, Trash, User, Calendar, MapPin, Heart, School, Activity } from "lucide-react";

// Sample data for children
const children = [
  { id: 1, name: "Emma Smith", age: 8, gender: "Female", background: "Lost parents in accident", medical: "Healthy", education: "Grade 3", location: "Main Center", status: "Available" },
  { id: 2, name: "James Lee", age: 5, gender: "Male", background: "Abandoned", medical: "Asthma", education: "Kindergarten", location: "Main Center", status: "In adoption process" },
  { id: 3, name: "Olivia Johnson", age: 10, gender: "Female", background: "Parents unable to care", medical: "Healthy", education: "Grade 5", location: "East Branch", status: "Available" },
  { id: 4, name: "Noah Williams", age: 7, gender: "Male", background: "Orphaned", medical: "Minor allergies", education: "Grade 2", location: "Main Center", status: "Sponsored" },
  { id: 5, name: "Sophia Roberts", age: 12, gender: "Female", background: "Family crisis", medical: "Healthy", education: "Grade 7", location: "West Branch", status: "Available" },
  { id: 6, name: "William Davis", age: 3, gender: "Male", background: "Abandoned", medical: "Healthy", education: "Pre-K", location: "Main Center", status: "In adoption process" },
  { id: 7, name: "Isabella Thomas", age: 9, gender: "Female", background: "Parents deceased", medical: "Requires glasses", education: "Grade 4", location: "South Branch", status: "Sponsored" },
  { id: 8, name: "Lucas Brown", age: 6, gender: "Male", background: "Parents unable to care", medical: "Healthy", education: "Grade 1", location: "Main Center", status: "Available" },
];

const ChildManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter function
  const filteredChildren = children.filter(child => {
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         child.background.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || child.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ( string ) => {
    let color = "bg-gray-100 text-gray-800";
    
    if (status === "Available") {
      color = "bg-green-100 text-green-800";
    } else if (status === "In adoption process") {
      color = "bg-blue-100 text-blue-800";
    } else if (status === "Sponsored") {
      color = "bg-purple-100 text-purple-800";
    }
    
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Child Management</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search children..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden md:inline">Filter</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Child</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add New Child</SheetTitle>
                <SheetDescription>
                  Add a new child to the system. Fill in all the required information.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input id="name" placeholder="Full name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="age" className="text-sm font-medium">Age</label>
                    <Input id="age" type="number" placeholder="Age" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                    <Input id="gender" placeholder="Gender" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="background" className="text-sm font-medium">Background</label>
                  <Input id="background" placeholder="Brief background" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="medical" className="text-sm font-medium">Medical Information</label>
                  <Input id="medical" placeholder="Medical information" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="education" className="text-sm font-medium">Education</label>
                  <Input id="education" placeholder="Current education" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">Location</label>
                  <Input id="location" placeholder="Center location" />
                </div>
                
                <div className="pt-4">
                  <Button className="w-full">Add Child</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <User className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Children</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-10 w-10 text-red-500 bg-red-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Adoption Process</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <School className="h-10 w-10 text-blue-500 bg-blue-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">In School</p>
                <p className="text-2xl font-bold">38</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-10 w-10 text-green-500 bg-green-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medical Needs</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Children Table */}
      <Card>
        <CardHeader>
          <CardTitle>Children</CardTitle>
          <CardDescription>View and manage all children in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Background</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChildren.map((child) => (
                <TableRow key={child.id}>
                  <TableCell>#{child.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {child.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{child.name}</p>
                        <p className="text-xs text-muted-foreground">{child.gender}, {child.age} years</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{child.age}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={child.background}>
                    {child.background}
                  </TableCell>
                  <TableCell>{child.education}</TableCell>
                  <TableCell>{child.location}</TableCell>
                  <TableCell><StatusBadge status={child.status} /></TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildManagement;
