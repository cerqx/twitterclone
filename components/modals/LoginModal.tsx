import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if(isLoading) {
      return;
    }

    loginModal.onClose()
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn('credentials', {
        email,
        password
      })

      loginModal.onClose();
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input 
        placeholder='Email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={isLoading}
      />

      <Input 
        placeholder='Password'
        type='password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>First time using Twitter?
        <span onClick={onToggle} className='text-white cursor-pointer hover:underline'> Create an account</span>
      </p>
    </div>
  )

  return (
    <Modal 
      title="Login"
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      actionLabel="Sign In"
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal