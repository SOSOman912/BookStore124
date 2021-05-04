import styled from 'styled-components';

export const SignInWrap = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export const SignInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const WarningMessageWrap = styled.div`
  position:relative;
  margin-top:10px;
  width: 380px;
  height:70px;
`

export const WarningMessageBG = styled.div`
  position:absolute;
  width: 100%;
  background-color:red;
  opacity:0.2;
  height: 100%;
`

export const WarningMessageMG = styled.h1`
  position:absolute;
  font-size:20px;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);

`