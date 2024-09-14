import { FaEdit, FaHeart } from "react-icons/fa";
import styled from "styled-components";

export const LikesText = styled.div`
    font-size: 14px;
    color: white;
    margin-left: 5px;
    width: 10px;
`

export const EditIconInteractive = styled(FaEdit)`
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 1.5rem; 
    color: rgba(85, 231, 217, 0.65);

    &:hover {
        color: rgba(85, 231, 217, 0.75);

    }

    &:active {
        transform: scale(0.95);
        color: rgba(85, 231, 217, 0.85);
    }
`

export const HeartIconInteractive = styled(FaHeart)`

    color: #44e9d8;
    transition: color 0.3s, transform 0.2s;
    font-size: 1.5rem; 

    &:hover {
        color: #20ffe9;
        transform: scale(1.1);
    }

    &:active {
        color: #55e7d9;
        transform: scale(0.9);
    }
`;
export const HeartIcon = styled(FaHeart)`
    color: #44e9d8;
    font-size: 1.3rem; 
`;

export const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto; 
  padding-right: 20px;
`;