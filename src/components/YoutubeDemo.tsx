
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Youtube, Loader2, FileText, Clock } from "lucide-react";
import { toast } from "sonner";

const YoutubeDemo = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");

  // Sample summaries for demo purposes
  const sampleSummaries = [
    {
      url: "photosynthesis",
      summary: "This video explains photosynthesis - the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen. Key points include: 1) Chloroplasts contain chlorophyll that captures light energy, 2) The light reaction occurs in thylakoids producing ATP and NADPH, 3) The Calvin cycle uses CO2 to produce glucose, 4) Photosynthesis is essential for life on Earth as it produces oxygen and forms the base of food chains."
    },
    {
      url: "algebra",
      summary: "This algebra tutorial covers solving linear equations step by step. Main concepts: 1) Keep equations balanced by doing the same operation to both sides, 2) Isolate the variable by undoing operations in reverse order, 3) Use inverse operations (addition/subtraction, multiplication/division), 4) Check your answer by substituting back into the original equation. Practice with examples like 2x + 5 = 15 to master the technique."
    },
    {
      url: "history",
      summary: "This lesson covers the causes and effects of World War I. Key factors leading to war: 1) Militarism and arms race between European powers, 2) Alliance system creating opposing blocs, 3) Imperialism causing global tensions, 4) Assassination of Archduke Franz Ferdinand as the immediate trigger. The war resulted in massive casualties, the fall of empires, and set the stage for World War II."
    }
  ];

  const handleSummarize = async () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with demo data
    setTimeout(() => {
      const matchingSummary = sampleSummaries.find(sample => 
        url.toLowerCase().includes(sample.url)
      );
      
      if (matchingSummary) {
        setSummary(matchingSummary.summary);
        toast.success("Video summarized successfully!");
      } else {
        setSummary("This is a demo summary. In the full version, our AI would analyze the actual YouTube video content and provide a comprehensive summary with key points, important concepts, and actionable insights tailored to your grade level.");
        toast.success("Demo summary generated!");
      }
      
      setIsLoading(false);
    }, 2000);
  };

  const clearSummary = () => {
    setUrl("");
    setSummary("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Youtube className="h-5 w-5 mr-2 text-red-500" />
          YouTube Summarizer Demo
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Badge className="bg-red-100 text-red-800">AI-Powered</Badge>
          <Badge variant="outline">Real-time Processing</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              YouTube Video URL
            </label>
            <Input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Try: "photosynthesis", "algebra", or "history" for demo summaries
            </p>
          </div>
          
          <Button 
            onClick={handleSummarize}
            disabled={isLoading}
            className="w-full gradient-secondary text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Video...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Summary
              </>
            )}
          </Button>
        </div>
        
        {summary && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium text-green-600">Summary Generated</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>2 min read</span>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {summary}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={clearSummary}>
                Clear
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.success("Summary saved to your notes!")}
              >
                Save to Notes
              </Button>
            </div>
          </div>
        )}
        
        {!summary && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <Youtube className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Enter a YouTube URL above to generate an AI-powered summary</p>
            <p className="text-sm mt-2">Perfect for studying and quick review</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default YoutubeDemo;
