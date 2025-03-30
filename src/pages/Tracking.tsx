
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Baby,
  Droplet,
  Clock, 
  BarChart2,
  PlusCircle,
  Calendar,
  Utensils,
  Moon,
  ArrowUp
} from "lucide-react";
import { trackingData } from "../data/tracking";
import { useToast } from "@/components/ui/use-toast";
import { 
  CartesianGrid, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const Tracking = () => {
  const [activeTab, setActiveTab] = useState("feeding");
  const { toast } = useToast();
  
  const [newFeeding, setNewFeeding] = useState({
    time: "",
    type: "Breastmilk",
    amount: "",
    side: "Left",
    duration: ""
  });
  
  const [newSleep, setNewSleep] = useState({
    start: "",
    end: "",
    quality: "Good"
  });
  
  const [newDiaper, setNewDiaper] = useState({
    time: "",
    type: "Wet",
    color: ""
  });
  
  const [newGrowth, setNewGrowth] = useState({
    date: "",
    weight: "",
    height: "",
    headCircumference: ""
  });
  
  const handleFeedingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feeding logged",
      description: `${newFeeding.type} feeding recorded successfully.`,
    });
    setNewFeeding({
      time: "",
      type: "Breastmilk",
      amount: "",
      side: "Left",
      duration: ""
    });
  };
  
  const handleSleepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sleep logged",
      description: "Sleep session recorded successfully.",
    });
    setNewSleep({
      start: "",
      end: "",
      quality: "Good"
    });
  };
  
  const handleDiaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Diaper logged",
      description: `${newDiaper.type} diaper recorded successfully.`,
    });
    setNewDiaper({
      time: "",
      type: "Wet",
      color: ""
    });
  };
  
  const handleGrowthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Growth logged",
      description: "Growth measurements recorded successfully.",
    });
    setNewGrowth({
      date: "",
      weight: "",
      height: "",
      headCircumference: ""
    });
  };
  
  // Format data for growth chart
  const growthChartData = trackingData.growth.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: parseFloat(item.weight.split(' ')[0]),
    height: parseFloat(item.height.split(' ')[0])
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <BarChart2 className="h-8 w-8 text-pink-500" />
          <h1 className="text-4xl font-lora font-semibold text-gray-800">
            Baby Tracking
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Track your baby's daily activities, growth, and milestones
        </p>
        
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger 
              value="feeding" 
              className="flex items-center gap-2"
            >
              <Utensils className="h-4 w-4" />
              <span>Feeding</span>
            </TabsTrigger>
            <TabsTrigger 
              value="sleep" 
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              <span>Sleep</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diaper" 
              className="flex items-center gap-2"
            >
              <Droplet className="h-4 w-4" />
              <span>Diaper</span>
            </TabsTrigger>
            <TabsTrigger 
              value="growth" 
              className="flex items-center gap-2"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Growth</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="feeding" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-pink-500" />
                    Log Feeding
                  </CardTitle>
                  <CardDescription>
                    Record your baby's feeding details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFeedingSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="feeding-time">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="feeding-time"
                          type="datetime-local"
                          className="pl-10"
                          value={newFeeding.time}
                          onChange={(e) => setNewFeeding({...newFeeding, time: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feeding-type">Type</Label>
                      <Select 
                        value={newFeeding.type} 
                        onValueChange={(value) => setNewFeeding({...newFeeding, type: value})}
                      >
                        <SelectTrigger id="feeding-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Breastmilk">Breastmilk</SelectItem>
                          <SelectItem value="Formula">Formula</SelectItem>
                          <SelectItem value="Solid">Solid Food</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {newFeeding.type !== "Solid" && (
                      <div className="space-y-2">
                        <Label htmlFor="feeding-amount">Amount (oz)</Label>
                        <Input
                          id="feeding-amount"
                          type="text"
                          placeholder="e.g. 4 oz"
                          value={newFeeding.amount}
                          onChange={(e) => setNewFeeding({...newFeeding, amount: e.target.value})}
                          required
                        />
                      </div>
                    )}
                    
                    {newFeeding.type === "Breastmilk" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="feeding-side">Side</Label>
                          <Select 
                            value={newFeeding.side} 
                            onValueChange={(value) => setNewFeeding({...newFeeding, side: value})}
                          >
                            <SelectTrigger id="feeding-side">
                              <SelectValue placeholder="Select side" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Left">Left</SelectItem>
                              <SelectItem value="Right">Right</SelectItem>
                              <SelectItem value="Both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="feeding-duration">Duration (minutes)</Label>
                          <Input
                            id="feeding-duration"
                            type="text"
                            placeholder="e.g. 15 min"
                            value={newFeeding.duration}
                            onChange={(e) => setNewFeeding({...newFeeding, duration: e.target.value})}
                            required
                          />
                        </div>
                      </>
                    )}
                    
                    <Button type="submit" className="w-full">
                      Save Feeding
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Feeding History</CardTitle>
                  <CardDescription>
                    Recent feeding records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md">
                      <div className="grid grid-cols-5 bg-muted px-4 py-2 rounded-t-md">
                        <div className="font-medium">Time</div>
                        <div className="font-medium">Type</div>
                        <div className="font-medium">Amount</div>
                        <div className="font-medium">Side</div>
                        <div className="font-medium">Duration</div>
                      </div>
                      <div className="divide-y">
                        {trackingData.feeding.map((item, index) => (
                          <div key={index} className="grid grid-cols-5 px-4 py-3">
                            <div>{new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            <div className="font-medium">{item.type}</div>
                            <div>{item.amount}</div>
                            <div>{item.side || "—"}</div>
                            <div>{item.duration || "—"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-pink-500" />
                    Log Sleep
                  </CardTitle>
                  <CardDescription>
                    Record your baby's sleep time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSleepSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="sleep-start">Start Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="sleep-start"
                          type="datetime-local"
                          className="pl-10"
                          value={newSleep.start}
                          onChange={(e) => setNewSleep({...newSleep, start: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sleep-end">End Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="sleep-end"
                          type="datetime-local"
                          className="pl-10"
                          value={newSleep.end}
                          onChange={(e) => setNewSleep({...newSleep, end: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sleep-quality">Quality</Label>
                      <Select 
                        value={newSleep.quality} 
                        onValueChange={(value) => setNewSleep({...newSleep, quality: value})}
                      >
                        <SelectTrigger id="sleep-quality">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Save Sleep
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Sleep History</CardTitle>
                  <CardDescription>
                    Recent sleep records
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md">
                      <div className="grid grid-cols-4 bg-muted px-4 py-2 rounded-t-md">
                        <div className="font-medium">Start Time</div>
                        <div className="font-medium">End Time</div>
                        <div className="font-medium">Duration</div>
                        <div className="font-medium">Quality</div>
                      </div>
                      <div className="divide-y">
                        {trackingData.sleep.map((item, index) => (
                          <div key={index} className="grid grid-cols-4 px-4 py-3">
                            <div>{new Date(item.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            <div>{new Date(item.end).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            <div>{item.duration}</div>
                            <div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.quality === 'Excellent' ? 'bg-green-100 text-green-800' :
                                item.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                                item.quality === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {item.quality}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="diaper" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-pink-500" />
                    Log Diaper
                  </CardTitle>
                  <CardDescription>
                    Record diaper change details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDiaperSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="diaper-time">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="diaper-time"
                          type="datetime-local"
                          className="pl-10"
                          value={newDiaper.time}
                          onChange={(e) => setNewDiaper({...newDiaper, time: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="diaper-type">Type</Label>
                      <Select 
                        value={newDiaper.type} 
                        onValueChange={(value) => setNewDiaper({...newDiaper, type: value})}
                      >
                        <SelectTrigger id="diaper-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wet">Wet</SelectItem>
                          <SelectItem value="Dirty">Dirty</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(newDiaper.type === "Dirty" || newDiaper.type === "Both") && (
                      <div className="space-y-2">
                        <Label htmlFor="diaper-color">Color</Label>
                        <Select 
                          value={newDiaper.color} 
                          onValueChange={(value) => setNewDiaper({...newDiaper, color: value})}
                        >
                          <SelectTrigger id="diaper-color">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yellow">Yellow</SelectItem>
                            <SelectItem value="Brown">Brown</SelectItem>
                            <SelectItem value="Green">Green</SelectItem>
                            <SelectItem value="Black">Black</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full">
                      Save Diaper
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Diaper History</CardTitle>
                  <CardDescription>
                    Recent diaper changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md">
                      <div className="grid grid-cols-3 bg-muted px-4 py-2 rounded-t-md">
                        <div className="font-medium">Time</div>
                        <div className="font-medium">Type</div>
                        <div className="font-medium">Color</div>
                      </div>
                      <div className="divide-y">
                        {trackingData.diapers.map((item, index) => (
                          <div key={index} className="grid grid-cols-3 px-4 py-3">
                            <div>{new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                            <div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.type === 'Wet' ? 'bg-blue-100 text-blue-800' :
                                item.type === 'Dirty' ? 'bg-amber-100 text-amber-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {item.type}
                              </span>
                            </div>
                            <div>{item.color || "—"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="growth" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-pink-500" />
                    Log Growth
                  </CardTitle>
                  <CardDescription>
                    Record your baby's growth measurements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleGrowthSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="growth-date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                          id="growth-date"
                          type="date"
                          className="pl-10"
                          value={newGrowth.date}
                          onChange={(e) => setNewGrowth({...newGrowth, date: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="growth-weight">Weight (lbs)</Label>
                      <Input
                        id="growth-weight"
                        type="text"
                        placeholder="e.g. 10.5 lbs"
                        value={newGrowth.weight}
                        onChange={(e) => setNewGrowth({...newGrowth, weight: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="growth-height">Height (inches)</Label>
                      <Input
                        id="growth-height"
                        type="text"
                        placeholder="e.g. 22 inches"
                        value={newGrowth.height}
                        onChange={(e) => setNewGrowth({...newGrowth, height: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="growth-head">Head Circumference (inches)</Label>
                      <Input
                        id="growth-head"
                        type="text"
                        placeholder="e.g. 14.5 inches"
                        value={newGrowth.headCircumference}
                        onChange={(e) => setNewGrowth({...newGrowth, headCircumference: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Save Growth
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Growth History</CardTitle>
                  <CardDescription>
                    Track your baby's development
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="weight" 
                          stroke="#8884d8" 
                          name="Weight (lbs)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="height" 
                          stroke="#82ca9d" 
                          name="Height (in)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="border rounded-md">
                    <div className="grid grid-cols-4 bg-muted px-4 py-2 rounded-t-md">
                      <div className="font-medium">Date</div>
                      <div className="font-medium">Weight</div>
                      <div className="font-medium">Height</div>
                      <div className="font-medium">Head</div>
                    </div>
                    <div className="divide-y">
                      {trackingData.growth.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 px-4 py-3">
                          <div>{new Date(item.date).toLocaleDateString()}</div>
                          <div>{item.weight}</div>
                          <div>{item.height}</div>
                          <div>{item.headCircumference}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Tracking;
