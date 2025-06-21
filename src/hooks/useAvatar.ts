
import { useState } from 'react';

export const useAvatar = () => {
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarImage(e.target?.result as string);
        setShowAvatarUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    avatarImage,
    showAvatarUpload,
    setShowAvatarUpload,
    handleAvatarUpload
  };
};
