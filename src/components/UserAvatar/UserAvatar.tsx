import { FC } from 'react';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { User } from '@phosphor-icons/react';

import { useUserInfo } from '../../store';

const UserAvatar: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username, setUserInfo } = useUserInfo();

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    setUserInfo({
      id: '',
      mail: '',
      username: '',
      role: {
        id: 0,
        name: '',
      },
    });

    navigate('/');
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          as={'button'}
          color='default'
          className='w-10 h-10 rounded-[12px]'
          icon={<User size={24} />}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='avatar menu' disabledKeys={['profile']} closeOnSelect={false}>
        <DropdownItem key={'profile'} color='default'>
          {username}
        </DropdownItem>
        <DropdownItem key={'logout'} color='danger' onClick={handleLogout}>
          {t('common.logout')}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
