import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend service
});

interface UserInfo {
  name: string;
  skills: string[];
  experience: string[];
  projects: string[];
  bio: string;
  education?: string[];
  achievements?: string[];
  interests?: string[];
}

const defaultUserInfo: UserInfo = {
  name: "Pranav",
  skills: [
    "React", "TypeScript", "Node.js", "Python", "JavaScript",
    "Next.js", "Tailwind CSS", "MongoDB", "PostgreSQL", "Express.js",
    "AI/ML", "OpenAI Integration", "Full Stack Development",
    "RESTful APIs", "GraphQL", "Docker", "AWS", "Git", "Agile",
    "Redux Toolkit", "Fastify", "JWT & OAuth Authentication", "Redis",
    "LLM Integration", "Prompt Engineering", "HTML5", "CSS3",
    "Data Structures & Algorithms", "Problem Solving", "Hackathon Development"
 ],
  experience: [
    "Full Stack Developer experienced in MERN stack (MongoDB, Express, React, Node.js)",
    "Frontend Developer building responsive and interactive UIs using React and Tailwind CSS",
    "Backend Developer with REST API expertise using Express and Fastify",
    "AI Enthusiast integrating LLMs and building intelligent web interfaces",
    "Built a Retail Supply Chain Optimization Website for Walmart Sparkathon",
    "Developed a Linktree-like app with custom user dashboards and dynamic routing",
    "Hands-on with Redis queues, authentication systems, and database design",
    "Strong foundation in DSA and algorithms with focus on performance optimization",
    "Open Source Contributor and passionate problem-solver"
  ],
  projects: [
    "Modern Portfolio Website with AI Chatbot Integration",
    "E-commerce Platform with React and Node.js",
    "Inventory Management System with Real-time Updates",
    "AI-Powered Chat Application using OpenAI",
    "Task Management App with Collaborative Features",
    "Data Visualization Dashboard with React and D3.js"
  ],
  bio: "Passionate full-stack developer with expertise in modern web technologies and AI integration. I love building scalable applications that solve real-world problems and have a keen interest in emerging technologies.",
  education: [
    "Bachelor's in Computer Science",
    "Self-taught in various programming languages and frameworks",
    "Continuous learner through online courses and certifications"
  ],
  achievements: [
    "Built 10+ successful web applications",
    "Contributed to several open-source projects",
    "Helped teams improve development workflows",
    "Successfully integrated AI features in multiple projects"
  ],
  interests: [
    "Artificial Intelligence and Machine Learning",
    "Web Development Trends",
    "Open Source Development",
    "Technology Innovation",
    "Problem Solving",
    "Continuous Learning"
  ]
};

export class PersonalizedChatService {
  private userInfo: UserInfo;
  private systemPrompt: string;

  constructor(userInfo: UserInfo = defaultUserInfo) {
    this.userInfo = userInfo;
    this.systemPrompt = this.generateSystemPrompt();
  }

  private generateSystemPrompt(): string {
    return `You are ${this.userInfo.name}'s personal AI assistant on their portfolio website. You are knowledgeable, friendly, and professional. Your role is to help visitors learn about ${this.userInfo.name}'s professional background, skills, and experience.

Here's what you know about ${this.userInfo.name}:

**Bio**: ${this.userInfo.bio}

**Technical Skills**: ${this.userInfo.skills.join(', ')}

**Professional Experience**: 
${this.userInfo.experience.map(exp => `- ${exp}`).join('\n')}

**Notable Projects**: 
${this.userInfo.projects.map(project => `- ${project}`).join('\n')}

**Education**: 
${this.userInfo.education?.map(edu => `- ${edu}`).join('\n') || 'Self-taught developer with continuous learning approach'}

**Achievements**: 
${this.userInfo.achievements?.map(achievement => `- ${achievement}`).join('\n') || 'Multiple successful projects and continuous skill development'}

**Interests**: ${this.userInfo.interests?.join(', ') || 'Technology, web development, and innovation'}

**Guidelines for responses**:
1. Be concise but informative (2-3 sentences typically)
2. Always speak about ${this.userInfo.name} in third person
3. Focus on professional aspects unless asked about personal interests
4. If asked about contact/hiring, encourage visitors to use the contact form or reach out directly
5. If asked about something you don't know, be honest but redirect to ${this.userInfo.name}'s strengths
6. Be enthusiastic about ${this.userInfo.name}'s skills and experience
7. Provide specific examples when possible
8. Keep responses conversational and engaging

Remember, your goal is to showcase ${this.userInfo.name}'s expertise and encourage potential clients or employers to reach out!`;
  }

  async generateResponse(userMessage: string, conversationHistory: Array<{role: 'user' | 'assistant', content: string}> = []): Promise<string> {
    try {
      // Check if API key is available
      if (!import.meta.env.VITE_OPENAI_API_KEY) {
        return this.generateFallbackResponse(userMessage);
      }

      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: this.systemPrompt },
        ...conversationHistory.map(msg => ({ 
          role: msg.role as 'user' | 'assistant', 
          content: msg.content 
        })),
        { role: 'user', content: userMessage }
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 200,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      return completion.choices[0]?.message?.content || this.generateFallbackResponse(userMessage);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateFallbackResponse(userMessage);
    }
  }

  private generateFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
      return `${this.userInfo.name} has expertise in ${this.userInfo.skills.slice(0, 5).join(', ')} and many more technologies. They're particularly skilled in full-stack development with a focus on React and modern web technologies.`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return `${this.userInfo.name} has ${this.userInfo.experience[0]}. They specialize in building scalable web applications and have experience across the full development stack.`;
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
      const featuredProjects = this.userInfo.projects.slice(0, 3);
      return `Some of ${this.userInfo.name}'s notable projects include: ${featuredProjects.join(', ')}. Each project demonstrates their ability to work with different technologies and solve complex problems.`;
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me')) {
      return `${this.userInfo.bio} ${this.userInfo.name} brings ${this.userInfo.experience[0].toLowerCase()} and is passionate about creating innovative solutions.`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('reach')) {
      return `${this.userInfo.name} is open to new opportunities! Feel free to reach out through the contact form on this portfolio or connect via the social links provided. They're always excited to discuss interesting projects and opportunities.`;
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      return `${this.userInfo.name} has ${this.userInfo.education?.[0] || 'a strong educational background'} and believes in continuous learning. They stay updated with the latest technologies through self-study and practical projects.`;
    }
    
    // Default response
    return `That's an interesting question! ${this.userInfo.name} is a ${this.userInfo.experience[0].toLowerCase()} with expertise in ${this.userInfo.skills.slice(0, 3).join(', ')} and more. What specific aspect of their background would you like to know more about?`;
  }

  updateUserInfo(newUserInfo: Partial<UserInfo>) {
    this.userInfo = { ...this.userInfo, ...newUserInfo };
    this.systemPrompt = this.generateSystemPrompt();
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }
}

export default PersonalizedChatService;
