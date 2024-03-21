import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';

interface IForm {
  location: string;
  startDate: string;
  endDate: string;
}

const RentForm: FC = () => {
  const { t } = useTranslation();

  const today: Date = moment().toDate();
  const tomorrow: Date = moment(today).add(1, 'day').toDate();
  const nextYear: Date = moment(today).add(1, 'year').toDate();
  const nextYearForTomorrow: Date = moment(tomorrow).add(1, 'year').toDate();

  const schema = yup.object().shape({
    location: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      location: '',
      startDate: '',
      endDate: '',
    },
    mode: 'all',
  });

  const [startDate, endDate] = watch(['startDate', 'endDate']);

  const onSubmit = (data: IForm): void => {
    //* back-end bağlantısı ileride yapılacak.
    //* onClick();

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='px-4 py-8 bg-neutral-900 overflow-visible' shadow='sm'>
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
          <Controller
            control={control}
            name='startDate'
            render={({ field }) => (
              <CustomDatePicker
                name={field.name}
                placeholderText={t('form.inputDatePlaceholder')}
                minDate={today}
                maxDate={endDate ? moment(endDate).add(-1, 'day').toDate() : nextYear}
                value={field.value ? moment(field.value).format('DD.MM.YYYY') : ''}
                selected={field.value ? moment(field.value).toDate() : null}
                onChange={(date: Date) => field.onChange(date ? moment(date).toDate() : null)}
                onBlur={field.onBlur}
                autoComplete='off'
                customInput={
                  <Input
                    labelPlacement='inside'
                    label={t('form.start')}
                    color={errors.startDate?.message ? 'danger' : 'default'}
                    variant='bordered'
                    errorMessage={errors.startDate?.message}
                    isInvalid={!!errors.startDate?.message}
                    className={!errors.startDate?.message ? 'mb-6' : ''}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                  />
                }
              />
            )}
          />
          <Controller
            control={control}
            name='endDate'
            render={({ field }) => (
              <CustomDatePicker
                name={field.name}
                placeholderText={t('form.inputDatePlaceholder')}
                minDate={startDate ? moment(startDate).add(1, 'day').toDate() : tomorrow}
                maxDate={nextYearForTomorrow}
                value={field.value ? moment(field.value).format('DD.MM.YYYY') : ''}
                selected={field.value ? moment(field.value).toDate() : null}
                onChange={(date: Date) => field.onChange(date ? moment(date).toDate() : null)}
                onBlur={field.onBlur}
                autoComplete='off'
                customInput={
                  <Input
                    labelPlacement='inside'
                    label={t('form.end')}
                    color={errors.endDate?.message ? 'danger' : 'default'}
                    variant='bordered'
                    errorMessage={errors.endDate?.message}
                    isInvalid={!!errors.endDate?.message}
                    className={!errors.endDate?.message ? 'mb-6' : ''}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    autoComplete='off'
                  />
                }
              />
            )}
          />
        </div>
        <div className='w-full flex items-center justify-end mt-4'>
          <div className='w-40'>
            <Button color='primary' fullWidth type='submit'>
              {t('common.search')}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default RentForm;
