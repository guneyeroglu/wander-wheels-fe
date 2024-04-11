import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { services } from '../../../global/services';

interface IForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  onClick?: () => void; //* Şu anlık optional.
}

const SignUpForm: FC<IProps> = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { mutate } = services.SignUp();
  const title: string = t('common.signUp');

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('form.usernameRequiredMessage'))
      .min(3, t('form.usernameMinMessage'))
      .max(20, t('form.usernameMaxMessage')),
    email: yup
      .string()
      .required(t('form.emailRequiredMessage'))
      .email(t('form.emailFormatMessage')),
    password: yup
      .string()
      .required(t('form.passwordRequiredMessage'))
      .min(6, t('form.passwordMinMessage'))
      .max(18, t('form.passwordMaxMessage')),
    confirmPassword: yup
      .string()
      .required(t('form.confirmPasswordRequiredMessage'))
      .min(6, t('form.passwordMinMessage'))
      .max(18, t('form.passwordMaxMessage'))
      .oneOf([yup.ref('password')], t('form.confirmPasswordNoMatch')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, defaultValues },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const toggleEyeIconForPassword = (): void => {
    setShowPassword((preValue: boolean) => !preValue);
  };

  const toggleEyeIconForConfirmPassword = (): void => {
    setShowConfirmPassword((preValue: boolean) => !preValue);
  };

  const onSubmit = (data: IForm): void => {
    //* back-end bağlantısı ileride yapılacak.
    //* onClick();

    mutate(
      {
        username: data.username,
        mail: data.email,
        password: data.password,
      },
      {
        onSuccess: () => reset(),
      },
    );

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
            autoComplete='off'
          />
          <Input
            {...register('email')}
            name='email'
            type='email'
            className='mb-2'
            label={t('form.email')}
            size='sm'
            variant='bordered'
            defaultValue={defaultValues?.email}
            color={errors.email?.message ? 'danger' : 'default'}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            autoComplete='off'
          />
          <Input
            {...register('password')}
            name='password'
            type={showPassword ? 'text' : 'password'}
            className='mb-2'
            label={t('form.password')}
            endContent={
              showPassword ? (
                <EyeSlash className='cursor-pointer' onClick={toggleEyeIconForPassword} />
              ) : (
                <Eye className='cursor-pointer' onClick={toggleEyeIconForPassword} />
              )
            }
            size='sm'
            variant='bordered'
            defaultValue={defaultValues?.password}
            color={errors.password?.message ? 'danger' : 'default'}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
            autoComplete='off'
          />
          <Input
            {...register('confirmPassword')}
            name='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            className='mb-2'
            label={t('form.confirmPassword')}
            endContent={
              showConfirmPassword ? (
                <EyeSlash className='cursor-pointer' onClick={toggleEyeIconForConfirmPassword} />
              ) : (
                <Eye className='cursor-pointer' onClick={toggleEyeIconForConfirmPassword} />
              )
            }
            size={'sm'}
            variant='bordered'
            defaultValue={defaultValues?.confirmPassword}
            color={errors.confirmPassword?.message ? 'danger' : 'default'}
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword?.message}
            autoComplete='off'
          />
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

export default SignUpForm;
