import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const MobileDrawer = styled.div`
  min-height: 100%;
`;

const drawerMixin = () => css`
  position: fixed;
  top: 0;
  width: 250px;
  height: 100%;
  background: #e0e0e0;
  overflow: auto;
`;

export const LeftDrawer = styled.div`
  ${drawerMixin()}
  right: 100%;
  transition: margin-right 250ms ease;

  ${MobileDrawer}.open.left & {
    margin-right: -250px;
  }
`;

export const RightDrawer = styled.div`
  ${drawerMixin()}
  left: 100%;
  transition: margin-left 250ms ease;

  ${MobileDrawer}.open.right & {
    margin-left: -250px;
  }
`;

export const ContentWrap = styled.div`
  position: fixed;
  transform: translateX(0);
  height: 100%;
  width: 100%;
  transition: margin-left 250ms ease;

  ${MobileDrawer}.open.left & {
    margin-left: 250px;
  }

  ${MobileDrawer}.open.right & {
    margin-left: -250px;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  transition:
    left 250ms ease,
    right 250ms ease,
    background-color 250ms ease,
    z-index 0ms 250ms ease;
  cursor: pointer;
  z-index: -1;

  ${MobileDrawer}.open & {
    background: rgba(0, 0, 0, .4);
    z-index: 1000000;
    transition:
      left 250ms ease,
      right 250ms ease,
      background-color 250ms ease,
      z-index 0ms 0ms ease;
  }

  ${MobileDrawer}.open.left & {
    left: 250px;
  }

  ${MobileDrawer}.open.right & {
    right: 250px;
  }
`;
