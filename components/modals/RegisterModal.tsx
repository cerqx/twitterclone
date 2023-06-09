import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if(isLoading) {
      return;
    }

    registerModal.onClose()
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        username,
        name
      });

      toast.success("Account created.")

      registerModal.onClose();

      signIn('credentials', {
        email,
        password
      });
    } catch(err) {
      console.log(err);
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]); 

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input 
        placeholder='Email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isLoading}
      />

      <Input 
        placeholder='Name'
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={isLoading}
      />

      <Input 
        placeholder='Username'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        disabled={isLoading}
      />

      <Input 
        placeholder='Password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>Already have an account?
        <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Sign In</span>
      </p>
    </div>
  )

  return (
    <Modal 
      title="Create an account"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      actionLabel="Sign Up"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal