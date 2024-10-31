import { FormEvent, useEffect, useState } from "react";
import getImageData from "../../utils/fileUtils";
import api from "../../utils/api";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button, Form, Image, Input, InputsContainer, ModalContent, ModalOverlay, TextArea } from "../../styled-components/Common";

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
            await api.put("user/cocktail/edit", editedCocktail)


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

                    <InputsContainer>
                        <Input
                            value={newName}
                            onChange={(event) => setNewName(event.target.value)}
                        />
                        <label htmlFor="file">Upload</label>
                        <Input
                            type="file"
                            onChange={handleFileChange}
                            id="file"
                        />
                        <Image src={imageBlob} alt="Cocktail Image"/>
                        <TextArea
                            value={newDescription}
                            onChange={(event) => setNewDescription(event.target.value)}
                        />
                        <Button type="submit">Confirm</Button>
                    </InputsContainer>

                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}



const ExitIcon = styled(AiFillCloseCircle)`
  position: absolute;
  top: 10px;
  right: 10px;  
`;




