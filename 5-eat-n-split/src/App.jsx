import { useState } from 'react';
import Button from './components/Button';
import FormAddFriend from './components/FormAddFriend';
import FormSplitBill from './components/FormSplitBill';
import FriendsList from './components/FriendsList';

export default function App() {
  const [showAddFriend, setAddFriend] = useState(false);
  function handleShowAddFriend() {
    setAddFriend((show) => !show);
  }
    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList />
                {showAddFriend && <FormAddFriend />}
                <Button onClick={handleShowAddFriend} >{showAddFriend ? 'Close' : 'Add Friend'}</Button>
        </div>
        <FormSplitBill />
        </div>
    );
}
