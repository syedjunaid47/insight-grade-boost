
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Youtube, Loader2, FileText, Clock, Save, Share2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Summarizer = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const sampleSummaries = [
    {
      keyword: "photosynthesis",
      title: "Photosynthesis Explained - How Plants Make Food",
      summary: "This comprehensive video explains photosynthesis, the vital process by which plants convert sunlight into energy. **Key Learning Points:**\n\n**1. The Process Overview**\n- Plants use chlorophyll to capture sunlight\n- Carbon dioxide from air + water from roots + sunlight = glucose + oxygen\n- Takes place primarily in leaves\n\n**2. Two Main Stages**\n- **Light Reactions**: Occur in thylakoids, produce ATP and NADPH\n- **Calvin Cycle**: Uses CO₂ to create glucose in the stroma\n\n**3. Importance**\n- Produces oxygen we breathe\n- Forms the base of all food chains\n- Removes CO₂ from atmosphere\n\n**Study Tips**: Remember the equation 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂"
    },
    {
      keyword: "algebra",
      title: "Solving Linear Equations - Step by Step Guide",
      summary: "This tutorial provides a systematic approach to solving linear equations with practical examples. **Key Concepts:**\n\n**1. Basic Principles**\n- Keep equations balanced (same operation on both sides)\n- Isolate the variable step by step\n- Work backwards through order of operations\n\n**2. Step-by-Step Method**\n- Simplify both sides (combine like terms)\n- Move variables to one side, constants to other\n- Use inverse operations\n- Check your answer\n\n**3. Common Examples**\n- 2x + 5 = 15 → 2x = 10 → x = 5\n- 3(x - 4) = 18 → 3x - 12 = 18 → 3x = 30 → x = 10\n\n**Practice Tip**: Always substitute your answer back into the original equation to verify it's correct."
    },
    {
      keyword: "history",
      title: "World War I - Causes and Consequences",
      summary: "An in-depth analysis of the Great War, covering its origins and lasting impact. **Major Topics Covered:**\n\n**1. Underlying Causes (M.A.I.N.)**\n- **Militarism**: Arms race between European powers\n- **Alliances**: Triple Alliance vs Triple Entente\n- **Imperialism**: Competition for colonies\n- **Nationalism**: Ethnic tensions in Balkans\n\n**2. Immediate Trigger**\n- Assassination of Archduke Franz Ferdinand (June 28, 1914)\n- Austria-Hungary declares war on Serbia\n- Alliance system pulls in major powers\n\n**3. Consequences**\n- 16+ million deaths\n- Fall of empires (Ottoman, Austro-Hungarian, German, Russian)\n- Treaty of Versailles creates tensions leading to WWII\n- Map of Europe redrawn\n\n**Remember**: WWI was called 'the war to end all wars' but ironically set stage for WWII."
    },
    {
      keyword: "chemistry",
      title: "Understanding Chemical Bonds - Ionic vs Covalent",
      summary: "Comprehensive explanation of how atoms bond to form compounds. **Core Concepts:**\n\n**1. Why Atoms Bond**\n- Achieve stable electron configuration (octet rule)\n- Lower energy state is more stable\n- Form compounds with specific properties\n\n**2. Ionic Bonds**\n- Transfer of electrons between metal and non-metal\n- Form crystals with high melting points\n- Conduct electricity when dissolved\n- Example: NaCl (table salt)\n\n**3. Covalent Bonds**\n- Sharing of electrons between non-metals\n- Form molecules with various shapes\n- Generally lower melting points than ionic\n- Example: H₂O (water)\n\n**Memory Aid**: Ionic = 'I own' (transfer), Covalent = 'Co-own' (share)"
    }
  ];

  const handleSummarize = async () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate API processing time
    setTimeout(() => {
      const matchingSummary = sampleSummaries.find(sample => 
        url.toLowerCase().includes(sample.keyword)
      );
      
      if (matchingSummary) {
        setSummary(matchingSummary.summary);
        setVideoInfo({
          title: matchingSummary.title,
          duration: "12:45",
          views: "125K views"
        });
        toast.success("Video summarized successfully!");
      } else {
        setSummary("**AI Summary Generated**\n\nThis is a demo summary showing how our AI would analyze any YouTube educational video. In the full version, our advanced AI would:\n\n**1. Transcribe the Audio**\n- Convert speech to accurate text\n- Handle multiple speakers and accents\n- Maintain context and meaning\n\n**2. Identify Key Concepts**\n- Extract main topics and subtopics\n- Highlight important definitions\n- Note formulas, dates, and facts\n\n**3. Create Study-Friendly Format**\n- Organize information hierarchically\n- Add memory aids and mnemonics\n- Include practice questions\n- Suggest related topics\n\n**Try our demo keywords**: photosynthesis, algebra, history, chemistry for realistic examples!");
        setVideoInfo({
          title: "Educational Video Summary",
          duration: "15:30",
          views: "50K views"
        });
        toast.success("Demo summary generated!");
      }
      
      setIsLoading(false);
    }, 3000);
  };

  const clearSummary = () => {
    setUrl("");
    setSummary("");
    setVideoInfo(null);
  };

  const saveSummary = () => {
    toast.success("Summary saved to your notes!");
  };

  const shareSummary = () => {
    toast.success("Summary link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-50 via-white to-edu-orange-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-edu-blue-600 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-edu-blue-600 to-edu-orange-500 bg-clip-text text-transparent">
                EduBoost AI
              </span>
            </div>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">YouTube Summarizer</h1>
          <p className="text-xl text-gray-600">Transform any educational video into study-friendly summaries</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Youtube className="h-5 w-5 mr-2 text-red-500" />
                Video Input
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-100 text-red-800">AI-Powered</Badge>
                <Badge variant="outline">Free to Use</Badge>
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
                  <p className="text-xs text-gray-500 mt-2">
                    <strong>Try these demo keywords:</strong> "photosynthesis", "algebra", "history", "chemistry"
                  </p>
                </div>
                
                <Button 
                  onClick={handleSummarize}
                  disabled={isLoading || !url.trim()}
                  className="w-full gradient-secondary text-white py-3"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing Video...
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 mr-2" />
                      Generate Summary
                    </>
                  )}
                </Button>
              </div>

              {/* Processing Steps */}
              {isLoading && (
                <div className="space-y-3 p-4 bg-edu-orange-50 rounded-lg">
                  <h4 className="font-medium text-edu-orange-800">AI Processing Steps:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Extracting audio from video
                    </div>
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Transcribing speech to text
                    </div>
                    <div className="flex items-center text-yellow-600">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                      Analyzing content with AI
                    </div>
                    <div className="flex items-center text-gray-400">
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                      Generating study summary
                    </div>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">What You Get:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-edu-blue-500" />
                    Structured key points
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-edu-orange-500" />
                    Save 80% study time
                  </div>
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-2 text-purple-500" />
                    Memory aids & tips
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Output */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-edu-blue-600" />
                  AI Summary
                </CardTitle>
                {summary && (
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={saveSummary}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={shareSummary}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                )}
              </div>
              
              {videoInfo && (
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{videoInfo.duration}</span>
                  <span>•</span>
                  <span>{videoInfo.views}</span>
                  <Badge variant="secondary">Summarized</Badge>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              {summary ? (
                <div className="space-y-4">
                  {videoInfo && (
                    <div className="p-3 bg-edu-blue-50 border border-edu-blue-200 rounded-lg">
                      <h4 className="font-medium text-edu-blue-800 mb-1">
                        {videoInfo.title}
                      </h4>
                    </div>
                  )}
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="p-4 bg-white border rounded-lg">
                      {summary.split('\n').map((line, index) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <h4 key={index} className="font-semibold text-gray-900 mt-4 mb-2 first:mt-0">
                              {line.replace(/\*\*/g, '')}
                            </h4>
                          );
                        } else if (line.startsWith('- ')) {
                          return (
                            <li key={index} className="ml-4 text-gray-700 mb-1">
                              {line.substring(2)}
                            </li>
                          );
                        } else if (line.trim()) {
                          return (
                            <p key={index} className="text-gray-700 mb-2">
                              {line}
                            </p>
                          );
                        } else {
                          return <br key={index} />;
                        }
                      })}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button onClick={clearSummary} variant="outline" className="flex-1">
                      Clear & Start New
                    </Button>
                    <Button onClick={() => navigate('/tests')} className="flex-1 gradient-primary text-white">
                      Practice with Tests
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Youtube className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No summary yet</h3>
                  <p>Enter a YouTube URL above to generate an AI-powered summary</p>
                  <p className="text-sm mt-2">Perfect for studying complex topics quickly</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
