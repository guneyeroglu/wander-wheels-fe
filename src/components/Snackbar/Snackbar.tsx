import { FC, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { X } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { useSnackbarInfo } from '../../store';

type ButtonColor = 'success' | 'danger' | 'secondary' | 'warning';

const Snackbar: FC = () => {
  const { open, title, subtitle, state, setOpenSnackbar } = useSnackbarInfo();

  const handleColorForButton = (): ButtonColor => {
    let color;
    switch (state) {
      case 'success':
        color = 'success' as const;
        return color;
      case 'danger':
        color = 'danger' as const;
        return color;
      case 'info':
        color = 'secondary' as const;
        return color;
      case 'warning':
        color = 'warning' as const;
        return color;
      default:
        color = 'success' as const;
        return color;
    }
  };

  const handleCloseSnackbar = (): void => setOpenSnackbar(false);

  useEffect(() => {
    const closeSnackbar = setInterval(() => {
      handleCloseSnackbar();
    }, 5000);

    return () => {
      clearInterval(closeSnackbar);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <motion.div
      className={clsx(
        'fixed top-20 right-8 py-4 px-2 rounded-lg flex items-center justify-between gap-4 z-[9999] max-sm:left-8',
        {
          'bg-success-800': state === 'success',
          'bg-danger-800': state === 'danger',
          'bg-warning-800': state === 'warning',
          'bg-info-800': state === 'info',
          'pointer-events-none': !open,
        },
      )}
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: open ? 0 : -50,
        opacity: open ? 1 : 0,
      }}
      transition={{
        bounce: true,
        duration: 0.35,
        ease: 'linear',
      }}
    >
      <div className='min-w-64 ml-[13px]'>
        {title && <div>{title}</div>}
        {subtitle && <div>{subtitle}</div>}
      </div>
      <Button
        isIconOnly
        variant='light'
        color={handleColorForButton()}
        onClick={handleCloseSnackbar}
      >
        <X color={'#e5e5e5'} size={16} />
      </Button>
    </motion.div>
  );
};

export default Snackbar;
