import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IForm {
  username: string;
  password: string;
}

interface IProps {
  onClick?: () => void; //* Şu anlık optional.
}

const Form: FC<IProps> = () => {
  const { t } = useTranslation();
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

  const { register, handleSubmit, formState } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
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
