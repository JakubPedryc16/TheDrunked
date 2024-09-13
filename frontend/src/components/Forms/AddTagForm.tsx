import { FormEvent, useState } from "react";
import api from "../../utils/api";
import { Button, Column, Form, Input, InputsContainer } from "../../styled-components/Common";


export const AddTagForm = () => {
    const [name, setName] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');

    async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!name) {
            setErrorMessage("Please fill all input fields\n");
            return;
        }
        try{
            const response = await api.post("user/tag/add",
                 {
                    id: 0,
                    name: name,
                 }
                )
            alert(response.data);
            setErrorMessage('');
        } catch(error) {
            console.error(error);
            setErrorMessage("Unable to add tag: " + error);
        }
    }

    return (
        <Form onSubmit={handleSubmitForm}>
                <Column>
                    {errorMessage}
                    <InputsContainer>
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
