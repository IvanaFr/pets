import { CatVideo } from "./CatVideo";
import DogVideo from "./DogVideo";

function Header() {
    return (
        <div className="header">
            <DogVideo />
            <CatVideo />
        </div>
    );
}

export default Header;
