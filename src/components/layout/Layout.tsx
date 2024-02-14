import { FC, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  shownHeader?: boolean;
  shownFooter?: boolean;
}

const Layout: FC<IProps> = ({ shownHeader = true, shownFooter = false, children }) => {
  return (
    <main className='w-full max-w-screen-2xl m-auto px-[2rem]'>
      {shownHeader && <></>}
      {children}
      {shownFooter && <></>}
    </main>
  );
};

export default Layout;
