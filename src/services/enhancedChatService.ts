// Enhanced chat service that can work with or without OpenAI
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface UserProfile {
  name: string;
  skills: string[];
  experience: string[];
  projects: string[];
  bio: string;
}

const defaultProfile: UserProfile = {
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
    "Data Visualization Dashboard with React and D3.js",
    "Retail Supply Chain Optimization Website (Walmart Sparkathon)",
    "Linktree-like Personal Dashboard App"
  ],
  bio: "Passionate full-stack developer with expertise in modern web technologies and AI integration. I love building scalable applications that solve real-world problems and have a keen interest in emerging technologies."
};

export class EnhancedChatService {
  private profile: UserProfile;
  private useOpenAI: boolean;
  private openai: any = null;

  constructor(profile: UserProfile = defaultProfile) {
    this.profile = profile;
    this.useOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY;
    
    if (this.useOpenAI) {
      this.initializeOpenAI();
    }
  }

  private async initializeOpenAI() {
    try {
      // Dynamically import OpenAI only if needed
      const OpenAI = (await import('openai')).default;
      this.openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });
    } catch (error) {
      console.warn('OpenAI not available, using fallback responses');
      this.useOpenAI = false;
    }
  }

  async generateResponse(message: string, history: ChatMessage[] = []): Promise<string> {
    if (this.useOpenAI && this.openai) {
      return this.generateOpenAIResponse(message, history);
    }
    return this.generateFallbackResponse(message);
  }

  private async generateOpenAIResponse(message: string, history: ChatMessage[]): Promise<string> {
    try {
      const systemPrompt = this.createSystemPrompt();
      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...history.slice(-6), // Last 6 messages for context
        { role: 'user' as const, content: message }
      ];

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 200,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      return completion.choices[0]?.message?.content || this.generateFallbackResponse(message);
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateFallbackResponse(message);
    }
  }

  private createSystemPrompt(): string {
    return `You are ${this.profile.name}'s personal AI assistant on their portfolio website. You are knowledgeable, friendly, and professional. Your role is to help visitors learn about ${this.profile.name}'s professional background, skills, and experience.

Here's what you know about ${this.profile.name}:

**Bio**: ${this.profile.bio}

**Technical Skills**: ${this.profile.skills.join(', ')}

**Professional Experience**: 
${this.profile.experience.map(exp => `- ${exp}`).join('\n')}

**Notable Projects**: 
${this.profile.projects.map(project => `- ${project}`).join('\n')}

**Guidelines for responses**:
1. Be concise but informative (2-3 sentences typically)
2. Always speak about ${this.profile.name} in third person
3. Focus on professional aspects unless asked about personal interests
4. If asked about contact/hiring, encourage visitors to use the contact form or reach out directly
5. Be enthusiastic about ${this.profile.name}'s skills and experience
6. Provide specific examples when possible
7. Keep responses conversational and engaging

Remember, your goal is to showcase ${this.profile.name}'s expertise and encourage potential clients or employers to reach out!`;
  }

  private generateFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      return `${this.profile.name} has expertise in ${this.profile.skills.slice(0, 6).join(', ')} and many more technologies. They're particularly skilled in full-stack development with a focus on React and modern web technologies.`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return `${this.profile.name} is a ${this.profile.experience[0]}. They specialize in building scalable web applications and have experience across the full development stack.`;
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
      const featuredProjects = this.profile.projects.slice(0, 3);
      return `Some of ${this.profile.name}'s notable projects include: ${featuredProjects.join(', ')}. Each project demonstrates their ability to work with different technologies and solve complex problems.`;
    }
    
    if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me')) {
      return `${this.profile.bio} ${this.profile.name} brings extensive experience in full-stack development and is passionate about creating innovative solutions.`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('reach')) {
      return `${this.profile.name} is open to new opportunities! Feel free to reach out through the contact form on this portfolio or connect via the social links provided. They're always excited to discuss interesting projects and opportunities.`;
    }

    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
      return `${this.profile.name} has experience with AI/ML and has integrated AI features into multiple projects, including this very chatbot! They're passionate about leveraging AI to create intelligent user experiences.`;
    }

    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('learn')) {
      return `${this.profile.name} has a strong educational background in Computer Science and believes in continuous learning. They stay updated with the latest technologies through self-study, online courses, and hands-on projects.`;
    }

    if (lowerMessage.includes('hackathon') || lowerMessage.includes('competition')) {
      return `${this.profile.name} has participated in hackathons, including building a Retail Supply Chain Optimization Website for Walmart Sparkathon. They enjoy the challenge of rapid prototyping and innovative problem-solving.`;
    }
    
    // Default response
    return `That's an interesting question! ${this.profile.name} is a skilled full-stack developer with expertise in ${this.profile.skills.slice(0, 3).join(', ')} and more. What specific aspect of their background would you like to know more about?`;
  }

  getProfile(): UserProfile {
    return this.profile;
  }

  isUsingOpenAI(): boolean {
    return this.useOpenAI;
  }
}

export default EnhancedChatService;
