import { FC, useState } from 'react';
import { Button } from '@nextui-org/react';
import { Heart } from '@phosphor-icons/react';

interface IProps {
  filled?: boolean;
  className?: string;
  onClick: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

const CustomFavoriteButton: FC<IProps> = ({
  filled,
  className,
  onClick,
  onHoverStart,
  onHoverEnd,
}) => {
  const [isHoveredFavorite, setIsHoveredFavorite] = useState<boolean>(false);

  const handleMouseEnterFavorite = (): void => {
    setIsHoveredFavorite(true);

    if (onHoverStart) {
      onHoverStart();
    }
  };
  const handleMouseLeaveFavorite = (): void => {
    setIsHoveredFavorite(false);

    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  return (
    <Button
      isIconOnly
      className={`cursor-pointer flex items-center justify-center ${className}`.trim()}
      color='primary'
      radius='full'
      disableRipple
      onClick={onClick}
      onMouseEnter={handleMouseEnterFavorite}
      onMouseLeave={handleMouseLeaveFavorite}
    >
      <Heart size={24} weight={filled || isHoveredFavorite ? 'fill' : 'regular'} />
    </Button>
  );
};

export default CustomFavoriteButton;
