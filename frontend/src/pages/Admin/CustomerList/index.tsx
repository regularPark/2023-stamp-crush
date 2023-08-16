import { CustomerContainer, Container, EmptyCustomers } from './style';
import Text from '../../../components/Text';
import { Suspense, useEffect, useState } from 'react';
import SearchBar from '../../../components/SearchBar';
import SelectBox from '../../../components/SelectBox';
import { getCustomers } from '../../../api/get';
import { CUSTOMERS_ORDER_OPTIONS } from '../../../constants';
import { Customer } from '../../../types';
import Customers from './Customers';
import CustomerLoading from '../../../components/LoadingSpinner/CustomerLoading';
import useSuspendedQuery from '../../../hooks/api/useSuspendedQuery';

const CustomerList = () => {
  const [searchWord, setSearchWord] = useState('');
  const [orderOption, setOrderOption] = useState({ key: 'stampCount', value: '스탬프순' });
  const orderCustomer = (customers: Customer[]) => {
    customers.sort((a: Customer, b: Customer) => {
      if (a[orderOption.key as keyof Customer] === b[orderOption.key as keyof Customer]) {
        return a['nickname'] > b['nickname'] ? 1 : -1;
      }
      return a[orderOption.key as keyof Customer] < b[orderOption.key as keyof Customer] ? 1 : -1;
    });
  };

  const { data, status } = useSuspendedQuery({
    queryKey: ['customers'],
    queryFn: () =>
      getCustomers({
        params: {
          cafeId: 1,
        },
      }),
    onSuccess: (data) => {
      orderCustomer(data.customers);
    },
  });

  useEffect(() => {
    if (status === 'success' && data.customers.length !== 0) {
      orderCustomer(data.customers);
    }
  }, [orderOption]);

  const searchCustomer = () => {
    if (searchWord === '') return;

    // TODO: 추후에 백엔드와 검색 기능 토의 후 수정 예정
  };

  return (
    <CustomerContainer>
      <Text variant="pageTitle">내 고객 목록</Text>
      <Container>
        <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} onClick={searchCustomer} />
        <SelectBox
          options={CUSTOMERS_ORDER_OPTIONS}
          checkedOption={orderOption}
          setCheckedOption={setOrderOption}
        />
      </Container>

      <Customers customersData={data} />
    </CustomerContainer>
  );
};

export default CustomerList;
