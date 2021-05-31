import styled from 'styled-components';

export const CheckoutPageWrap = styled.div`
  width: 55%;
  min-height: 87vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  button {
    margin-left: auto;
    margin-top: 50px;
  }
`

export const CheckoutHeaderWrap = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`

export const HeaderBlockWrap= styled.div`
  text-transform: capitalize;
  width: 23%;
  &:last-child {
    width: 8%;
  }
`

export const TotalWrap = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`

export const WarningWrap = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: red;
`