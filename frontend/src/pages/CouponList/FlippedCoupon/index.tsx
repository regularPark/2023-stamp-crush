import { useEffect, useState } from 'react';
import { BackImage, CouponContainer, CouponWrapper, FrontImage, StampImage } from './style';
import { StampCoordinate } from '../../../types';

interface FlippedCouponProps {
  frontImageUrl: string;
  backImageUrl: string;
  stampImageUrl: string;
  isShown: boolean;
  coordinates: StampCoordinate[];
}

const FlippedCoupon = ({
  frontImageUrl,
  backImageUrl,
  stampImageUrl,
  isShown,
  coordinates,
}: FlippedCouponProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isShown) {
      setTimeout(() => {
        setIsFlipped(true);
      }, 100);
    }

    if (!isShown) {
      setIsFlipped(false);
    }
  }, [isShown]);

  return (
    <CouponContainer $isShown={isShown}>
      <CouponWrapper $isFlipped={isFlipped}>
        <FrontImage src={frontImageUrl} />
        <BackImage src={backImageUrl} />
        {coordinates &&
          coordinates.map(({ order, xCoordinate, yCoordinate }, idx) => (
            <StampImage
              key={order + idx}
              src={stampImageUrl}
              $xCoordinate={xCoordinate}
              $yCoordinate={yCoordinate}
            />
          ))}
      </CouponWrapper>
    </CouponContainer>
  );
};

export default FlippedCoupon;
