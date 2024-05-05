import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    //TODO: Properly style
    <div className='text-center'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.status || error.message}</i>
      </p>
    </div>
  );
}
