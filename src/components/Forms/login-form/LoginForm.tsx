import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { LANGUAGES } from '../../../global/enums';

interface IForm {
  username: string;
  password: string;
}

interface IProps {
  onClick?: () => void; //* Şu anlık optional.
}

const LoginForm: FC<IProps> = () => {
  const { t, i18n } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const title: string = t('common.login');

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('form.usernameRequiredMessage'))
      .min(3, t('form.usernameMinMessage')),
    password: yup
      .string()
      .required(t('form.passwordRequiredMessage'))
      .min(6, t('form.passwordMinMessage')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const toggleEyeIcon = (): void => {
    setShowPassword((preValue: boolean) => !preValue);
  };

  const handleLanguage = (lang: keyof typeof LANGUAGES) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const onSubmit = (data: IForm): void => {
    //* back-end bağlantısı ileride yapılacak.
    //* onClick();

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='w-full max-w-[400px] m-auto mt-5' shadow='sm'>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <Input
            {...register('username')}
            name='username'
            className='mb-2'
            label={t('form.username')}
            size='sm'
            variant='bordered'
            defaultValue={defaultValues?.username}
            color={errors.username?.message ? 'danger' : 'default'}
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username?.message}
          />
          <Input
            {...register('password')}
            name='password'
            type={showPassword ? 'text' : 'password'}
            className='mb-2'
            label={t('form.password')}
            endContent={
              showPassword ? (
                <EyeSlash className='cursor-pointer' onClick={toggleEyeIcon} />
              ) : (
                <Eye className='cursor-pointer' onClick={toggleEyeIcon} />
              )
            }
            size='sm'
            variant='bordered'
            defaultValue={defaultValues?.password}
            color={errors.password?.message ? 'danger' : 'default'}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant='bordered'
                radius='sm'
                size='md'
                disableAnimation
                className='justify-start border-neutral-700 aria-expanded:scale-[1] h-12 hover:border-neutral-500 aria-expanded:border-neutral-500'
              >
                {i18n.language === LANGUAGES.tr ? t('common.turkish') : t('common.english')}
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
        </CardBody>
        <CardFooter>
          <Button color='primary' size='md' radius='sm' fullWidth type='submit'>
            {title}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginForm;
