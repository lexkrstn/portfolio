import styled from '@emotion/styled';

export const CharSheet = styled.div`
  margin: 0 0 15px;
  font-size: 18px;
  font-weight: 300;
  background: rgba(0,0,0,.2);
  padding: 10px 15px;
  border-radius: 4px;
  box-shadow: 6px 6px 0px -2px rgba(0,0,0,.1);

  &:last-child { margin-bottom: 0; }
`;

export const Attribute = styled.dl`
  display: flex;
  margin: 0 0 4px;
  padding: 0 0 4px;
  border-bottom: 1px solid rgba(0,0,0,.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const AttributeName = styled.dt`
  flex: 0 1 auto;
  display: block;
  text-align: left;
`;

export const AttributeValue = styled.dd`
  flex: 1 1 auto;
  display: block;
  text-align: right;

  a {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color .15s ease;

    &:hover {
      border-bottom-color: currentColor;
    }
  }
`;
