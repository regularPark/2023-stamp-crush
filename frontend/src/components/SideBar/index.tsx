import { useLocation } from 'react-router-dom';
import { Logo } from '../../assets';
import { Option } from '../../types';
import {
  CharacterImage,
  EmptyContent,
  LabelContent,
  LogoHeader,
  LogoImg,
  LogoImgWrapper,
  SideBarContainer,
  SideBarContent,
  SideBarLink,
} from './style';
import { useEffect, useState } from 'react';
import { ROUTER_PATH } from '../../constants';
import {
  PiUserListLight,
  PiBuildingsLight,
  PiStampLight,
  PiBookOpenTextLight,
  PiGiftLight,
} from 'react-icons/pi';
import Character from '../../assets/cafe_pic.png';

const SIDEBAR_ICONS = [
  <></>,
  <PiUserListLight size={26} key="customer-list" />,
  <PiBuildingsLight size={26} key="manage-cafe" />,
  <PiBookOpenTextLight size={26} key="modify-coupon-policy" />,
  <PiStampLight size={26} key="earn-stamp" />,
  <PiGiftLight size={26} key="use-reward" />,
];

interface SideBarProps {
  width: number;
  height: number;
  options: Option[];
}

const SideBar = ({ width, height, options }: SideBarProps) => {
  const current = useLocation().pathname;
  const [currentIndex, setCurrentIndex] = useState(
    options.findIndex((option) => option.value === current) + 1,
  );
  const [isDesignCoupon, setIsDesignCoupon] = useState(false);
  const [isEarnStamp, setIsEarnStamp] = useState(false);
  const [isUseReward, setIsUseReward] = useState(false);

  const modifyPolicyCouponRoute = ROUTER_PATH.modifyCouponPolicy;
  const designCouponRoutes = [ROUTER_PATH.templateCouponDesign, ROUTER_PATH.customCouponDesign];

  const enterStamp = ROUTER_PATH.enterStamp;
  const stampRoutes = [ROUTER_PATH.selectCoupon, ROUTER_PATH.earnStamp];

  const enterReward = ROUTER_PATH.enterReward;
  const rewardRoutes = [ROUTER_PATH.useReward];

  useEffect(() => {
    const foundIndex = options.findIndex(({ value }) => {
      if (checkIncludeRoute(value, modifyPolicyCouponRoute, designCouponRoutes)) {
        setIsDesignCoupon(true);
        return true;
      }

      if (checkIncludeRoute(value, enterStamp, stampRoutes)) {
        setIsEarnStamp(true);
        return true;
      }

      if (checkIncludeRoute(value, enterReward, rewardRoutes)) {
        setIsUseReward(true);
        return true;
      }

      return value === current;
    });

    setCurrentIndex(foundIndex + 1);
  }, [current, options]);

  const checkIncludeRoute = (value: string, route: string, routes: string[]) => {
    if (value !== route) return false;
    return routes.some((route) => current.includes(route));
  };

  return (
    <>
      <LogoHeader>
        <LogoImgWrapper>
          <LogoImg src={Logo} alt="스탬프크러쉬 로고" />
        </LogoImgWrapper>
      </LogoHeader>
      <SideBarContainer
        $width={width}
        $height={height}
        $prevIndex={currentIndex - 1}
        $nextIndex={currentIndex + 1}
      >
        {options.map(({ key, value }, index) => {
          if (index === 0 || index === options.length - 1)
            return <EmptyContent $width={width} $height={height} />;
          return (
            <SideBarContent
              key={key}
              $isSelected={
                value === current ||
                (checkIncludeRoute(value, modifyPolicyCouponRoute, designCouponRoutes) &&
                  isDesignCoupon) ||
                (checkIncludeRoute(value, enterStamp, stampRoutes) && isEarnStamp) ||
                (checkIncludeRoute(value, enterReward, rewardRoutes) && isUseReward)
              }
              $currentIndex={index + 1}
            >
              <SideBarLink to={value}>
                <LabelContent
                  $isSelected={
                    value === current ||
                    (checkIncludeRoute(value, modifyPolicyCouponRoute, designCouponRoutes) &&
                      isDesignCoupon) ||
                    (checkIncludeRoute(value, enterStamp, stampRoutes) && isEarnStamp) ||
                    (checkIncludeRoute(value, enterReward, rewardRoutes) && isUseReward)
                  }
                  $width={width}
                  $height={height / options.length}
                  onClick={() => {
                    if (index === 0 || index === options.length - 1) {
                      return;
                    }
                    setCurrentIndex(index + 1);
                  }}
                >
                  {SIDEBAR_ICONS[index]}
                  {key}
                </LabelContent>
              </SideBarLink>
            </SideBarContent>
          );
        })}
      </SideBarContainer>
      <CharacterImage src={Character} />
    </>
  );
};

export default SideBar;
