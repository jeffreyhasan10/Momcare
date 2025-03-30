
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Download, ExternalLink, Clock } from "lucide-react";

const resourceData = {
  categories: ["All", "Pregnancy", "Postpartum", "Baby Care", "Mental Health"],
  articles: [
    {
      id: 1,
      title: "5 Tips for Better Sleep",
      category: "Postpartum",
      description: "Expert advice on getting more rest as a new parent.",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1496174742515-d2146dcf8e80?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title: "Postpartum Nutrition Guide",
      category: "Postpartum",
      description: "Foods to eat for recovery and breastfeeding success.",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80"
    },
    {
      id: 3,
      title: "Baby Bath Basics",
      category: "Baby Care",
      description: "Step-by-step guide to safely bathing your newborn.",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1625832951391-f09616a3dfff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      title: "Understanding Your Baby's Cry",
      category: "Baby Care",
      description: "Learn to decode what different cries mean.",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1591161555818-7b9debeccc07?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      title: "Signs of Postpartum Depression",
      category: "Mental Health",
      description: "When to seek help for postpartum mood disorders.",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1526725702345-bdda2b97ef73?q=80&w=1734&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 6,
      title: "First Trimester Survival Guide",
      category: "Pregnancy",
      description: "Navigate the challenges of early pregnancy.",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1634759344500-a77c7e44e7bd?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ],
  pdfs: [
    {
      id: 1,
      title: "Feeding Schedule Template",
      category: "Baby Care",
      description: "Printable template to track your baby's feedings.",
      filename: "feeding-schedule.pdf"
    },
    {
      id: 2,
      title: "Postpartum Recovery Checklist",
      category: "Postpartum",
      description: "Items and resources for your recovery.",
      filename: "recovery-checklist.pdf"
    },
    {
      id: 3,
      title: "Baby Developmental Milestones",
      category: "Baby Care",
      description: "Month-by-month guide to baby's development.",
      filename: "milestones-guide.pdf"
    }
  ]
};

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredArticles = resourceData.articles.filter(article => 
    (activeCategory === "All" || article.category === activeCategory) &&
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPdfs = resourceData.pdfs.filter(pdf => 
    (activeCategory === "All" || pdf.category === activeCategory) &&
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-pink-500" />
          <h1 className="text-4xl font-lora font-semibold text-gray-800">
            Resource Library
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-8">
          Access helpful articles, guides, and downloadable resources
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-xl mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search resources..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="articles" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              {resourceData.categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "bg-pink-500 hover:bg-pink-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Articles Tab */}
          <TabsContent value="articles">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium text-gray-700">No articles found</h3>
                <p className="text-gray-500 mt-2">Try changing your search terms or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => (
                  <Card key={article.id} className="overflow-hidden h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium px-2 py-1 rounded bg-pink-100 text-pink-800">
                          {article.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm">{article.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Read Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Downloads Tab */}
          <TabsContent value="downloads">
            {filteredPdfs.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium text-gray-700">No downloads found</h3>
                <p className="text-gray-500 mt-2">Try changing your search terms or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPdfs.map(pdf => (
                  <Card key={pdf.id}>
                    <div className="flex items-start p-6">
                      <div className="bg-pink-100 rounded-lg p-3 mr-4">
                        <svg className="h-8 w-8 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{pdf.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{pdf.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium px-2 py-1 rounded bg-pink-100 text-pink-800">
                            {pdf.category}
                          </span>
                          <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Resources;
