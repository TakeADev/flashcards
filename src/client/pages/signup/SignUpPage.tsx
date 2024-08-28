import { useState } from 'react';

type SignUpFormFields = {
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
};

const defaultFormFields: SignUpFormFields = {
  email: '',
  displayName: '',
  password: '',
  confirmPassword: '',
};

export default function () {
  const [formFields, setFormFields] = useState<SignUpFormFields>(defaultFormFields);

  function changeHandler(e: React.FormEvent<HTMLInputElement>) {
    e.target &&
      setFormFields({
        ...formFields,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
      });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(JSON.stringify(formFields));
    fetch('/api/auth/signup', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(formFields),
    }).then((res) => console.log(res));
  }

  return (
    <div className='flex h-screen w-full'>
      <div className='m-auto w-1/2 bg-gray-300'>
        <form onSubmit={submitHandler}>
          <div>
            <label className=''>Email:</label>
            <input
              type='text'
              className='border border-red-500'
              value={formFields.email}
              name='email'
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className=''>Name:</label>
            <input
              type='text'
              className='border border-red-500'
              value={formFields.displayName}
              name='displayName'
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className=''>Password:</label>
            <input
              type='password'
              className='border border-red-500'
              value={formFields.password}
              name='password'
              onChange={changeHandler}
            />
          </div>
          <div>
            <label className=''>Confirm Password:</label>
            <input
              type='password'
              className='border border-red-500'
              value={formFields.confirmPassword}
              name='confirmPassword'
              onChange={changeHandler}
            />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
