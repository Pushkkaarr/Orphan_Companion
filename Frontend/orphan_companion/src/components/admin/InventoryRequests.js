import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Search, Plus, Pencil, Trash, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CATEGORIES = [
  { value: "Clothes", label: "Clothes" },
  { value: "Books", label: "Books" },
  { value: "Food", label: "Food" },
  { value: "Toys", label: "Toys" },
  { value: "Stationery", label: "Stationery" },
  { value: "Medical", label: "Medical" },
  { value: "Other", label: "Other" },
];

const PRIORITIES = [
  { value: "Critical", label: "Critical", color: "bg-red-100 text-red-800" },
  { value: "High", label: "High", color: "bg-orange-100 text-orange-800" },
  { value: "Medium", label: "Medium", color: "bg-blue-100 text-blue-800" },
  { value: "Low", label: "Low", color: "bg-gray-100 text-gray-800" },
];

const InventoryRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [pledges, setPledges] = useState([]);
  const [showPledgesFor, setShowPledgesFor] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    item_name: "",
    category: "",
    quantity_needed: "",
    unit: "",
    description: "",
    priority: "Medium",
    display_on_wishlist: true
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('inventory_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching inventory requests:', error);
      alert('Could not load inventory request data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPledges = async (requestId) => {
    try {
      const { data, error } = await supabase
        .from('donation_pledges')
        .select('*')
        .eq('inventory_request_id', requestId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPledges(data || []);
      setShowPledgesFor(requestId);
    } catch (error) {
      console.error('Error fetching pledges:', error);
      alert('Could not load pledge data');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData(prev => ({ ...prev, display_on_wishlist: checked }));
  };

  const resetForm = () => {
    setFormData({
      item_name: "",
      category: "",
      quantity_needed: "",
      unit: "",
      description: "",
      priority: "Medium",
      display_on_wishlist: true
    });
  };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Convert numeric fields
      const quantityNeededAsNumber = parseInt(formData.quantity_needed, 10);
      
      if (isNaN(quantityNeededAsNumber)) {
        throw new Error('Quantity needed must be a number');
      }

      const { data, error } = await supabase
        .from('inventory_requests')
        .insert([{ 
          ...formData, 
          quantity_needed: quantityNeededAsNumber,
          requested_by: "Admin" // In a real app, use the current user
        }])
        .select();

      if (error) throw error;

      alert('Request added successfully');
      setIsAddOpen(false);
      resetForm();
      fetchRequests(); // Refresh data
    } catch (error) {
      console.error('Error adding request:', error);
      alert(error.message || 'Failed to add request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setFormData({
      item_name: item.item_name,
      category: item.category,
      quantity_needed: item.quantity_needed.toString(),
      unit: item.unit || "",
      description: item.description || "",
      priority: item.priority || "Medium",
      display_on_wishlist: item.display_on_wishlist
    });
    setIsEditOpen(true);
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Convert numeric fields
      const quantityNeededAsNumber = parseInt(formData.quantity_needed, 10);
      
      if (isNaN(quantityNeededAsNumber)) {
        throw new Error('Quantity needed must be a number');
      }

      const { error } = await supabase
        .from('inventory_requests')
        .update({ 
          ...formData, 
          quantity_needed: quantityNeededAsNumber
        })
        .eq('id', itemToEdit.id);

      if (error) throw error;

      alert('Request updated successfully');
      setIsEditOpen(false);
      resetForm();
      fetchRequests(); // Refresh data
    } catch (error) {
      console.error('Error updating request:', error);
      alert(error.message || 'Failed to update request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    if (confirm(`Are you sure you want to delete the request for ${item.item_name}?`)) {
      handleDeleteRequest(item.id);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('inventory_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Request deleted successfully');
      fetchRequests(); // Refresh data
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Failed to delete request');
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const handleUpdatePledgeStatus = async (pledgeId, newStatus) => {
    try {
      const { error } = await supabase
        .from('donation_pledges')
        .update({ status: newStatus })
        .eq('id', pledgeId);

      if (error) throw error;

      // Refresh pledges
      if (showPledgesFor) {
        fetchPledges(showPledgesFor);
      }
      
      // Update the main requests list too as the fulfilled quantity may have changed
      fetchRequests();
    } catch (error) {
      console.error('Error updating pledge status:', error);
      alert('Failed to update pledge status');
    }
  };
  
  // Filter function
  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "All" || request.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const priorityInfo = PRIORITIES.find(p => p.value === priority) || PRIORITIES[2]; // Default to Medium
    
    return (
      <Badge variant="outline" className={`${priorityInfo.color} border-0`}>
        {priority === "Critical" && <AlertCircle className="w-3 h-3 mr-1" />}
        {priorityInfo.label}
      </Badge>
    );
  };

  // Progress bar component
  const ProgressBar = ({ needed, fulfilled }) => {
    const percentage = Math.min(100, Math.round((fulfilled / needed) * 100));
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Inventory Requests</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              {PRIORITIES.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
            <SheetTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Request</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add Inventory Request</SheetTitle>
                <SheetDescription>
                  Add a new request to be displayed on the donation wishlist.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleAddRequest} className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="item_name">Item Name *</Label>
                  <Input 
                    id="item_name" 
                    name="item_name"
                    placeholder="Item name" 
                    required
                    value={formData.item_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity_needed">Quantity Needed *</Label>
                    <Input 
                      id="quantity_needed" 
                      name="quantity_needed"
                      type="number" 
                      placeholder="Quantity" 
                      required
                      value={formData.quantity_needed}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Input 
                      id="unit" 
                      name="unit"
                      placeholder="pieces, kg, sets, etc." 
                      value={formData.unit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Item description" 
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => handleSelectChange("priority", value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="display_on_wishlist"
                    checked={formData.display_on_wishlist}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="display_on_wishlist">Display on Donation Wishlist</Label>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add to Wishlist"
                    )}
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
          
          {/* Edit Item Sheet */}
          <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Edit Inventory Request</SheetTitle>
                <SheetDescription>
                  Update request information.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={handleUpdateRequest} className="grid gap-4 py-4">
                {/* Same fields as add form */}
                <div className="space-y-2">
                  <Label htmlFor="edit_item_name">Item Name *</Label>
                  <Input 
                    id="edit_item_name" 
                    name="item_name"
                    placeholder="Item name" 
                    required
                    value={formData.item_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_category">Category *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="edit_category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit_quantity_needed">Quantity Needed *</Label>
                    <Input 
                      id="edit_quantity_needed" 
                      name="quantity_needed"
                      type="number" 
                      placeholder="Quantity" 
                      required
                      value={formData.quantity_needed}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit_unit">Unit *</Label>
                    <Input 
                      id="edit_unit" 
                      name="unit"
                      placeholder="pieces, kg, sets, etc." 
                      value={formData.unit}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_description">Description</Label>
                  <Textarea 
                    id="edit_description" 
                    name="description"
                    placeholder="Item description" 
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit_priority">Priority</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => handleSelectChange("priority", value)}
                  >
                    <SelectTrigger id="edit_priority">
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRIORITIES.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="edit_display_on_wishlist"
                    checked={formData.display_on_wishlist}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="edit_display_on_wishlist">Display on Donation Wishlist</Label>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Request"
                    )}
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Wishlist Items</CardTitle>
          <CardDescription>Items that donors can see on the donation page</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && requests.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading request data...</span>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No requests found. Add a request to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Visible</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <React.Fragment key={request.id}>
                    <TableRow className={showPledgesFor === request.id ? "bg-muted/50" : ""}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{request.item_name}</div>
                          {request.description && (
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {request.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{request.category}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{request.quantity_fulfilled} / {request.quantity_needed} {request.unit}</span>
                            <span>{Math.round((request.quantity_fulfilled / request.quantity_needed) * 100)}%</span>
                          </div>
                          <ProgressBar needed={request.quantity_needed} fulfilled={request.quantity_fulfilled} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={request.priority} />
                      </TableCell>
                      <TableCell>
                        {request.display_on_wishlist ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-0">
                            Visible
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-0">
                            Hidden
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditClick(request)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteClick(request)}
                            disabled={isDeleting && itemToDelete?.id === request.id}
                          >
                            {isDeleting && itemToDelete?.id === request.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => 
                              showPledgesFor === request.id 
                                ? setShowPledgesFor(null)
                                : fetchPledges(request.id)
                            }
                          >
                            {showPledgesFor === request.id ? 'Hide Pledges' : 'View Pledges'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    {/* Pledges section */}
                    {showPledgesFor === request.id && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-muted/30 p-4">
                          <div className="space-y-4">
                            <h4 className="font-medium">Donation Pledges for {request.item_name}</h4>
                            
                            {pledges.length === 0 ? (
                              <p className="text-sm text-muted-foreground">No pledges found for this item.</p>
                            ) : (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Donor</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Delivery</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {pledges.map(pledge => (
                                    <TableRow key={pledge.id}>
                                      <TableCell>
                                        <div>
                                          <div className="font-medium">{pledge.donor_name}</div>
                                          <div className="text-xs text-muted-foreground">{pledge.donor_email}</div>
                                        </div>
                                      </TableCell>
                                      <TableCell>{pledge.quantity} {request.unit}</TableCell>
                                      <TableCell>
                                        <div className="text-sm">
                                          <div>{pledge.delivery_method === 'pickup' ? 'Pickup' : 'Drop-off'}</div>
                                          {pledge.delivery_method === 'pickup' && (
                                            <div className="text-xs text-muted-foreground">
                                              {new Date(pledge.pickup_date).toLocaleDateString()}
                                            </div>
                                          )}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                                          {pledge.message || '-'}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge className={
                                          pledge.status === 'Received' 
                                            ? 'bg-green-100 text-green-800' 
                                            : pledge.status === 'Cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }>
                                          {pledge.status}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <Select 
                                          defaultValue={pledge.status}
                                          onValueChange={(value) => handleUpdatePledgeStatus(pledge.id, value)}
                                        >
                                          <SelectTrigger className="w-[130px]">
                                            <SelectValue placeholder="Change status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Received">Received</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryRequests; 