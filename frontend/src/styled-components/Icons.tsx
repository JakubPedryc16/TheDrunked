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
    color: rgba(85, 231, 217, 0.8);
    
    &:hover {
        color: rgba(85, 231, 217, 1);
    }

    &:active {
        transform: scale(0.9);
    }
`
interface HeartIconProps{
    $isLiked: boolean;
}
export const HeartIconInteractive = styled(FaHeart)<HeartIconProps>`
    color: ${(props) => props.$isLiked ? "rgba(85, 231, 217, 0.8)" : "rgba(255, 255, 255, 0.5)"};
    transition: color 0.3s, transform 0.2s;
    font-size: 1.5rem; 

    &:hover {
        color: rgba(85, 231, 217, 1);
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.9);
    }
`;


export const HeartIcon = styled(FaHeart)<HeartIconProps>`
  color: ${(props) => props.$isLiked ? "rgba(85, 231, 217, 0.8)" : "rgba(255, 255, 255, 0.5)"};
  font-size: 1.3rem; 
`;



export const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto; 
  padding-right: 20px;


`;