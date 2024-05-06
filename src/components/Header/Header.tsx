import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Globe } from '@phosphor-icons/react';

import { LANGUAGES } from '../../global/enums';
import { MainLogo } from '../../assets/images';
import { useUserInfo } from '../../store';
import UserAvatar from '../UserAvatar/UserAvatar';

const Header: FC = () => {
  const { t, i18n } = useTranslation();
  const { username } = useUserInfo();

  const handleLanguage = (lang: keyof typeof LANGUAGES) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <header className='border-b-1 border-solid border-neutral-200 sticky top-0 z-50 bg-neutral-900 h-16'>
      <div className='max-w-screen-2xl h-full m-auto py-2 px-4 w-full flex justify-between items-center max-md:px-2'>
        <Link to='/' className='flex items-center justify-start gap-2'>
          <MainLogo className='w-8' />
          <span className='text-2xl text-center font-semibold max-[425px]:hidden max-xl:text-base'>
            Wander Wheels
          </span>
          <span className='text-2xl text-center font-semibold min-[426px]:hidden'>WW</span>
        </Link>
        <nav className='flex justify-between items-center gap-2 max-md:gap-1'>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly>
                <Globe size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label='language menu'
              selectionMode='single'
              selectedKeys={[i18n.language]}
            >
              <DropdownItem key={LANGUAGES.tr_TR} onClick={() => handleLanguage(LANGUAGES.tr_TR)}>
                {t('common.turkish')}
              </DropdownItem>
              <DropdownItem key={LANGUAGES.en_EN} onClick={() => handleLanguage(LANGUAGES.en_EN)}>
                {t('common.english')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {username ? (
            <UserAvatar />
          ) : (
            <>
              <Link to='/login' className='py-2 px-4 max-md:px-2'>
                {t('common.login')}
              </Link>
              <Link
                to='/sign-up'
                className='border-solid border-1 border-foreground-100 py-2 px-4 rounded-md max-md:px-2'
              >
                {t('common.signUp')}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
