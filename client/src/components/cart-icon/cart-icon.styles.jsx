import styled from 'styled-components';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

export const CartIconWrap = styled.div`
  color:white;
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: translate(0,60%);
`

export const ShoppingIconWrap = styled(ShoppingIcon)`
    width: 35px;
    height: 35px;

`

export const ItemCount = styled.span`
	position: absolute;
    color:black;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
`