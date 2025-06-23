# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/50068c47-1a49-461d-a839-cedf70ff9dd5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/50068c47-1a49-461d-a839-cedf70ff9dd5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/50068c47-1a49-461d-a839-cedf70ff9dd5) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
# Portfolio

## AI Chatbot Integration with Text-to-Speech

This portfolio includes a personalized AI chatbot powered by **Google Gemini** (cheaper alternative to OpenAI) with advanced text-to-speech capabilities using Sarvam AI's male voice (Abhilash).

### Features

- **Personalized Responses**: The chatbot is trained with specific information about the portfolio owner
- **Cost-Effective AI**: Uses Google Gemini (free tier available!) instead of expensive OpenAI
- **Text-to-Speech**: Hear chatbot responses in natural male voice (Abhilash from Sarvam AI)
  - 🔊 **Voice Playback**: AI responses are automatically spoken aloud
  - 🎧 **Audio Controls**: Toggle auto-speak on/off, manual playback controls
  - 👨 **Male Voice**: Uses Abhilash voice for professional, clear speech
- **Modern UI**: Beautiful, responsive chat interface with glassmorphism design
- **Smart Context**: Maintains conversation context for more natural interactions
- **Fallback System**: Works even without API keys using intelligent fallback responses
- **Theme Support**: Adapts to light/dark theme preferences

### Setup Instructions

1. **Get Google Gemini API Key (FREE!)**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key (FREE tier available!)
   - Copy your API key

2. **Get Sarvam AI API Key (for voice features)**
   - Visit [Sarvam AI](https://www.sarvam.ai/)
   - Sign up and get your API key
   - Copy your API key

3. **Configure Environment Variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your API keys
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_SARVAM_API_KEY=your_sarvam_api_key_here
   ```

4. **Customize Your Information**
   - Edit `src/services/chatService.ts`
   - Update the `defaultUserInfo` object with your personal information:
     - Name, skills, experience, projects, bio, education, achievements, interests

### Usage

- The voice-enabled chatbot appears as a floating button in the bottom-right corner
- Click to open the chat interface
- **Text Chat**: Type your questions about skills, experience, projects, or background
- **Voice Chat**: 
  - Click the microphone button to start voice recording
  - Speak your question (will be converted to text via Sarvam AI)
  - Click the speaker button to hear the AI response in voice
  - Use headphone button for hands-free audio experience
- The AI will provide personalized responses based on the configured information

### Voice Features Details

**Speech-to-Text (STT)**
- Uses Sarvam AI's advanced speech recognition
- Supports English with Indian accent optimization
- Real-time voice recording and transcription

**Text-to-Speech (TTS)** 
- Natural voice synthesis using Sarvam AI
- Multiple voice options (default: Meera)
- Adjustable speech parameters (pitch, pace, loudness)

**Audio Controls**
- 🎤 Start/stop voice recording
- 🔊 Play/pause audio responses  
- 🎧 Toggle audio mode
- 🔇 Mute/unmute controls

### Browser Requirements

For voice features to work:
- Modern browser with Web Audio API support
- Microphone access permission
- HTTPS connection (required for microphone access)

### Security Note

For production deployment, it's recommended to:
- Use a backend service to handle API calls (OpenAI + Sarvam AI)
- Keep your API keys secure on the server side
- Implement rate limiting and user authentication
- Use HTTPS for secure microphone access

### Customization

You can customize the chatbot by:
- Modifying the system prompt in `enhancedChatService.ts`
- Updating the UI components in `VoiceEnabledChatbot.tsx`
- Adding new user information fields
- Changing the conversation starters and responses
- Adjusting voice parameters in `sarvamAIService.ts`
- Customizing audio controls and recording settings

### Troubleshooting Voice Features

#### **"Could not transcribe audio" Error**

This error typically occurs due to:

1. **Audio Recording Issues**:
   ```bash
   # Check browser console for errors
   # Look for "Recording audio", "Converting audio" logs
   # Verify audio duration is at least 1-2 seconds
   ```

2. **API Key Issues**:
   ```bash
   # Verify your Sarvam AI API key in .env
   VITE_SARVAM_API_KEY=your_actual_key_here
   
   # Restart the dev server after adding the key
   npm run dev
   ```

3. **Audio Format Issues**:
   - The app now converts WebM to WAV automatically
   - Check browser console for "Audio converted to WAV" message
   - Ensure recording duration is at least 2 seconds
   - Try speaking louder and clearer

4. **Network/API Issues**:
   ```bash
   # Check network tab in browser dev tools
   # Look for failed requests to api.sarvam.ai
   # Check for 400/401/429 status codes
   # Verify API key permissions and quotas
   ```

5. **Sarvam AI Specific Issues**:
   ```bash
   # The app now sends proper File objects to Sarvam API
   # Check console for "Sending audio to Sarvam AI" logs
   # Look for specific error messages in console
   ```

#### **Microphone Not Working**

1. **Browser Permissions**:
   - Click the microphone icon in address bar
   - Grant microphone permissions
   - Refresh the page after granting permissions

2. **HTTPS Requirement**:
   - Microphone access requires HTTPS in production
   - Works on localhost for development
   - Deploy with SSL certificate for production

3. **Browser Compatibility**:
   - Chrome, Firefox, Safari, Edge (modern versions)
   - Mobile browsers may have limitations
   - Check console for "Web Audio API" support messages

#### **No Audio Playback**

1. **Browser Audio Policy**:
   - Most browsers require user interaction before audio playback
   - Click the speaker button manually first time
   - Check browser audio settings

2. **Audio Format Issues**:
   - Sarvam AI returns base64 encoded audio
   - Check console for "Audio playback failed" messages
   - Verify audio data is being received

#### **Debug Mode**

Enable detailed logging by opening browser console:
```javascript
// Check audio recording
console.log('Recording state:', mediaRecorder.state);

// Check API responses  
console.log('Sarvam responses in Network tab');

// Test API connectivity (paste in console)
// (Only works if chatbot is open)
```

#### **Common Solutions**

1. **Refresh the page** and try again
2. **Clear browser cache** and reload
3. **Check internet connection** for API calls
4. **Use headphones** to avoid audio feedback
5. **Speak clearly** and avoid background noise

#### **API Limits**

- Sarvam AI has usage limits per API key
- Check your quota at https://www.sarvam.ai/
- Monitor console for rate limiting errors

## 🎨 **New Modern Design Features**

The chatbot now features a completely redesigned interface inspired by modern card-based layouts:

### **Visual Improvements:**
- ✨ **Glassmorphism Design**: Translucent background with backdrop blur effects
- 🌈 **Gradient Elements**: Beautiful gradient avatars, buttons, and borders
- 📱 **Card-Based Layout**: Clean, modern card interface with rounded corners
- 🎭 **Enhanced Animations**: Smooth hover effects, scale animations, and transitions
- 🔮 **Floating Elements**: Dynamic floating button with pulsing indicators

### **UI/UX Enhancements:**
- 🎯 **Better Visual Hierarchy**: Clear separation between user and AI messages
- 💎 **Premium Feel**: Sophisticated color scheme with purple/pink gradients
- 📐 **Improved Spacing**: Better padding, margins, and content organization
- 🎨 **Modern Icons**: Updated iconography with proper visual weight
- ⚡ **Micro-interactions**: Delightful hover and tap animations

### **Technical Features:**
- 🔧 **Better Responsiveness**: Optimized for different screen sizes
- 🎪 **Framer Motion**: Advanced animations and transitions
- 🌓 **Dark Mode**: Full dark mode support with proper contrast
- 📱 **Touch Friendly**: Larger touch targets for mobile devices
