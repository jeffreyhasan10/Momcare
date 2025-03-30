
import React from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, MessageCircle, Calendar, Search } from "lucide-react";

// Create community data
const communityData = {
  groups: [
    { name: "New Moms NYC", members: 120, location: "New York", image: "https://images.unsplash.com/photo-1484665754804-74b091211472?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Sleep Support", members: 85, location: "Online", image: "https://images.unsplash.com/photo-1629360021730-3d258452c425?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "First-Time Parents", members: 210, location: "Los Angeles", image: "https://images.unsplash.com/photo-1560328055-e938bb2ed50a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Working Moms", members: 152, location: "Chicago", image: "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
  ],
  posts: [
    { title: "Nap Time Struggles", author: "Sarah", replies: 5, time: "2 hours ago", preview: "My 3-month-old refuses to nap longer than..." },
    { title: "Introducing Solids", author: "Emma", replies: 12, time: "1 day ago", preview: "When did you all start introducing solid foods?" },
    { title: "Returning to Work", author: "Jessica", replies: 8, time: "3 days ago", preview: "Any tips for pumping at work and maintaining milk supply?" },
    { title: "Local Playdate Group", author: "Madison", replies: 3, time: "5 days ago", preview: "Looking for moms with babies around 6 months old in the Seattle area..." }
  ],
  events: [
    { title: "Virtual Coffee Chat", date: "2025-04-05", time: "10:00 AM", attendees: 18, type: "Online" },
    { title: "Park Playdate", date: "2025-04-10", time: "3:00 PM", attendees: 7, type: "In-Person", location: "Central Park, NY" }
  ]
};

const Community = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-lora font-semibold mb-2 text-gray-800">
          Community
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect with other parents on similar journeys
        </p>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search groups, discussions, or events..."
            className="mom-input pl-10 pr-4 py-3 w-full"
          />
        </div>
        
        {/* Groups Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-lora font-semibold">Groups</h2>
            <button className="text-pink-500 hover:text-pink-700 flex items-center gap-1">
              <span>View All</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {communityData.groups.map((group, index) => (
              <Card key={index} className="mom-card">
                <div className="relative h-32 w-full mb-4">
                  <img 
                    src={group.image}
                    alt={group.name}
                    className="absolute w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-medium">{group.name}</h3>
                  </div>
                </div>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{group.members} members</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{group.location}</span>
                    </div>
                  </div>
                  <button className="w-full mt-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors">
                    Join Group
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Discussions Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-lora font-semibold">Recent Discussions</h2>
            <button className="text-pink-500 hover:text-pink-700">Start New Topic</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {communityData.posts.map((post, index) => (
              <div 
                key={index} 
                className={`p-4 hover:bg-pink-50/50 transition-colors ${
                  index < communityData.posts.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{post.title}</h3>
                  <span className="text-xs text-gray-500">{post.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{post.preview}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Posted by {post.author}
                  </div>
                  <div className="flex items-center text-sm text-pink-600">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{post.replies} replies</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Events Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-lora font-semibold">Upcoming Events</h2>
            <button className="text-pink-500 hover:text-pink-700">View Calendar</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityData.events.map((event, index) => (
              <Card key={index} className="mom-card">
                <CardHeader className="pb-2">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {event.type}{event.location ? ` • ${event.location}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-3">
                    <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                    <div>
                      <div>{new Date(event.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="font-medium">{event.attendees}</span> attending
                    </div>
                    <button className="px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors">
                      Join Event
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Community;
