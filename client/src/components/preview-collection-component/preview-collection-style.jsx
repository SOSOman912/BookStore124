import styled from 'styled-components';

export const CollectionPreviewWrap = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const TitleWrap = styled.h1`
  text-align:center;
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

export const PreviewWrap = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
`;

export const ImageContainer = styled.div`
    width: 23%;
    padding-right: 15px;
`