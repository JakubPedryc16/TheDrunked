import {Button} from "../components/Button.tsx";
import MainContent from "../components/MainContent.tsx";


function Home() {

    return (
        <MainContent>
            <h1>HOME</h1>
            <Button onClick={null} label={"meow"}/>
            <Button onClick={null} label={"meow"}/>
            <Button onClick={null} label={"meow"}/>
        </MainContent>
    );
}

export default Home;


