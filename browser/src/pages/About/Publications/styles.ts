import styled from '@emotion/styled';

export const Publications = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Publication = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PublicationDate = styled.span`
  font-size: 0.9em;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
`;

export const PublicationTitle = styled.h4`
  margin: 0;
  font-size: 1.1em;
  font-weight: 400;
`;

export const PublicationLink = styled.a`
  color: inherit;
  text-decoration: none;
  text-transform: none;
  font-weight: 500;
  display: inline;
  border-bottom: 1px solid currentColor;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: transparent;
  }
`;

export const PublicationJournal = styled.span`
  font-size: 0.95em;
  font-weight: 300;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
`;

export const PublicationDescription = styled.p`
  margin: 0;
  font-size: 0.95em;
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
`;

export const PublicationDOI = styled.a`
  font-size: 0.9em;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  text-transform: uppercase;
`;