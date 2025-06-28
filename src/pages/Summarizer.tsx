
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Youtube, Loader2, FileText, Clock, Save, Share2, ArrowLeft, Eye, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VideoInfo {
  title: string;
  description: string;
  duration: string;
  views: string;
  publishedAt: string;
  channelTitle: string;
  thumbnail?: string;
}

interface SummaryData {
  videoInfo: VideoInfo;
  summary: string;
  transcript: string;
}

const Summarizer = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [processingStep, setProcessingStep] = useState("");

  const handleSummarize = async () => {
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    // Validate YouTube URL
    const isValidYouTubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);
    if (!isValidYouTubeUrl) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    setProcessingStep("Extracting video information...");
    
    try {
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('youtube-summarizer', {
        body: { url: url.trim() }
      });

      if (error) {
        throw error;
      }

      setSummaryData(data);
      toast.success("Video summarized successfully!");
      
    } catch (error) {
      console.error('Error summarizing video:', error);
      toast.error("Failed to summarize video. Please try again.");
    } finally {
      setIsLoading(false);
      setProcessingStep("");
    }
  };

  const clearSummary = () => {
    setUrl("");
    setSummaryData(null);
  };

  const saveSummary = () => {
    if (summaryData) {
      const summaryText = `# ${summaryData.videoInfo.title}\n\n${summaryData.summary}`;
      const blob = new Blob([summaryText], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${summaryData.videoInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}_summary.md`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Summary downloaded successfully!");
    }
  };

  const shareSummary = async () => {
    if (summaryData && navigator.share) {
      try {
        await navigator.share({
          title: summaryData.videoInfo.title,
          text: summaryData.summary,
          url: url,
        });
        toast.success("Summary shared successfully!");
      } catch (error) {
        // Fallback to clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (summaryData) {
      const summaryText = `${summaryData.videoInfo.title}\n\n${summaryData.summary}\n\nOriginal video: ${url}`;
      navigator.clipboard.writeText(summaryText);
      toast.success("Summary copied to clipboard!");
    }
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">YouTube Summarizer</h1>
          <p className="text-xl text-gray-600">Transform any educational video into detailed study summaries</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Youtube className="h-5 w-5 mr-2 text-red-500" />
                  Video Input
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-100 text-red-800">AI-Powered</Badge>
                  <Badge variant="outline">Real-time</Badge>
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
                      Paste any YouTube video URL to get a detailed educational summary
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
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Summarize Video
                      </>
                    )}
                  </Button>
                </div>

                {/* Processing Steps */}
                {isLoading && (
                  <div className="space-y-3 p-4 bg-edu-orange-50 rounded-lg">
                    <h4 className="font-medium text-edu-orange-800">AI Processing:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Extracting video metadata
                      </div>
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Fetching video transcript
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                        Generating detailed summary
                      </div>
                      <div className="flex items-center text-gray-400">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        Formatting for study use
                      </div>
                    </div>
                    {processingStep && (
                      <p className="text-sm text-edu-orange-700 italic">{processingStep}</p>
                    )}
                  </div>
                )}

                {/* Features List */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">What You Get:</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-edu-blue-500" />
                      Structured detailed summary
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-edu-orange-500" />
                      Save 80% study time
                    </div>
                    <div className="flex items-center">
                      <Brain className="h-4 w-4 mr-2 text-purple-500" />
                      Key concepts highlighted
                    </div>
                    <div className="flex items-center">
                      <Save className="h-4 w-4 mr-2 text-green-500" />
                      Downloadable summaries
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Output */}
          <div className="lg:col-span-2">
            {summaryData ? (
              <div className="space-y-6">
                {/* Video Info Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {summaryData.videoInfo.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {summaryData.videoInfo.channelTitle}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {summaryData.videoInfo.duration}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {summaryData.videoInfo.views}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(summaryData.videoInfo.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                        {summaryData.videoInfo.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {summaryData.videoInfo.description}
                          </p>
                        )}
                      </div>
                      {summaryData.videoInfo.thumbnail && (
                        <img 
                          src={summaryData.videoInfo.thumbnail} 
                          alt="Video thumbnail"
                          className="w-24 h-16 object-cover rounded ml-4"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 pt-3 border-t">
                      <Button size="sm" variant="outline" onClick={saveSummary}>
                        <Save className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" onClick={shareSummary}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" onClick={clearSummary}>
                        Clear
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                {/* Detailed Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-edu-blue-600" />
                      Detailed Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none bg-white rounded-lg p-6 border">
                      {summaryData.summary.split('\n').map((line, index) => {
                        if (line.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">
                              {line.replace('## ', '')}
                            </h2>
                          );
                        } else if (line.startsWith('### ')) {
                          return (
                            <h3 key={index} className="text-lg font-semibold text-gray-800 mt-5 mb-2">
                              {line.replace('### ', '')}
                            </h3>
                          );
                        } else if (line.startsWith('- ')) {
                          return (
                            <li key={index} className="ml-4 text-gray-700 mb-1">
                              {line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                            </li>
                          );
                        } else if (line.startsWith('*') && line.endsWith('*')) {
                          return (
                            <p key={index} className="text-sm text-gray-600 italic mt-4 mb-2">
                              {line.replace(/^\*|\*$/g, '')}
                            </p>
                          );
                        } else if (line.trim() === '---') {
                          return <hr key={index} className="my-6 border-gray-200" />;
                        } else if (line.match(/^\d+\./)) {
                          return (
                            <li key={index} className="ml-4 text-gray-700 mb-1 list-decimal">
                              {line.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                            </li>
                          );
                        } else if (line.trim()) {
                          return (
                            <p key={index} className="text-gray-700 mb-3" 
                               dangerouslySetInnerHTML={{
                                 __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                               }}>
                            </p>
                          );
                        } else {
                          return <br key={index} />;
                        }
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button onClick={clearSummary} variant="outline" className="flex-1">
                    Summarize Another Video
                  </Button>
                  <Button onClick={() => navigate('/tests')} className="flex-1 gradient-primary text-white">
                    Practice with Tests
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Youtube className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No summary yet</h3>
                  <p className="text-gray-500">Enter a YouTube URL to generate a detailed AI summary</p>
                  <p className="text-sm text-gray-400 mt-2">Perfect for studying complex educational content</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
