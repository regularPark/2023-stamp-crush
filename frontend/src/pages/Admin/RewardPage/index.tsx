import { useMutation, useQuery } from '@tanstack/react-query';
import Button from '../../../components/Button';
import { RewardContainer, RewardContent, RewardItemContainer, RewardItemWrapper } from './style';
import Text from '../../../components/Text';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spacing } from '../../../style/layout/common';
import { getCustomer, getReward } from '../../../api/get';
import { patchReward } from '../../../api/patch';
import { ROUTER_PATH } from '../../../constants';
import { Reward } from '../../../types';
import {
  MutateReq,
  RewardReqBody,
  RewardIdParams,
  CustomerIdParams,
  CustomerPhoneNumberRes,
} from '../../../types/api';

const RewardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumber = location.state.phoneNumber;

  const { data: customerData, status: customerStatus } = useQuery<CustomerPhoneNumberRes>(
    ['getCustomer', phoneNumber],
    () => getCustomer({ params: { phoneNumber } }),
  );
  const { data: rewardData, status: rewardStatus } = useQuery(
    ['getReward', customerData],
    // TODO: cafeId 전역으로 받아오기
    () => {
      if (!customerData) throw new Error('고객 데이터 불러오기에 실패했습니다.');
      return getReward({ params: { customerId: customerData.customer[0].id, cafeId: 1 } });
    },
    {
      enabled: !!customerData,
    },
  );

  const { mutate: mutateReward } = useMutation({
    mutationFn: (request: MutateReq<RewardReqBody, RewardIdParams & CustomerIdParams>) => {
      if (!customerData) throw new Error('고객 데이터 불러오기에 실패했습니다.');
      return patchReward(request);
    },
    onSuccess() {
      navigate(ROUTER_PATH.customerList);
    },
    onError() {
      alert('에러가 발생했습니다. 네트워크 상태를 확인해주세요.');
    },
  });

  if (rewardStatus === 'error' || customerStatus === 'error') {
    return <div>불러오는 중 에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  if (rewardStatus === 'loading' || customerStatus === 'loading') {
    return <div>고객 정보 불러오는 중...</div>;
  }

  // FIXME: 명세에 맞게 body 값 전달하기!! used 값과 cafeId 넣기
  const activateRewardButton = (rewardId: number) => {
    mutateReward({
      params: {
        rewardId,
        customerId: customerData.customer[0].id,
      },
      body: {
        used: false,
        cafeId: 1,
      },
    });
  };

  return (
    <>
      <Spacing $size={40} />
      <Text variant="pageTitle">리워드 사용</Text>
      <Spacing $size={36} />
      <RewardContainer>
        <Text variant="pageTitle">{customerData.customer[0].nickname}고객님</Text>
        <Spacing $size={72} />
        <Text variant="subTitle">보유 리워드 내역</Text>
        <Spacing $size={42} />
        <RewardItemContainer>
          {rewardData.rewards.length ? (
            rewardData.rewards.map(({ id, name }: Reward) => (
              <RewardItemWrapper key={id}>
                <RewardContent>{name}</RewardContent>
                <Button onClick={() => activateRewardButton(id)}>사용</Button>
              </RewardItemWrapper>
            ))
          ) : (
            <p>보유한 리워드가 없습니다.</p>
          )}
        </RewardItemContainer>
      </RewardContainer>
    </>
  );
};

export default RewardPage;
