import { FC, MutableRefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IForm {
  location: string;
  startDate: Date;
  endDate: Date;
}

const RentForm: FC = () => {
  const { t } = useTranslation();
  const startInputRef = useRef<HTMLInputElement | null>(null);
  const endInputRef = useRef<HTMLInputElement | null>(null);

  const today: string = new Date().toISOString().split('T')[0];
  const _nextYear: Date = new Date();
  _nextYear.setFullYear(_nextYear.getFullYear() + 1);
  const nextYear: string = _nextYear.toISOString().split('T')[0];

  const handleClickInput = (inputRef: MutableRefObject<HTMLInputElement | null>): void => {
    if (inputRef.current) {
      inputRef.current?.focus();
      inputRef.current.showPicker();
    }
  };

  const schema = yup.object().shape({
    location: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      location: '',
      startDate: new Date(),
      endDate: new Date(),
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: IForm): void => {
    //* back-end bağlantısı ileride yapılacak.
    //* onClick();

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='px-4 py-8 bg-neutral-900'>
        <div className='flex items-center justify-center gap-4'>
          <Select
            {...register('location')}
            labelPlacement='inside'
            label={t('form.location')}
            color={errors.location?.message ? 'danger' : 'default'}
            variant='bordered'
            errorMessage={errors.location?.message}
            isInvalid={!!errors.location?.message}
            className={!errors.location?.message ? 'mb-6' : ''}
            classNames={{
              errorMessage: 'text-left',
            }}
          >
            <SelectItem key={'İstanbul'} value={'İstanbul'}>
              {'İstanbul'}
            </SelectItem>
          </Select>
          <Input
            {...register('startDate')}
            ref={startInputRef}
            type='text'
            min={today}
            max={nextYear}
            label={t('form.start')}
            placeholder={t('form.inputDatePlaceholder')}
            labelPlacement='inside'
            variant='bordered'
            onKeyDown={e => e.preventDefault()}
            onFocus={() => handleClickInput(startInputRef)}
            onClick={() => handleClickInput(startInputRef)}
            color={errors.startDate?.message ? 'danger' : 'default'}
            errorMessage={errors.startDate?.message}
            isInvalid={!!errors.startDate?.message}
            className={!errors.startDate?.message ? 'mb-6' : ''}
            classNames={{
              errorMessage: 'text-left',
            }}
          />
          <Input
            {...register('endDate')}
            ref={endInputRef}
            type='date'
            min={today}
            max={nextYear}
            label={t('form.end')}
            placeholder={t('form.inputDatePlaceholder')}
            labelPlacement='inside'
            variant='bordered'
            onKeyDown={e => e.preventDefault()}
            onFocus={() => handleClickInput(endInputRef)}
            color={errors.endDate?.message ? 'danger' : 'default'}
            errorMessage={errors.endDate?.message}
            isInvalid={!!errors.endDate?.message}
            className={!errors.endDate?.message ? 'mb-6' : ''}
            classNames={{
              errorMessage: 'text-left',
            }}
          />
        </div>
        <div className='w-full flex items-center justify-end mt-4'>
          <div className='w-40'>
            <Button className='bg-neutral-200 text-neutral-900' fullWidth type='submit'>
              {t('common.search')}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default RentForm;
