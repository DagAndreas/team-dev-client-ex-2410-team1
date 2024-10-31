import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import Button from '../button';
import useAuth from '../../hooks/useAuth';
import ProfileCircle from '../profileCircle';

const CreatePostModal = ({ addPost }) => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const { loggedInUser } = useAuth();
  const userInitials = `${loggedInUser.firstName[0]}${loggedInUser.lastName[0]}`;

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    setMessage('Submit button was clicked! Closing modal in 1 seconds...');
    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 1000);
    await addPost(text);
  };

  return (
    <>
      <section className="create-post-user-details">
        <ProfileCircle initials={userInitials} />

        <div className="post-user-name">
          {loggedInUser.firstName} {loggedInUser.lastName}
        </div>
      </section>

      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <Button
          onClick={onSubmit}
          text="Post"
          classes={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        />
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default CreatePostModal;
