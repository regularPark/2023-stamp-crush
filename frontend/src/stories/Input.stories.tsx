import { StoryFn, Meta } from '@storybook/react';
import { Input } from '../components/Input';

export default {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
} as Meta;

export const Template: StoryFn = (props) => (
  <Input id="1" label="Input" placeholder="내용을 입력해주세요." autoComplete="off" {...props} />
);
