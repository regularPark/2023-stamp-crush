import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getOAuthToken } from '../../api/get';
import { ROUTER_PATH } from '../../constants';
import { useQuery } from '@tanstack/react-query';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    throw new Error('code가 없습니다.');
  }

  const getToken = async () => {
    const response = await getOAuthToken({
      params: { resourceServer: 'kakao', code },
    });

    localStorage.setItem('login-token', response.accessToken);
  };

  useEffect(() => {
    getToken();
  }, []);

  if (status === 'loading' || status === 'error') return <></>;
  return <></>;
};

export default Auth;
