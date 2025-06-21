
import { useState } from 'react';
import { Comment } from '../types';
import { initialComments } from '../config/mockData';

export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        user: 'You',
        text: newComment,
        time: 'now'
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const deleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return {
    comments,
    newComment,
    setNewComment,
    addComment,
    deleteComment
  };
};
