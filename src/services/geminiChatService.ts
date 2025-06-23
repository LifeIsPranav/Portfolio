import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiChatService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  // Get user profile information
  getProfile() {
    return {
      name: "Pranav Kumar",
      role: "Computer Science Undergrad | Aspiring Software Engineer",
      bio: "Computer Science undergraduate at NIT Patna with 2+ years of experience building scalable, microservices-driven projects. Passionate about system design, real-time applications, and leveraging cutting-edge technologies like Docker, Redis, and WebSockets to create efficient solutions.",
      
      // Academic Information
      education: {
        current: "B.Tech in Computer Science, NIT Patna (2023-2027) - CPI: 8.54",
        previous: [
          "Intermediate/+2 CBSE Modern School (2020-22) - 86.0%",
          "Matriculation CBSE St.Karens School (2020) - 90.4%"
        ],
        coursework: [
          "Data Structures and Algorithms", "Database Management Systems", "Artificial Intelligence",
          "Operating Systems", "Object-Oriented Programming", "Computer Networks",
          "Discrete Mathematics", "Linear Algebra", "Probability Theory"
        ]
      },

      // Technical Skills
      skills: {
        programming: ["C++", "Python", "JavaScript", "TypeScript", "Java", "SQL"],
        webTech: ["HTML", "Tailwind CSS", "Node.js", "React.js", "Express.js", "FastAPI"],
        specializations: [
          "Microservices & Monoliths", "RESTful APIs", "Docker", "GraphQL", "CORS",
          "MVC Pattern", "Queues (RabbitMQ & BullMQ)", "Redis", "Socket.IO"
        ],
        databases: ["MongoDB", "PostgreSQL", "MySQL"],
        cloud: ["AWS", "Microsoft Azure"],
        tools: [
          "Git & GitHub", "Vim", "Linux", "NGINX", "Winston (logging)",
          "Cryptography (symmetric & asymmetric)", "Pub-Sub architecture",
          "Middlewares", "DevOps (beginner)", "System Design (HLD/LLD beginner)"
        ]
      },

      // Professional Experience
      experience: [
        {
          title: "Technical Team Lead",
          company: "Robotics Club, NIT Patna",
          duration: "Present",
          description: "Leading technical development of robotics projects and competing in national competitions. Achieved 2 Gold and 1 Silver medals in inter-college Robowars (2023, 2024, 2025).",
          achievements: ["2 Gold medals", "1 Silver medal", "Team leadership", "Technical innovation"]
        }
      ],

      // Featured Projects (Algocode first!)
      projects: [
        {
          name: "Algocode: Microservices-Driven Coding Platform",
          description: "My flagship project - a comprehensive coding platform with dynamic code execution engine using Docker for secure, isolated code runs across 5+ programming languages.",
          keyFeatures: [
            "Dynamic code execution engine using Docker for secure & isolated runs",
            "Redis-based queuing mechanism for efficient code execution dispatch",
            "Socket.IO for asynchronous result delivery, reducing response times by 30%",
            "MongoDB with ODM and Zod for data modeling, authentication & session management",
            "Redis caching layer reducing database load by 20%",
            "Optimized HLD and LLD following MVC pattern for scalability and maintainability"
          ],
          tech: ["Docker", "Redis", "Socket.IO", "MongoDB", "Zod", "MVC Pattern", "Microservices"],
          impact: "30% faster response times, 20% reduced database load"
        },
        {
          name: "Inventory Management API - Backend & Frontend",
          description: "Full-stack inventory management platform with role-based access control and real-time tracking capabilities.",
          keyFeatures: [
            "Scalable RESTful backend with modular architecture",
            "Role-based user management and product tracking",
            "Real-time product tracking and automated low-stock detection",
            "Shelf-life monitoring & supplier location mapping",
            "JWT-based authentication with bcrypt password hashing",
            "Clean DTO architecture with versioned routing (/api/v1/)"
          ],
          tech: ["Node.js", "Express.js", "JWT", "bcrypt", "DTOs", "MVC", "RESTful APIs"]
        },
        {
          name: "RTC Backend: End-to-End Instant Messaging Platform",
          description: "Low-latency real-time chat application backend with comprehensive messaging features.",
          keyFeatures: [
            "WebSocket-based real-time communication using Socket.io",
            "TCP-based duplex communication channels",
            "One-to-one messaging, group chats, and typing indicators",
            "MongoDB with Mongoose for user authentication and chat history",
            "Session management and efficient data querying",
            "Modular, scalable codebase for easy debugging and maintenance"
          ],
          tech: ["Node.js", "Socket.io", "MongoDB", "Mongoose", "WebSockets", "TCP"]
        }
      ],

      // Personal Information
      interests: ["Robotics", "Chess", "Badminton", "System Design", "Open Source", "Competitive Programming"],
      contact: {
        email: "lifeispranav@gmail.com",
        linkedin: "linkedin.com/in/lifeispranav",
        github: "github.com/lifeispranav",
        website: "lifeispranav.me",
        leetcode: "leetcode.com/lifeispranav"
      },

      // Quick Stats
      stats: {
        yearsOfExperience: "2+",
        projectsCompleted: 3,
        languagesKnown: 6,
        competitionWins: "2 Gold, 1 Silver"
      }
    };
  }

  // Create system prompt with user information
  private createSystemPrompt(): string {
    const profile = this.getProfile();
    
    const allSkills = [
      ...profile.skills.programming,
      ...profile.skills.webTech,
      ...profile.skills.specializations,
      ...profile.skills.databases,
      ...profile.skills.cloud,
      ...profile.skills.tools
    ];
    
    return `You are an AI assistant representing ${profile.name}, a ${profile.role} at NIT Patna.

ABOUT ${profile.name.toUpperCase()}:
Bio: ${profile.bio}

Education: ${profile.education.current}
Academic Performance: Strong academic record with excellent grades
Coursework: ${profile.education.coursework.join(", ")}

Technical Skills:
• Programming Languages: ${profile.skills.programming.join(", ")}
• Web Technologies: ${profile.skills.webTech.join(", ")}
• Specializations: ${profile.skills.specializations.join(", ")}
• Databases: ${profile.skills.databases.join(", ")}
• Cloud Platforms: ${profile.skills.cloud.join(", ")}
• Tools & Technologies: ${profile.skills.tools.join(", ")}

Experience:
${profile.experience.map(exp => 
  `• ${exp.title} at ${exp.company} (${exp.duration}): ${exp.description}`
).join("\n")}

FLAGSHIP PROJECT - ALGOCODE (Most Important):
${profile.projects[0].name} (${profile.projects[0].url})
${profile.projects[0].description}
Key Features:
${profile.projects[0].keyFeatures.map(feature => `  - ${feature}`).join("\n")}
Technologies: ${profile.projects[0].tech.join(", ")}
Impact: ${profile.projects[0].impact}

Other Notable Projects:
${profile.projects.slice(1).map(proj => 
  `• ${proj.name} (${proj.url}): ${proj.description}
  Key Features: ${proj.keyFeatures.slice(0, 3).join(", ")}
  Tech Stack: ${proj.tech.join(", ")}`
).join("\n\n")}

Personal Interests: ${profile.interests.join(", ")}
Achievements: ${profile.stats.competitionWins} in Robowars competitions

Contact Information:
• Email: ${profile.contact.email}
• LinkedIn: ${profile.contact.linkedin}
• GitHub: ${profile.contact.github}
• Website: ${profile.contact.website}
• LeetCode: ${profile.contact.leetcode}

PERSONALITY & COMMUNICATION STYLE:
- Respond as if you ARE ${profile.name} (use "I" statements)
- Be enthusiastic about technology, especially when discussing Algocode
- Show pride in academic achievements at NIT Patna
- Demonstrate passion for microservices, system design, and scalable solutions
- Be friendly, professional, and detail-oriented
- When asked about projects, ALWAYS lead with Algocode as the flagship project
- Show excitement about robotics competitions and technical leadership

CRITICAL RESPONSE RULES:
- KEEP ALL RESPONSES UNDER 45 WORDS OR 320 CHARACTERS
- Be concise and punchy - avoid lengthy explanations
- Only provide detailed responses when explicitly asked for "brief", "detailed", or "more information"
- Focus on key highlights and impact metrics
- Use bullet points sparingly and only for 2-3 items max

IMPORTANT: When discussing projects, always prioritize Algocode as it's the most significant and complex project showcasing microservices architecture, Docker containerization, and real-time performance optimizations.

Current conversation context: This is through an interactive chatbot on ${profile.name}'s portfolio website.`;
  }

  // Generate chat response
  async generateResponse(message: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    // Fallback responses if no API key
    if (!this.model) {
      return this.getFallbackResponse(message);
    }

    try {
      const systemPrompt = this.createSystemPrompt();
      
      // Format conversation history for Gemini
      const conversationText = conversationHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      const fullPrompt = `${systemPrompt}\n\nConversation History:\n${conversationText}\n\nUser: ${message}\n\nAssistant:`;
      
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text() || this.getFallbackResponse(message);
      
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.getFallbackResponse(message);
    }
  }

  // Fallback responses when API is not available
  private getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    const profile = this.getProfile();
    const allSkills = [
      ...profile.skills.programming,
      ...profile.skills.webTech,
      ...profile.skills.specializations
    ];

    // Check if user wants detailed response
    const wantsDetail = lowerMessage.includes('brief') || lowerMessage.includes('detailed') || lowerMessage.includes('more info');

    // PRIORITIZE ALGOCODE PROJECT QUERIES
    if (lowerMessage.includes('algocode') || lowerMessage.includes('coding platform') || lowerMessage.includes('flagship')) {
      if (wantsDetail) {
        const algocodeProject = profile.projects[0];
        return `Algocode is my flagship project - ${algocodeProject.description} 

Key achievements:
• ${algocodeProject.keyFeatures[0]}
• ${algocodeProject.keyFeatures[1]}
• ${algocodeProject.keyFeatures[2]}

Built with ${algocodeProject.tech.join(", ")}. Check it out at ${algocodeProject.url}!`;
      }
      return `Algocode is my flagship coding platform with Docker execution engine. Achieved 30% faster response times using Redis queuing and Socket.IO.`;
    }
    
    if (lowerMessage.includes('project') && !lowerMessage.includes('algocode')) {
      if (wantsDetail) {
        return `My flagship project is Algocode - a microservices coding platform with Docker execution, Redis queuing (30% faster), and real-time Socket.IO. Also built inventory management and chat backends.`;
      }
      return `Algocode is my main project - Docker-based coding platform with 30% performance boost. Also built inventory and chat systems.`;
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      if (wantsDetail) {
        return `I specialize in ${allSkills.slice(0, 8).join(", ")} and more! Core strengths: microservices, Docker containerization, real-time systems.`;
      }
      return `I work with ${allSkills.slice(0, 4).join(", ")}, Docker, Redis. Focused on microservices and real-time systems.`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
      return `Technical Team Lead at Robotics Club, NIT Patna. Won 2 Gold, 1 Silver in Robowars. 2+ years building scalable projects.`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return `Email: ${profile.contact.email} | LinkedIn: ${profile.contact.linkedin} | GitHub: ${profile.contact.github} | Website: ${profile.contact.website}`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hi! I'm ${profile.name}, CS student at NIT Patna. I build scalable microservices like my flagship project Algocode. What would you like to know?`;
    }
    
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('nit')) {
      return `B.Tech CS at NIT Patna (CPI: 8.54). Learning through hands-on projects like Algocode to stay updated with latest tech.`;
    }

    if (lowerMessage.includes('achievement') || lowerMessage.includes('award') || lowerMessage.includes('competition')) {
      return `Won 2 Gold, 1 Silver in inter-college Robowars! Technical Team Lead at Robotics Club, NIT Patna.`;
    }

    // Default response
    return `I'm ${profile.name}, CS student at NIT Patna. Ask me about Algocode, my tech skills, or anything else!`;
  }

  // Check if Gemini is available
  isAvailable(): boolean {
    return !!this.model;
  }

  // Get conversation starters
  getConversationStarters(): string[] {
    return [
      "Tell me about your flagship project Algocode",
      "What makes your microservices architecture unique?",
      "How did you achieve 30% performance improvements?",
      "What's your experience with Docker and Redis?",
      "Tell me about your achievements at NIT Patna",
      "What technologies do you specialize in?",
      "How can I contact you for opportunities?"
    ];
  }
}

export default GeminiChatService;
