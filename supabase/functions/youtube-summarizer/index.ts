
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'YouTube URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract video ID from YouTube URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing YouTube video:', videoId);

    // Get video metadata using YouTube API
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!apiKey) {
      console.log('No YouTube API key found, using demo data');
      const demoSummary = generateDemoSummary(url);
      return new Response(
        JSON.stringify(demoSummary),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch video details from YouTube API
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics`
    );

    if (!videoResponse.ok) {
      console.error('YouTube API error:', await videoResponse.text());
      throw new Error('Failed to fetch video details');
    }

    const videoData = await videoResponse.json();
    
    if (!videoData.items || videoData.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Video not found or is private' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const video = videoData.items[0];
    console.log('Video found:', video.snippet.title);
    
    // Get captions/transcript
    const transcript = await getVideoTranscript(videoId, apiKey);
    
    // Generate AI summary
    const summary = await generateAISummary(transcript, video.snippet);

    const result = {
      videoInfo: {
        title: video.snippet.title,
        description: video.snippet.description?.substring(0, 300) + (video.snippet.description?.length > 300 ? '...' : ''),
        duration: formatDuration(video.contentDetails.duration),
        views: formatViews(video.statistics.viewCount),
        publishedAt: video.snippet.publishedAt,
        channelTitle: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url
      },
      summary: summary,
      transcript: transcript
    };

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in youtube-summarizer:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process video', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViews(views: string): string {
  const num = parseInt(views);
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
  return `${num} views`;
}

async function getVideoTranscript(videoId: string, apiKey: string): Promise<string> {
  try {
    // Get captions list
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${apiKey}&part=snippet`
    );
    
    if (!captionsResponse.ok) {
      return "Transcript not available for this video.";
    }
    
    const captionsData = await captionsResponse.json();
    
    if (!captionsData.items || captionsData.items.length === 0) {
      return "No captions available for this video.";
    }
    
    // For demo purposes, return a placeholder
    return "This is a placeholder transcript. In a full implementation, this would contain the actual video transcript extracted from YouTube captions.";
    
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return "Unable to fetch transcript for this video.";
  }
}

async function generateAISummary(transcript: string, snippet: any): Promise<string> {
  const openAIKey = Deno.env.get('OPENAI_API_KEY');
  
  if (!openAIKey) {
    console.log('No OpenAI API key found, generating enhanced demo summary');
    return generateDetailedDemoSummary(snippet.title, snippet.description);
  }
  
  try {
    console.log('Generating AI summary with OpenAI...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an educational AI assistant that creates comprehensive, structured summaries of educational videos. Your summaries should be:
            1. Well-organized with clear headings and subheadings
            2. Include key concepts, definitions, and important points
            3. Highlight main takeaways and learning objectives
            4. Use bullet points and numbered lists for clarity
            5. Include study tips and suggestions for further learning
            6. Format using markdown for better readability
            
            Structure your response with sections like:
            - Overview/Introduction
            - Key Concepts
            - Main Points/Topics Covered
            - Important Facts/Figures
            - Study Tips/Recommendations
            - Summary/Conclusion`
          },
          {
            role: 'user',
            content: `Please create a comprehensive educational summary of this video:
            
            Title: "${snippet.title}"
            ${snippet.description ? `Description: "${snippet.description.substring(0, 500)}"` : ''}
            ${transcript !== "Transcript not available for this video." && transcript !== "No captions available for this video." ? `Transcript: "${transcript.substring(0, 2000)}"` : ''}
            
            Please provide a detailed, study-friendly summary that helps students understand and learn from this content.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, await response.text());
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return generateDetailedDemoSummary(snippet.title, snippet.description);
  }
}

