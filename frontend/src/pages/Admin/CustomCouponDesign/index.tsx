import {
  CouponContainer,
  CustomCouponDesignContainer,
  PreviewCouponContainer,
  ImageUploadContainer,
  SaveButtonWrapper,
} from './style';
import { RowSpacing, Spacing, SubTitle, Title } from '../../../style/layout/common';
import CustomCouponSection from './CustomCouponSection';
import CustomStampSection from './CustomStampSection';
import Button from '../../../components/Button';
import { useLocation } from 'react-router-dom';
import ChoiceTemplate, { StampCoordinate } from './ChoiceTemplate';
import useUploadImage from '../../../hooks/useUploadImage';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../api';

interface CouponSettingDto {
  frontImageUrl: string;
  backImageUrl: string;
  stampImageUrl: string;
  coordinates: StampCoordinate[];
  reward: string;
  expirePeriod: number;
}
const postCouponSetting = async (couponConfig: CouponSettingDto) => {
  return await api.post('/coupon-setting', couponConfig);
};

// TODO: 외부로 분리
export const parseStampCount = (value: string) => {
  return +value.replace('개', '');
};

const SectionSpacing = () => <Spacing $size={40} />;

const CustomCouponDesign = () => {
  const location = useLocation();
  const [frontImage, uploadFrontImage, setFrontImage] = useUploadImage();
  const [backImage, uploadBackImage, setBackImage] = useUploadImage();
  const [stampCoordinates, setStampCoordinates] = useState<StampCoordinate[]>([]);
  const [stampImage, uploadStampImage, setStampImage] = useUploadImage();
  const mutateCouponPolicy = useMutation({
    mutationFn: (couponConfig: CouponSettingDto) => postCouponSetting(couponConfig),
  });

  const changeCouponDesignAndPolicy = () => {
    if (stampCoordinates.length === 0 || !frontImage || !stampImage || !backImage) {
      alert('이미지를 모두 선택해주세요.');
      return;
    }
    const payload = {
      frontImageUrl: frontImage,
      backImageUrl: backImage,
      stampImageUrl: stampImage,
      coordinates: stampCoordinates,
      reward: location.state.reward,
      expirePeriod: parseStampCount(location.state.stampCount),
    };

    console.log(payload);

    mutateCouponPolicy.mutate(payload);
  };
  return (
    <>
      <Spacing $size={40} />
      <CustomCouponDesignContainer>
        <PreviewCouponContainer>
          <Title>쿠폰 제작 및 변경</Title>
          <SectionSpacing />
          <SubTitle>예상 쿠폰 이미지</SubTitle>
          <Spacing $size={20} />
          <ImageUploadContainer>
            <CouponContainer>
              <CustomCouponSection
                label="쿠폰 앞면"
                uploadImageInputId="coupon-front-image-input"
                imgFileUrl={frontImage}
                uploadImageFile={uploadFrontImage}
                isCustom={false}
              />
              <Spacing $size={32} />
              <CustomCouponSection
                label="쿠폰 뒷면"
                uploadImageInputId="coupon-back-image-input"
                imgFileUrl={backImage}
                uploadImageFile={uploadBackImage}
                isCustom={false}
              />
            </CouponContainer>
            <RowSpacing $size={72} />
            <CustomStampSection
              label="스탬프"
              uploadImageInputId="stamp-image-input"
              imgFileUrl={stampImage}
              uploadImageFile={uploadStampImage}
              isCustom={false}
            />
          </ImageUploadContainer>
          <Spacing $size={40} />
          <SaveButtonWrapper>
            <Button variant="primary" size="medium" onClick={changeCouponDesignAndPolicy}>
              저장하기
            </Button>
          </SaveButtonWrapper>
        </PreviewCouponContainer>
        <RowSpacing $size={100} />
        <ChoiceTemplate
          setStampCoordinates={setStampCoordinates}
          frontImage={frontImage}
          backImage={backImage}
          stampImage={stampImage}
          setFrontImage={setFrontImage}
          setBackImage={setBackImage}
          setStampImage={setStampImage}
        />
      </CustomCouponDesignContainer>
    </>
  );
};

export default CustomCouponDesign;
