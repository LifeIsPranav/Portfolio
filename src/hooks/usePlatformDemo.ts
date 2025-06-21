
import { useReducer } from 'react';

interface PlatformDemoState {
  activeTab: string;
  showAvatarMenu: boolean;
  showNotifications: boolean;
  notificationsRead: boolean;
  showNotificationPanel: boolean;
  showAvatarPanel: boolean;
  isFullscreen: boolean;
}

type PlatformDemoAction = 
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'TOGGLE_AVATAR_MENU' }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'SET_NOTIFICATIONS_READ'; payload: boolean }
  | { type: 'CLOSE_NOTIFICATION_PANEL' }
  | { type: 'CLOSE_AVATAR_PANEL' }
  | { type: 'TOGGLE_FULLSCREEN' }
  | { type: 'CLOSE_AVATAR_MENU' }
  | { type: 'CLOSE_NOTIFICATIONS' };

const initialState: PlatformDemoState = {
  activeTab: 'cues',
  showAvatarMenu: false,
  showNotifications: false,
  notificationsRead: false,
  showNotificationPanel: true,
  showAvatarPanel: true,
  isFullscreen: false
};

const platformDemoReducer = (state: PlatformDemoState, action: PlatformDemoAction): PlatformDemoState => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'TOGGLE_AVATAR_MENU':
      return { ...state, showAvatarMenu: !state.showAvatarMenu };
    case 'TOGGLE_NOTIFICATIONS':
      return { 
        ...state, 
        showNotifications: !state.showNotifications,
        notificationsRead: !state.showNotifications ? true : state.notificationsRead
      };
    case 'SET_NOTIFICATIONS_READ':
      return { ...state, notificationsRead: action.payload };
    case 'CLOSE_NOTIFICATION_PANEL':
      return { ...state, showNotificationPanel: false, showNotifications: false };
    case 'CLOSE_AVATAR_PANEL':
      return { ...state, showAvatarPanel: false, showAvatarMenu: false };
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullscreen: !state.isFullscreen };
    case 'CLOSE_AVATAR_MENU':
      return { ...state, showAvatarMenu: false };
    case 'CLOSE_NOTIFICATIONS':
      return { ...state, showNotifications: false };
    default:
      return state;
  }
};

export const usePlatformDemo = () => {
  const [state, dispatch] = useReducer(platformDemoReducer, initialState);

  return {
    ...state,
    setActiveTab: (tab: string) => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab }),
    toggleAvatarMenu: () => dispatch({ type: 'TOGGLE_AVATAR_MENU' }),
    toggleNotifications: () => dispatch({ type: 'TOGGLE_NOTIFICATIONS' }),
    closeNotificationPanel: () => dispatch({ type: 'CLOSE_NOTIFICATION_PANEL' }),
    closeAvatarPanel: () => dispatch({ type: 'CLOSE_AVATAR_PANEL' }),
    toggleFullscreen: () => dispatch({ type: 'TOGGLE_FULLSCREEN' }),
    closeAvatarMenu: () => dispatch({ type: 'CLOSE_AVATAR_MENU' }),
    closeNotifications: () => dispatch({ type: 'CLOSE_NOTIFICATIONS' })
  };
};
