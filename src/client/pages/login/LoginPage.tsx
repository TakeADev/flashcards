import { useState } from 'react';

type LoginFormFields = {
  username: string;
  password: string;
};

const defaultFormFields: LoginFormFields = {
  username: '',
  password: '',
};

export default function () {
  const [formFields, setFormFields] = useState<LoginFormFields>(defaultFormFields);

  function changeHandler(e: React.FormEvent<HTMLInputElement>) {
    e.target &&
      setFormFields({
        ...formFields,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
      });
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(formFields),
    }).then((res) => {
      return console.log(res.status);
    });
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
              value={formFields.username}
              name='username'
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
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
