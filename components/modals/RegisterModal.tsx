import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //TODO ADD LOG IN

      registerModal.onClose();
    } catch(err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal])

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
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        disabled={isLoading}
      />
    </div>
  )

  return (
    <Modal 
      title="Login"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      actionLabel="Sign Up"
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default RegisterModal