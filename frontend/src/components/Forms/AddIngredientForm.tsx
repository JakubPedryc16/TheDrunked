import { FormEvent, useEffect, useState } from "react";
import api from "../../utils/api";
import { Button, Column, FileInput, Form, Image, Input, InputsContainer, TextArea } from "../../styled-components/Common";
import { useNavigate } from "react-router-dom";


export const AddIngredientForm = () => {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageBlob, setImageBlob] = useState<string>()

    const [errorMessage, setErrorMessage] = useState<string>('');

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if(file){
            setImageFile(file)
            setImage(file.name)
            setImageBlob(URL.createObjectURL(file));
        }
    }

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!imageFile) {
            setErrorMessage("Please add image file to the cocktail");
            return;
        }
        if (!name || !image) {
            setErrorMessage("Please fill all input fields\n");
            return;
        }
        if (imageFile.size > 5 * 1024 * 1024){
            setErrorMessage("File size exceeded, maximum size is 5MB");
            return;
        }

        if (!image.endsWith(".jpg") && !image.endsWith(".png") && !image.endsWith(".jpeg")) {
            setErrorMessage("File must be of type .jpg, .jpeg or .png");
            return;
        }
        try{
            const formData: FormData = new FormData();

            formData.append("file", imageFile)
            formData.append("type", "ingredient")

                const responseImage = await api.post("user/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            const response = await api.post("user/ingredient/add",
                 {
                    id: 0,
                    name: name,
                    image: responseImage.data,
                 }
                )
            alert(response.data);
            setErrorMessage('');
        } catch(error) {
            console.error(error);
            setErrorMessage("Unable to add Ingredient: " + error);
        }
    }

    return (
        <Form onSubmit={handleSubmitForm}>
                <Column>
                    {errorMessage}
                    <InputsContainer>
                       
                        <label htmlFor="file">Upload</label>
                        <FileInput 
                            type="file"
                            onChange={handleFileChange}
                            id="file"
                        />

                        <Image src={imageBlob} alt="Cocktail Image"/>

                        <Input 
                            value={name} 
                            onChange={(event) => setName(event.target.value)}
                            placeholder="name"
                        />
                    </InputsContainer>
   
                    <Button type="submit">Submit</Button>
                </Column>
        </Form>
    );


}
