import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '../../constants';
import { ArrowIconWrapper, NavContainer, NavWrapper, Nickname, NicknameContainer } from './style';
import { BiArrowBack } from 'react-icons/bi';
import { useCustomerProfile } from '../../hooks/useCustomerProfile';

const MYPAGE_NAV_OPTIONS = [
  {
    key: 'rewardList',
    value: '내 리워드',
  },
  {
    key: 'rewardHistory',
    value: '리워드 사용 내역',
  },
  {
    key: 'stampHistory',
    value: '스탬프 적립 내역',
  },
  {
    key: 'logout',
    value: '로그아웃',
  },
];

const MyPage = () => {
  const { customerProfile } = useCustomerProfile();
  const navigate = useNavigate();

  const navigatePage = (key: string) => () => {
    if (key === 'logout') {
      localStorage.removeItem('login-token');
      return;
    }

    navigate(ROUTER_PATH[key]);
  };

  return (
    <>
      <ArrowIconWrapper
        onClick={navigatePage('couponList')}
        aria-label="홈으로 돌아가기"
        role="button"
      >
        <BiArrowBack size={24} />
      </ArrowIconWrapper>
      <NicknameContainer>
        <Nickname>{customerProfile?.profile.nickname}</Nickname>님
      </NicknameContainer>
      <NavContainer>
        {MYPAGE_NAV_OPTIONS.map((option) => (
          <NavWrapper key={option.key} onClick={navigatePage(option.key)}>
            {option.value}
          </NavWrapper>
        ))}
      </NavContainer>
    </>
  );
};

export default MyPage;
