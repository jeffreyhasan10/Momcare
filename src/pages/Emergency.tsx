
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPinIcon, Phone, Hospital, AlertTriangle, BookOpenIcon, ClockIcon } from "lucide-react";
import { emergencyData } from "../data/emergency";

const Emergency = () => {
  const [activeHospital, setActiveHospital] = useState(emergencyData.hospitals[0]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-lora font-semibold text-gray-800">
            Emergency Resources
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Quick access to emergency resources and support for when you need it most
        </p>
        
        {/* Emergency Alert Banner */}
        <section className="mb-8">
          <Alert className="border-red-500 bg-red-50">
            <AlertTitle className="text-red-700 text-lg font-semibold flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" /> Emergency Services
            </AlertTitle>
            <AlertDescription className="text-red-700 text-base">
              <p className="mb-2">If you're experiencing an emergency, please call emergency services immediately.</p>
              <Button variant="destructive" size="lg" className="mt-2 font-bold">
                <Phone className="mr-2 h-5 w-5" /> Call 911
              </Button>
            </AlertDescription>
          </Alert>
        </section>
        
        {/* Nearby Hospitals */}
        <section className="mb-8">
          <h2 className="text-2xl font-lora font-semibold mb-4">Nearby Hospitals & Clinics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 h-full">
                <h3 className="text-lg font-semibold mb-3">Facilities</h3>
                <div className="space-y-3">
                  {emergencyData.hospitals.map((hospital, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeHospital.name === hospital.name ? 
                        "bg-pink-100 border border-pink-300" : 
                        "bg-gray-50 hover:bg-pink-50 border border-gray-200"
                      }`}
                      onClick={() => setActiveHospital(hospital)}
                    >
                      <div className="flex items-start">
                        <Hospital className="text-pink-600 mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{hospital.name}</h4>
                          <p className="text-sm text-gray-500">
                            {hospital.distance} away
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{activeHospital.name}</h3>
                
                <div className="bg-gray-100 rounded-xl h-64 mb-4 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPinIcon className="h-10 w-10 mx-auto mb-2" />
                    <p>Map view would appear here</p>
                    <p className="text-sm">
                      Coordinates: {activeHospital.coords.lat}, {activeHospital.coords.lng}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-1">Contact Information</h4>
                    <p className="text-sm text-gray-600">
                      Emergency: {activeHospital.emergency || "911"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Reception: {activeHospital.phone || "Not available"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Services</h4>
                    <ul className="text-sm text-gray-600">
                      {activeHospital.services?.map((service, i) => (
                        <li key={i} className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          {service}
                        </li>
                      )) || <li>Information not available</li>}
                    </ul>
                  </div>
                </div>
                
                <div className="flex mt-4">
                  <Button className="mr-3">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                  <Button variant="outline">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* First Aid Guides */}
        <section className="mb-8">
          <h2 className="text-2xl font-lora font-semibold mb-4">Quick First Aid Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyData.firstAid.map((guide, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-mom-pink bg-opacity-20">
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>
                    {guide.description || "Emergency first aid information"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {guide.steps.split(': ')[1].split('...')[0].split('Step ').filter(step => step).map((step, i) => (
                      <li key={i} className="ml-2">
                        {step.trim()}...
                      </li>
                    ))}
                    <li>View complete guide for full instructions</li>
                  </ol>
                  <Button className="w-full mt-4">
                    <BookOpenIcon className="mr-2 h-4 w-4" /> View Complete Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Emergency Contacts */}
        <section>
          <h2 className="text-2xl font-lora font-semibold mb-4">Important Contacts</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="border-b pb-4 md:border-b-0 md:border-r md:pr-8">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-pink-600" />
                  Emergency Numbers
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Emergency Services:</span>
                    <span className="text-red-600 font-bold">911</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Poison Control:</span>
                    <span>1-800-222-1222</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Nurse Hotline:</span>
                    <span>1-800-556-0123</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-pink-600" />
                  24/7 Support Services
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="font-medium">Mental Health Crisis:</span>
                    <span>988</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Postpartum Support:</span>
                    <span>1-800-944-4773</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium">Lactation Support:</span>
                    <span>1-877-452-5324</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Save these numbers in your phone for quick access during emergencies.
              </p>
              <Button variant="outline">
                Download Contact Card
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Emergency;
