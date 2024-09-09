import api from "./api";

async function getImageData(image: string, type: string, setImage: (blob: string) => void) {
    try {
        const res = await api.get<Blob>(`user/file`,{
            params: {
                filename: image,
                type: type
            },
            responseType: "blob",
        });
        if(res.data){
            const blob = URL.createObjectURL(res.data);
            setImage(blob)
            
        } else {
            console.log("Unable to load cocktail image");
        }
   } catch(error) {
    console.error("Error fetching cocktail image", error);
   }

   
}

export default getImageData