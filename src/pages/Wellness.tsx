
import React from "react";
import Navigation from "../components/Navigation";
import { wellnessData } from "../data/wellness";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, BedIcon, HeartPulseIcon, UsersIcon, LineChartIcon } from "lucide-react";

const Wellness = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-lora font-semibold mb-2 text-gray-800">
          Wellness Hub
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your recovery journey and monitor your wellbeing
        </p>
        
        {/* Recovery Progress Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="mom-card">
              <CardHeader>
                <CardTitle>Recovery Progress</CardTitle>
                <CardDescription>Your postpartum healing journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-pink-600">{wellnessData.recovery.progress}%</span>
                  </div>
                  <Progress value={wellnessData.recovery.progress} className="h-3" />
                </div>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(wellnessData.recovery.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
            
            <Card className="mom-card">
              <CardHeader>
                <CardTitle>Sleep Tracker</CardTitle>
                <CardDescription>Monitoring your rest quality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <BedIcon className="text-blue-500 mr-3 h-10 w-10" />
                  <div>
                    <div className="text-3xl font-semibold">{wellnessData.sleep.hours} hrs</div>
                    <div className="text-gray-500">Quality: {wellnessData.sleep.quality}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 italic">
                  "Getting enough rest is crucial for your recovery and mental health."
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Mood and Mental Health */}
        <section className="mb-8">
          <h2 className="text-2xl font-lora font-semibold mb-4">Mood & Mental Health</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium mb-1">Today's Mood</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-mom-yellow flex items-center justify-center mr-3">
                    <HeartPulseIcon className="text-yellow-600 h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold">{wellnessData.mood.level}</div>
                    <div className="text-gray-500 italic">"{wellnessData.mood.notes}"</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-1">Postpartum Depression Screening</h3>
                <div className="flex items-center">
                  <LineChartIcon className="text-purple-500 mr-2" />
                  <div>
                    <div>Score: <span className="font-semibold">{wellnessData.assessments.postpartumDepressionScore}/10</span></div>
                    <div className="text-sm text-gray-500">
                      Last assessment: {new Date(wellnessData.assessments.lastAssessmentDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  Next assessment due: {new Date(wellnessData.assessments.nextAssessmentDue).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Consultations */}
        <section>
          <h2 className="text-2xl font-lora font-semibold mb-4">Upcoming Consultations</h2>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wellnessData.consultations.map((consultation, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <UsersIcon className="text-blue-500 mr-2 h-5 w-5" />
                          <span>{consultation.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{new Date(consultation.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          consultation.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {consultation.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="text-pink-500 hover:text-pink-700">
                          {consultation.status === "Completed" ? "View Notes" : "Reschedule"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="mom-button">
                Schedule New Consultation
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Wellness;
