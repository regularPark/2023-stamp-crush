import { Input } from '../../../../../components/Input';
import { parsePhoneNumber } from '../../../../../utils';
import { StepTitle, Wrapper } from '../../style';

interface CafePhoneNumberProps {
  phoneNumber: string;
  inputPhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CafePhoneNumber = ({ phoneNumber, inputPhoneNumber }: CafePhoneNumberProps) => {
  return (
    <Wrapper>
      <StepTitle>step2. 내 카페의 매장 전화번호를 알려주세요.</StepTitle>
      <Input
        id="phone-number-input"
        placeholder="전화번호를 입력해주세요"
        maxLength={phoneNumber.startsWith('02') ? 12 : 13}
        pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
        onChange={inputPhoneNumber}
        value={parsePhoneNumber(phoneNumber)}
      />
    </Wrapper>
  );
};

export default CafePhoneNumber;
