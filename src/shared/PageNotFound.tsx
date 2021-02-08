import React from 'react';
import { Container } from '../styles/styles';

export const PAGE_NOT_FOUND_MESSAGE = '404 - This is not the page you are looking for';

const PageNotFound: React.FC = () => {
  return <Container>{PAGE_NOT_FOUND_MESSAGE}</Container>;
};

export default PageNotFound;
