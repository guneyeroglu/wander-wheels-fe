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

const Header: FC = () => {
  const { t, i18n } = useTranslation();

  const handleLanguage = (lang: keyof typeof LANGUAGES) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <header className='py-2 px-4 w-full max-w-screen-2xl m-auto flex justify-between items-center border-b-1 border-solid border-neutral-200 sticky top-0'>
      <Link href='/' color='foreground'>
        Wander Wheels - WW
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
        <Link href='/login' color='foreground'>
          {t('common.login')}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
