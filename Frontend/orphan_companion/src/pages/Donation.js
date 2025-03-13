
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar, DollarSign, GiftIcon, HandCoins, Heart, Package, PiggyBank, UserPlus } from 'lucide-react';
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { config } from "../config/appConfig";

// Sample wishlist data
const wishlistItems = [
  { id: 1, name: "School Uniforms", quantity: 10, category: "Clothes", priority: "High" },
  { id: 2, name: "Story Books", quantity: 15, category: "Books", priority: "Medium" },
  { id: 3, name: "Winter Jackets", quantity: 8, category: "Clothes", priority: "High" },
  { id: 4, name: "Food Supplies", quantity: 20, category: "Food", priority: "Critical" },
  { id: 5, name: "Toys", quantity: 12, category: "Toys", priority: "Medium" },
];

const DonationPage = () => {
  // Form state
  const [donationType, setDonationType] = useState("monetary");
  const [donationAmount, setDonationAmount] = useState("");
  const [donationFrequency, setDonationFrequency] = useState("one-time");
  const [itemCategory, setItemCategory] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("dropoff");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  
  // Handle monetary donation
  const handleMonetaryDonation = (e) => {
    e.preventDefault();
    // In a real app, we would connect to a payment gateway here
    // For now, we'll just show a success message
    toast.success("Thank you for your donation! Redirecting to payment...");
    
    // Simulate API call with config
    console.log(`Sending donation request to: /donations`);
    
    // Reset form
    setDonationAmount("");
    setMessage("");
  };
  
  // Handle physical donation
  const handlePhysicalDonation = (e) => {
    e.preventDefault();
    toast.success("Thank you for your donation! We'll be in touch soon.");
    
    // Reset form
    setItemCategory("");
    setItemQuantity("");
    setMessage("");
    setDeliveryMethod("dropoff");
    setPickupDate("");
    setPickupAddress("");
  };
  
  // Handle wishlist fulfillment
  const handleWishlistFulfill = (itemId) => {
    const item = wishlistItems.find(item => item.id === itemId);
    if (item) {
      setItemCategory(item.category);
      setItemQuantity(item.quantity.toString());
      setDonationType("physical");
      
      toast.info(`You're fulfilling: ${item.quantity} ${item.name}`);
      
      // Scroll to the physical donation form
      document.getElementById("physical-donation-form")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-family-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-12 md:py-20 bg-family-warm">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Make a Difference Today</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Your generous support helps us provide care, education, and love to children who need it most.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="btn-primary flex items-center gap-2"
                onClick={() => document.getElementById("donation-tabs")?.scrollIntoView({ behavior: "smooth" })}
              >
                <HandCoins className="w-5 h-5" />
                Donate Now
              </Button>
              <Button 
                variant="outline" 
                className="btn-secondary flex items-center gap-2"
                onClick={() => document.getElementById("wishlist-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Heart className="w-5 h-5" />
                View Wishlist
              </Button>
            </div>
          </div>
        </section>
        
        {/* Donation Stats */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center glass-panel">
                <CardHeader>
                  <DollarSign className="w-10 h-10 mx-auto text-family-accent" />
                  <CardTitle>$25,480</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-family-text-light">Total Donations Received</p>
                </CardContent>
              </Card>
              
              <Card className="text-center glass-panel">
                <CardHeader>
                  <UserPlus className="w-10 h-10 mx-auto text-family-accent" />
                  <CardTitle>184</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-family-text-light">Children Supported</p>
                </CardContent>
              </Card>
              
              <Card className="text-center glass-panel">
                <CardHeader>
                  <Package className="w-10 h-10 mx-auto text-family-accent" />
                  <CardTitle>350+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-family-text-light">Physical Items Donated</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Donation Forms */}
        <section className="py-12 bg-family-cream" id="donation-tabs">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-bold mb-8 text-center">How Would You Like to Donate?</h2>
            
            <Tabs defaultValue="monetary" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="monetary" 
                  onClick={() => setDonationType("monetary")}
                  className="flex items-center gap-2"
                >
                  <PiggyBank className="w-4 h-4" />
                  <span>Monetary Donation</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="physical" 
                  onClick={() => setDonationType("physical")}
                  className="flex items-center gap-2"
                >
                  <GiftIcon className="w-4 h-4" />
                  <span>Physical Donation</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monetary">
                <Card>
                  <CardHeader>
                    <CardTitle>Monetary Donation</CardTitle>
                    <CardDescription>
                      Your financial support helps us provide care, education, and resources for our children.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleMonetaryDonation}>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="donation-amount">Donation Amount ($)</Label>
                          <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <DollarSign className="w-5 h-5 text-gray-400" />
                            </div>
                            <Input
                              id="donation-amount"
                              type="number"
                              placeholder="Enter amount"
                              className="pl-10"
                              value={donationAmount}
                              onChange={(e) => setDonationAmount(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label>Donation Frequency</Label>
                          <RadioGroup 
                            className="grid grid-cols-2 gap-4 mt-2"
                            value={donationFrequency}
                            onValueChange={setDonationFrequency}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="one-time" id="one-time" />
                              <Label htmlFor="one-time">One-time</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Add a message to your donation"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full mt-6">
                        Proceed to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="physical" id="physical-donation-form">
                <Card>
                  <CardHeader>
                    <CardTitle>Physical Donation</CardTitle>
                    <CardDescription>
                      Donate clothes, books, food, and other essentials to help our children.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePhysicalDonation}>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="item-category">Item Category</Label>
                          <Select 
                            value={itemCategory} 
                            onValueChange={setItemCategory}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="clothes">Clothes</SelectItem>
                              <SelectItem value="books">Books</SelectItem>
                              <SelectItem value="food">Food</SelectItem>
                              <SelectItem value="toys">Toys</SelectItem>
                              <SelectItem value="stationery">Stationery</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="item-quantity">Quantity</Label>
                          <Input
                            id="item-quantity"
                            type="number"
                            placeholder="Enter quantity"
                            value={itemQuantity}
                            onChange={(e) => setItemQuantity(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="message">Item Description</Label>
                          <Textarea
                            id="message"
                            placeholder="Describe the items you're donating"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label>Delivery Method</Label>
                          <RadioGroup 
                            className="grid grid-cols-2 gap-4 mt-2"
                            value={deliveryMethod}
                            onValueChange={setDeliveryMethod}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dropoff" id="dropoff" />
                              <Label htmlFor="dropoff">Drop-off</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pickup" id="pickup" />
                              <Label htmlFor="pickup">Request Pickup</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {deliveryMethod === "pickup" && (
                          <>
                            <div>
                              <Label htmlFor="pickup-date">Preferred Pickup Date</Label>
                              <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <Calendar className="w-5 h-5 text-gray-400" />
                                </div>
                                <Input
                                  id="pickup-date"
                                  type="date"
                                  className="pl-10"
                                  value={pickupDate}
                                  onChange={(e) => setPickupDate(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="pickup-address">Pickup Address</Label>
                              <Textarea
                                id="pickup-address"
                                placeholder="Enter your address for pickup"
                                value={pickupAddress}
                                onChange={(e) => setPickupAddress(e.target.value)}
                                required
                              />
                            </div>
                          </>
                        )}
                      </div>
                      
                      <Button type="submit" className="w-full mt-6">
                        Submit Donation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Wishlist Section */}
        <section className="py-12 bg-family-soft-blue" id="wishlist-section">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Current Needs</h2>
              <p className="text-lg text-family-text-light max-w-2xl mx-auto">
                These are items our children currently need. Your help in fulfilling these specific requests is greatly appreciated.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="glass-panel">
                  <CardHeader className="relative pb-2">
                    {item.priority === "Critical" && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Urgent Need
                        </div>
                      </div>
                    )}
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Quantity needed: <span className="font-medium">{item.quantity}</span></p>
                    <p className="text-sm text-family-text-light mt-2">
                      Priority: <span className={`font-medium ${
                        item.priority === "Critical" ? "text-red-600" : 
                        item.priority === "High" ? "text-orange-600" : 
                        "text-blue-600"
                      }`}>{item.priority}</span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => handleWishlistFulfill(item.id)}
                    >
                      <Heart className="w-4 h-4" />
                      <span>Fulfill This Need</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationPage;