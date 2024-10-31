import styled, { css } from "styled-components"


export const borderStyle = css`
    border: 2px solid rgba(37, 48, 49, 0.6);
    border-radius: 3px;
    box-sizing: border-box;
`;

export const borderColorStyle = css`
    border: 2px solid rgba(37, 126, 116, 0.5);
    border-radius: 3px;
    box-sizing: border-box;
`;


export const borderInteractiveStyle = css`
    border: 2px solid rgba(37, 48, 49, 0.3);
    border-radius: 5px;
    box-sizing: border-box;
    
    &:hover {
        border-color: rgba(37, 126, 116, 0.5);
    }

    &:active {
        border-color: rgba(37, 126, 116, 0.75);
    }
`;

export const Columns = styled.div`
    display: flex;
    flex-direction: row;
    gap: 3vw;

`
export const Column = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 3vw;
    width: 40vw;

    background-color: ${(props) => props.theme?.colors?.secondary || 'rgb(200, 200, 200)'};
    padding: 20px;
    border-radius: 20px;
`

export const Image = styled.img`
    object-fit: cover;
    width: 200px;
    height: 150px;
    border-radius: 10px;
`
export const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;

    align-items: center;
    gap: 10px;
    width: 80%;
    margin: 10px;
`
export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  font-size: 16px;
  line-height: 1.5;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2); 
  color: white;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
export const FileInput = styled.input.attrs({ type: 'file' })`
    width: 100%;
    padding: 10px;
    background-color: rgba(0,0,0, 0.5);
    border-radius: 4px;
    background-color: rgba(0,0,0,0.2);
    color: white;
    box-sizing: border-box;
    cursor: pointer;

  &::-webkit-file-upload-button {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 5px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: rgb(37, 48, 49);
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  max-width: 200px;
  
  border: 2px solid rgba(37, 126, 116, 0.5);
    border-radius: 5px;
    box-sizing: border-box;
    
    &:hover {
        border-color: rgba(37, 126, 116, 0.75);
    }

    &:active {
        border-color: rgba(37, 126, 116, 1);
    }
 
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: rgb(37, 48, 49);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 600px; 

  z-index: 1001;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

