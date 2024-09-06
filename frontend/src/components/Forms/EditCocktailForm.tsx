import { FormEvent, useEffect, useState } from "react";
import getImageData from "../../utils/fileUtils";
import api from "../../utils/api";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

export interface SimpleCocktail {
    id: number,
    name: string,
    image: string,
    description: string,
}

export interface Props {

    setEditMode: () => void
    handleCocktailEdit: (cocktailId: SimpleCocktail) => void

}
export const EditCocktailForm:React.FC<Props & SimpleCocktail> = ({id, name, image, description, setEditMode, handleCocktailEdit}) => {

    const [newName, setNewName] = useState<string>(name);
    const [newImage, setNewImage] = useState<string>(image);
    const [newDescription, setNewDescription] = useState<string>(description);

    const [file, setFile] = useState<File>()
    const [imageBlob, setImageBlob] = useState<string>()

    const [errorMessage, setErrorMessage] = useState<string>('')


    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(file){
            setFile(file)
            setNewImage(file.name)
            setImageBlob(URL.createObjectURL(file));
        }
    }

    async function handleFormSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        let fileRes = null;

        if (file) {
            if (file.size > 5 * 1024 * 1024){
                setErrorMessage("File size exceeded, maximum size is 5MB");
                return;
            }

            if (!newImage.endsWith(".jpg") && !newImage.endsWith(".png") && !newImage.endsWith(".jpeg")) {
                setErrorMessage("File must be of type .jpg, .jpeg or .png");
                return;
            }

            try {
                const formData: FormData = new FormData();
                formData.append("file", file)

                fileRes = await api.post("user/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
            } catch(error) {
                console.error(error)
            }
        }
        
        try {
            const editedCocktail = {
                id: id,
                name: newName,
                image: fileRes ? fileRes.data : image,
                description: newDescription
            }
            const res = await api.put("user/cocktail/edit", editedCocktail)
            //alert(res.data)

            handleCocktailEdit(editedCocktail);
            setEditMode();

        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getImageData(image, "cocktail", setImageBlob)
    }, [])
    return (
        <ModalOverlay>
            <ModalContent>
                <ExitIcon onClick={setEditMode}/>
                
                {errorMessage}
                <Form onSubmit={handleFormSubmit}>
                    <Input
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                    />
                    <Input
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Image src={imageBlob} alt="Cocktail Image"/>
                    <Input
                        value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}
                    />
                    <button type="submit">Confirm</button>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}

const Image = styled.img`
    object-fit: cover;
    width: 128px;
    border-radius: 10px;
`

const ExitIcon = styled(AiFillCloseCircle)`
  position: absolute;
  top: 10px;
  right: 10px;  
`;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 600px; 
  z-index: 1001;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;