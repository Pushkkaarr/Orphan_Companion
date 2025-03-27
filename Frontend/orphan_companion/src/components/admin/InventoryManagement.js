import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Package, Search, Filter, Plus, Pencil, Trash, ArrowDown, ArrowUp, ShoppingBag, BookOpen, Shirt, Coffee, Gamepad } from "lucide-react";

// Sample data for inventory items
const inventoryItems = [
  { id: 1, name: "Winter Jackets", category: "Clothes", quantity: 25, status: "In Stock", lastUpdated: "2023-07-15" },
  { id: 2, name: "Children's Books", category: "Books", quantity: 150, status: "In Stock", lastUpdated: "2023-07-14" },
  { id: 3, name: "School Backpacks", category: "Stationery", quantity: 30, status: "In Stock", lastUpdated: "2023-07-12" },
  { id: 4, name: "Toys", category: "Toys", quantity: 85, status: "In Stock", lastUpdated: "2023-07-10" },
  { id: 5, name: "Food Packages", category: "Food", quantity: 10, status: "Low Stock", lastUpdated: "2023-07-09" },
  { id: 6, name: "School Uniforms", category: "Clothes", quantity: 50, status: "In Stock", lastUpdated: "2023-07-08" },
  { id: 7, name: "Hygiene Kits", category: "Hygiene", quantity: 5, status: "Low Stock", lastUpdated: "2023-07-07" },
  { id: 8, name: "Art Supplies", category: "Stationery", quantity: 40, status: "In Stock", lastUpdated: "2023-07-06" },
  { id: 9, name: "Shoes", category: "Clothes", quantity: 0, status: "Out of Stock", lastUpdated: "2023-07-05" },
  { id: 10, name: "Baby Diapers", category: "Hygiene", quantity: 100, status: "In Stock", lastUpdated: "2023-07-03" },
];

// Recent inventory movements
const inventoryMovements = [
  { id: 1, item: "Winter Jackets", quantity: 10, type: "In", source: "Donation - John Smith", date: "2023-07-15" },
  { id: 2, item: "Food Packages", quantity: 5, type: "Out", destination: "Main Center", date: "2023-07-14" },
  { id: 3, item: "Children's Books", quantity: 20, type: "In", source: "Donation - Book Drive", date: "2023-07-13" },
  { id: 4, item: "Hygiene Kits", quantity: 8, type: "Out", destination: "East Branch", date: "2023-07-12" },
  { id: 5, item: "School Uniforms", quantity: 15, type: "In", source: "Purchase", date: "2023-07-10" },
];

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Filter function
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    let color = "bg-gray-100 text-gray-800";
    
    if (status === "In Stock") {
      color = "bg-green-100 text-green-800";
    } else if (status === "Low Stock") {
      color = "bg-yellow-100 text-yellow-800";
    } else if (status === "Out of Stock") {
      color = "bg-red-100 text-red-800";
    }
    
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>{status}</span>;
  };

  // Movement type badge
  const MovementBadge = ({ type }) => {
    let color = type === "In" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    let icon = type === "In" ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />;
    
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${color}`}>
        {icon}
        {type}
      </span>
    );
  };

  // Category icon
  const CategoryIcon = ({ category }) => {
    switch (category) {
      case "Clothes":
        return <Shirt className="h-4 w-4" />;
      case "Books":
        return <BookOpen className="h-4 w-4" />;
      case "Food":
        return <Coffee className="h-4 w-4" />;
      case "Toys":
        return <Gamepad className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inventory..."
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
                <span>Add Item</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Add Inventory Item</SheetTitle>
                <SheetDescription>
                  Add a new item to the inventory or update existing stock.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Item Name</label>
                  <Input id="name" placeholder="Item name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Input id="category" placeholder="Category" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                  <Input id="quantity" type="number" placeholder="Quantity" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="source" className="text-sm font-medium">Source</label>
                  <Input id="source" placeholder="Donation/Purchase source" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                  <Input id="notes" placeholder="Additional notes" />
                </div>
                
                <div className="pt-4">
                  <Button className="w-full">Add to Inventory</Button>
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
              <Package className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">495</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shirt className="h-10 w-10 text-blue-500 bg-blue-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clothes</p>
                <p className="text-2xl font-bold">75</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-10 w-10 text-purple-500 bg-purple-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Books</p>
                <p className="text-2xl font-bold">150</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-10 w-10 text-orange-500 bg-orange-100 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>View and manage all items in inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>#{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <CategoryIcon category={item.category} />
                      {item.category}
                    </div>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell><StatusBadge status={item.status} /></TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
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
      
      {/* Recent Movements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inventory Movements</CardTitle>
          <CardDescription>Track recent item additions and removals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source/Destination</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryMovements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>#{movement.id}</TableCell>
                  <TableCell className="font-medium">{movement.item}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell><MovementBadge type={movement.type} /></TableCell>
                  <TableCell>{movement.source || movement.destination}</TableCell>
                  <TableCell>{movement.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManagement;
