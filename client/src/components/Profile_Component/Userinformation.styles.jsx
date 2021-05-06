import styled from 'styled-components'

export const UserInformationContainer = styled.div`
	width:1000px;
	height: 900px;
	border:1px solid #8F8F8F;
	padding:10%;
	overflow: scroll;
`

export const ContentContainer = styled.div`
	display:flex;
	flex-direction: column;
	justify-content:center;
	line-height:3rem;
	margin-top:30px;
`

export const Title = styled.div`
	font-size:16px;
	color: #8F8F8F;
`

export const Data = styled.div`
	font-size:14px;
	color:black;
`

export const CheckoutHeaderWrap = styled.div`
  padding:5px 20px;
  height: 40px;
  display: flex;
  justify-content: space-between;
`

export const HeaderBlockWrap= styled.div`
  text-transform: capitalize;
  width: 22.5%;
  &:last-child {
    width: 10%;
  }
`

export const BuyingHistoryItemContainer = styled.div`
	margin-top:10px;
	width:100%;
	border: 1px solid #8F8F8F;
`
