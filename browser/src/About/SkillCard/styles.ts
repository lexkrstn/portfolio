import styled from '@emotion/styled';

export const SkillCard = styled.div`

`;

export const Icon = styled.img`
  border: 0;
  width: 28px;
  max-height: 28px;
  border-radius: 4px;
  margin-right: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  line-height: 28px;
`;

export const Name = styled.div`
  flex: 1 0 auto;
`;

export const Experience = styled.div`
  font-weight: 300;
`;

export const Level = styled.div`
  position: relative;
  margin-top: 5px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 1px;
    width: 100%;
    background: rgb(255, 206, 0);
    z-index: -1;
  }
`;

export const LevelProgress = styled.div`
  height: 2px;
  background: rgb(191, 255, 178);
`;

export const Note = styled.div`
  margin-top: 10px;
  font-size: 0.875em;
  font-weight: 300;
  background: rgb(255 255 255 / 8%);
  padding: 3px 5px;
  border-left: 3px solid rgb(255 255 255 / 30%);

  a {
    color: inherit;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;