function generateDetailedDemoSummary(title: string, description: string): string {
  const lowerTitle = title.toLowerCase();
  const lowerDesc = description.toLowerCase();
  
  // Generate contextual summary based on title and description
  let summary = `## 📚 Video Summary: ${title}\n\n`;
  
  if (lowerTitle.includes('math') || lowerTitle.includes('algebra') || lowerTitle.includes('calculus')) {
    summary += `### 🧮 Mathematical Concepts Covered:
- **Problem-solving techniques** and step-by-step approaches
- **Key formulas** and when to apply them
- **Common mistakes** to avoid
- **Practice problems** with detailed solutions

### 🎯 Learning Objectives:
- Master the fundamental concepts presented
- Develop problem-solving skills
- Build confidence in mathematical reasoning
- Apply concepts to real-world scenarios

### 📝 Study Tips:
- Practice the examples shown multiple times
- Work through additional problems
- Create formula reference cards
- Form study groups to discuss concepts`;
  
  } else if (lowerTitle.includes('science') || lowerTitle.includes('physics') || lowerTitle.includes('chemistry') || lowerTitle.includes('biology')) {
    summary += `### 🔬 Scientific Concepts Explained:
- **Core principles** and fundamental laws
- **Real-world applications** and examples
- **Experimental procedures** and observations
- **Key terminology** and definitions

### 🎯 Learning Outcomes:
- Understand the scientific method
- Connect theory to practical applications
- Develop analytical thinking skills
- Prepare for assessments and experiments

### 📊 Key Takeaways:
- Important facts and figures
- Cause and effect relationships
- Process flows and cycles
- Connections to other scientific fields`;
  
  } else if (lowerTitle.includes('history') || lowerTitle.includes('social')) {
    summary += `### 🏛️ Historical Context:
- **Timeline** of important events
- **Key figures** and their contributions
- **Cause and effect** relationships
- **Cultural and social impact**

### 🎯 Critical Analysis:
- Multiple perspectives on events
- Primary and secondary sources
- Long-term consequences
- Connections to modern times

### 📚 Study Focus:
- Important dates and periods
- Key terms and concepts
- Essay questions and themes
- Research and citation skills`;
  
  } else if (lowerTitle.includes('language') || lowerTitle.includes('english') || lowerTitle.includes('writing')) {
    summary += `### 📖 Language Skills Development:
- **Grammar rules** and proper usage
- **Vocabulary expansion** and context
- **Writing techniques** and structure
- **Reading comprehension** strategies

### 🎯 Communication Goals:
- Improve written expression
- Enhance verbal communication
- Develop critical reading skills
- Build confidence in language use

### ✍️ Practice Areas:
- Essay writing and structure
- Grammar exercises
- Vocabulary building
- Reading analysis techniques`;
  
  } else {
    summary += `### 📖 Educational Content Overview:
- **Main topics** covered in the video
- **Key concepts** and important points
- **Practical applications** and examples
- **Supporting evidence** and explanations

### 🎯 Learning Objectives:
- Understand the primary subject matter
- Connect concepts to real-world scenarios
- Develop critical thinking skills
- Prepare for further learning

### 📚 Study Recommendations:
- Take notes on key points
- Review and summarize content
- Practice with additional resources
- Discuss concepts with peers`;
  }
  
  summary += `

### ⏱️ Time Management:
- **Recommended study time**: 15-30 minutes for review
- **Best practices**: Active note-taking during video
- **Follow-up**: Additional reading and practice exercises

### 🔗 Next Steps:
1. **Review** the summary and key points
2. **Practice** with related exercises
3. **Research** additional resources
4. **Test** your understanding with quizzes

---
*This summary was generated by AI to help you study more effectively. Use it as a study guide alongside the original video content.*`;

  return summary;
}

function generateDemoSummary(url: string) {
  return {
    videoInfo: {
      title: "Educational Video Summary",
      description: "AI-generated summary of educational content",
      duration: "12:45",
      views: "125K views",
      publishedAt: new Date().toISOString(),
      channelTitle: "Educational Channel",
      thumbnail: "https://via.placeholder.com/320x180/3b82f6/ffffff?text=Video+Thumbnail"
    },
    summary: generateDetailedDemoSummary("Educational Content", "This video covers important educational concepts and practical applications for students."),
    transcript: "This is a demo implementation. The full version would extract the actual video transcript and provide detailed summaries based on the real content."
  };
}
