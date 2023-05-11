import maca from "../assets/maca.mp4";

export function CatVideo() {
    return (
        <div>
            <video src={maca} controls autoPlay width="95%" />
        </div>
    );
}
