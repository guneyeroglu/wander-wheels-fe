import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { X } from '@phosphor-icons/react';
import moment from 'moment';

import { utils } from '../../global/functions';

const Discount: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const today: Date = moment().toDate();
  const lastShown: Date = JSON.parse(
    localStorage.getItem('discountModalDate') ??
      JSON.stringify(moment(today).add(-3, 'day').toDate()),
  );
  const diffDay: number = utils.dayCount(today, lastShown);

  const handleModalOpen = (): void => setOpen(true);
  const handleModalClose = (): void => setOpen(false);

  useEffect(() => {
    if (diffDay >= 3) {
      handleModalOpen();
      localStorage.setItem('discountModalDate', JSON.stringify(moment().toDate()));
    }
  }, [diffDay, lastShown]);

  return (
    <>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-950/hover'>
          <Card className='max-w-96'>
            <CardHeader className='items-center justify-end'>
              <X
                size={24}
                onClick={handleModalClose}
                className='fill-neutral-200 hover:cursor-pointer hover:fill-neutral-500/hover'
              />
            </CardHeader>
            <CardBody>
              <span className='text-2xl font-medium text-neutral-200 text-center mb-4'>
                {t('common.discountTitle')} 🚗💨
              </span>
              <p className='text-lg font-normal text-neutral-200 text-center'>
                {t('common.discountDescription')}
              </p>
            </CardBody>
            <CardFooter className='items-center justify-center'>
              <Button variant='solid' color='primary' onClick={handleModalClose}>
                <span>{t('common.discountCloseText')}</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Discount;
