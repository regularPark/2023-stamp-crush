import { StoryFn, Meta } from '@storybook/react';
import SelectBox from '../components/SelectBox';
import { EXPIRE_DATE_OPTIONS, STAMP_COUNT_CUSTOM_OPTIONS } from '../constants';
import { useState } from 'react';
import { styled } from 'styled-components';

export default {
  title: 'SelectBox',
  component: SelectBox,
} as Meta;

export const CountOfStamp: StoryFn = (props) => {
  const [checkedOption, setCheckedOption] = useState(STAMP_COUNT_CUSTOM_OPTIONS[0]);
  return (
    <Wrapper>
      <SelectBox
        options={STAMP_COUNT_CUSTOM_OPTIONS}
        checkedOption={checkedOption}
        setCheckedOption={setCheckedOption}
        {...props}
      />
    </Wrapper>
  );
};

export const ExpireDate: StoryFn = (props) => {
  const [checkedOption, setCheckedOption] = useState(EXPIRE_DATE_OPTIONS[0]);
  return (
    <Wrapper>
      <SelectBox
        options={EXPIRE_DATE_OPTIONS}
        checkedOption={checkedOption}
        setCheckedOption={setCheckedOption}
        {...props}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 200px;
`;
