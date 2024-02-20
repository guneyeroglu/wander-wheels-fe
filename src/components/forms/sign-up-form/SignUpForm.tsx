import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  onClick?: () => void; //* Şu anlık optional.
}

const Form: FC<IProps> = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const title: string = t('common.signUp');

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('form.usernameRequiredMessage'))
      .min(3, t('form.usernameMinMessage')),
    email: yup
      .string()
      .required(t('form.emailRequiredMessage'))
      .email(t('form.emailFormatMessage')),
    password: yup
      .string()
      .required(t('form.passwordRequiredMessage'))
      .min(6, t('form.passwordMinMessage')),
    confirmPassword: yup
      .string()
      .required(t('form.confirmPasswordRequiredMessage'))
      .min(6, t('form.passwordMinMessage')),
  });

  const { register, handleSubmit, formState } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const { errors } = formState;

  const toggleEyeIcon = (): void => {
    setShowPassword((preValue: boolean) => !preValue);
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
            defaultValue={formState.defaultValues?.username}
            isRequired
            color={errors.username?.message ? 'danger' : 'default'}
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username?.message}
          />
          <Input
            {...register('email')}
            name='email'
            type='email'
            className='mb-2'
            label={t('form.email')}
            size='sm'
            variant='bordered'
            defaultValue={formState.defaultValues?.email}
            isRequired
            color={errors.email?.message ? 'danger' : 'default'}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
          />
          <Input
            {...register('password')}
            name='password'
            type={showPassword ? 'text' : 'password'}
            className='mb-2'
            label={t('form.password')}
            endContent={
              showPassword ? (
                <EyeSlash className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              ) : (
                <Eye className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              )
            }
            size='sm'
            variant='bordered'
            defaultValue={formState.defaultValues?.password}
            isRequired
            color={errors.password?.message ? 'danger' : 'default'}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
          />
          <Input
            {...register('confirmPassword')}
            name='confirmPassword'
            type={showPassword ? 'text' : 'password'}
            className='mb-2'
            label={t('form.confirmPassword')}
            endContent={
              showPassword ? (
                <EyeSlash className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              ) : (
                <Eye className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              )
            }
            size={'sm'}
            variant='bordered'
            defaultValue={formState.defaultValues?.confirmPassword}
            isRequired
            color={errors.confirmPassword?.message ? 'danger' : 'default'}
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword?.message}
          />
        </CardBody>
        <CardFooter>
          <Button variant='faded' size='md' radius='sm' fullWidth type='submit'>
            {title}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Form;
