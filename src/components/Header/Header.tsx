import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from '@nextui-org/react';
import { Globe } from '@phosphor-icons/react';

import { LANGUAGES } from '../../global/enums';
import { MainLogo } from '../../assets/images';

const Header: FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguage = (lang: keyof typeof LANGUAGES) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <header className='border-b-1 border-solid border-neutral-200 sticky top-0 z-50 bg-neutral-900 h-16'>
      <div className='max-w-screen-2xl h-full m-auto py-2 px-4 w-full flex justify-between items-center'>
        <Link href='/' color='foreground' className='flex items-center justify-start gap-2'>
          <MainLogo className='w-8' />
          <span className='text-2xl font-semibold'>Wander Wheels</span>
        </Link>
        <nav className='flex justify-between items-center gap-2'>
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
              <DropdownItem key={LANGUAGES.tr} onClick={() => handleLanguage(LANGUAGES.tr)}>
                {t('common.turkish')}
              </DropdownItem>
              <DropdownItem key={LANGUAGES.en} onClick={() => handleLanguage(LANGUAGES.en)}>
                {t('common.english')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Link href='/login' color='foreground' className='py-2 px-4'>
            {t('common.login')}
          </Link>
          <Link
            href='/sign-up'
            color='foreground'
            className='border-solid border-1 border-foreground-100 py-2 px-4 rounded-md'
          >
            {t('common.signUp')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
