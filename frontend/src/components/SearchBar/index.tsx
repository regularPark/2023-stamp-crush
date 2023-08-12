import { BaseInput, Container, SearchButton } from './style';
import { BsSearch } from 'react-icons/bs';
import { ChangeEvent, FormEvent, InputHTMLAttributes } from 'react';
import { theme } from '../../style/theme';

export interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  searchWord: string;
  setSearchWord: (searchWord: string) => void;
  onClick: () => void;
}

const SearchBar = ({ searchWord, setSearchWord, onClick, ...props }: SearchBarProps) => {
  const search = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container onSubmit={handleForm}>
      <BaseInput value={searchWord} onChange={search} {...props} />
      <SearchButton type="submit" onClick={onClick}>
        <BsSearch color={theme.colors.point} size={20} />
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
