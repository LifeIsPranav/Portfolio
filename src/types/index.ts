
export interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
}

export interface Platform {
  platform: string;
  percentage: number;
  color: string;
}

export interface Seed {
  name: string;
  company: string;
  status: 'Hot' | 'Warm' | 'Cold';
  interactions: number;
  stage: string;
}

export interface Agent {
  name: string;
  status: 'Active' | 'Paused';
  tasks: number;
  efficiency: string;
}

export interface Campaign {
  name: string;
  status: 'Running' | 'Scheduled' | 'Completed';
  sent: number;
  opened: number;
  replied: number;
}

export interface Notification {
  text: string;
  time: string;
  type: 'cue' | 'campaign' | 'agent';
}

export interface TabInfo {
  title: string;
  subtitle: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
}
