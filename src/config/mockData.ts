
import { Platform, Seed, Agent, Campaign, Notification, Comment } from '../types';

export const platforms: Platform[] = [
  { platform: 'LinkedIn', percentage: 89, color: 'convrt-purple' },
  { platform: 'Twitter', percentage: 67, color: 'blue-600' },
  { platform: 'Facebook', percentage: 45, color: 'green-600' },
  { platform: 'Reddit', percentage: 23, color: 'orange-600' }
];

export const seeds: Seed[] = [
  { name: "Michael Anderson", company: "TechCorp", status: "Warm", interactions: 5, stage: "Qualified" },
  { name: "Sarah Chen", company: "TechStart", status: "Hot", interactions: 8, stage: "Proposal" },
  { name: "David Kim", company: "InnovateLab", status: "Cold", interactions: 2, stage: "Research" }
];

export const agents: Agent[] = [
  { name: "LinkedIn Engagement Bot", status: "Active", tasks: 12, efficiency: "94%" },
  { name: "Twitter Outreach Agent", status: "Active", tasks: 8, efficiency: "87%" },
  { name: "Content Interaction AI", status: "Paused", tasks: 0, efficiency: "91%" }
];

export const campaigns: Campaign[] = [
  { name: "Q4 Enterprise Outreach", status: "Running", sent: 245, opened: 89, replied: 23 },
  { name: "Product Demo Follow-up", status: "Scheduled", sent: 0, opened: 0, replied: 0 },
  { name: "Re-engagement Campaign", status: "Completed", sent: 156, opened: 67, replied: 12 }
];

export const notifications: Notification[] = [
  { text: "New high-priority cue from Sarah Chen", time: "2m ago", type: "cue" },
  { text: "Campaign 'Q4 Enterprise' reached 90% completion", time: "15m ago", type: "campaign" },
  { text: "AI Agent discovered 5 new engagement opportunities", time: "1h ago", type: "agent" }
];

export const initialComments: Comment[] = [
  { id: 1, user: 'Mike Johnson', text: 'Great achievement! Congratulations on hitting your targets.', time: '2h ago' },
  { id: 2, user: 'Lisa Wang', text: 'Would love to learn more about the automation tools you mentioned.', time: '1h ago' }
];
