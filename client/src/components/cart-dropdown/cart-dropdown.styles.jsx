import styled from 'styled-components';

export const CartDropDownMenu = styled.div`
  position: absolute;
  width: 300px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 99px;
  right:0%;
  z-index: 5;
`

export const EmptyMessage = styled.span`
    font-size: 18px;
    margin: 50px auto;
`

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-wrap:wrap;
  overflow: scroll;
`