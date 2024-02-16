import { FC } from 'react';
import { Link } from '@nextui-org/react';

const Header: FC = () => {
  return (
    <header className='py-2 px-4 w-full max-w-screen-2xl m-auto flex justify-between items-center border-b-1 border-solid border-neutral-200 sticky top-0'>
      <Link href='/' color='foreground'>
        Wander Wheels - WW
      </Link>
      <nav className='flex justify-between items-center gap-2'>
        <Link href='/login' color='foreground'>
          Giriş Yap
        </Link>
        <Link href='/sign-up' color='foreground'>
          Üye ol
        </Link>
      </nav>
    </header>
  );
};

export default Header;
