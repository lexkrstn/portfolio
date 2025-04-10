import styled from '@emotion/styled';

export const Certificates = styled.div`
  display: block;
`;

export const CertificateCard = styled.div`
  display: block;
  margin: 0;
  line-height: 1;
  font-size: 0;
  text-align: center;
`;

export const CertificateImage = styled.img`
  border: 0;
  margin: 0;
  padding: 0;
  display: inline-block;
  max-height: 150px;
  filter: saturate(0);
  transition: ease 200ms filter;

  &:hover {
    filter: saturate(1);
  }
`;
