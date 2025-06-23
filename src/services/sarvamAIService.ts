import axios from "axios";
import toWav from "audiobuffer-to-wav";

interface SarvamTTSResponse {
  audios: string[];
}

interface SarvamSTTResponse {
  transcript?: string;
  text?: string;
  result?: string;
  data?: {
    transcript?: string;
    text?: string;
  };
}

export class SarvamAIService {
  private apiKey: string;
  private baseURL = 'https://api.sarvam.ai';

  constructor() {
    this.apiKey = import.meta.env.VITE_SARVAM_API_KEY || '';
  }

  // Text-to-Speech using Sarvam AI with Arjun voice (male voice)
  async textToSpeech(text: string, voice: string = 'arjun'): Promise<string | null> {
    if (!this.apiKey) {
      console.warn('Sarvam AI API key not found. Voice features disabled.');
      return null;
    }

    // Truncate text if too long
    const truncatedText = text.length > 500 ? text.substring(0, 500) + '...' : text;
    
    console.log('Making TTS request with:', { 
      text: truncatedText.substring(0, 100), 
      voice, 
      apiKey: this.apiKey.substring(0, 10) + '...',
      textLength: truncatedText.length 
    });

    try {
      const response = await axios.post<SarvamTTSResponse>(
        `${this.baseURL}/text-to-speech`,
        {
          inputs: [truncatedText],
          target_language_code: 'en-IN',
          speaker: voice,
          pitch: 0,
          pace: 1.0,
          loudness: 1.0,
          speech_sample_rate: 8000,
          enable_preprocessing: true,
          model: 'bulbul:v1'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'API-Subscription-Key': this.apiKey
          }
        }
      );

      console.log('TTS Response:', { status: response.status, audioCount: response.data.audios?.length });

      if (response.data.audios && response.data.audios.length > 0) {
        return response.data.audios[0];
      }
      return null;
    } catch (error) {
      console.error('Sarvam TTS Error:', error);
      if (axios.isAxiosError(error)) {
        console.error('TTS Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      return null;
    }
  }

  // Play audio from base64 string
  playAudio(base64Audio: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error('Audio playback failed'));
        audio.play();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Check if voice features are available (TTS only)
  isVoiceEnabled(): boolean {
    return !!this.apiKey;
  }

  // Test API connectivity
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      console.warn('Sarvam AI API key not found');
      return false;
    }

    try {
      // Test with a simple TTS request
      const response = await axios.post(
        `${this.baseURL}/text-to-speech`,
        {
          inputs: ["test"],
          target_language_code: 'en-IN',
          speaker: 'arjun',
          pitch: 0,
          pace: 1.0,
          loudness: 1.0,
          speech_sample_rate: 8000,
          enable_preprocessing: true,
          model: 'bulbul:v1'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'API-Subscription-Key': this.apiKey
          }
        }
      );
      
      console.log('Sarvam API test successful:', response.status === 200);
      return response.status === 200;
    } catch (error) {
      console.error('Sarvam API test failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      return false;
    }
  }
}

export default SarvamAIService;
