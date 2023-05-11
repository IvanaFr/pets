import psić from "../assets/psić.mp4";

function DogVideo() {
    return (
        <div>
            <video src={psić} controls autoPlay width="95%" />
        </div>
    );
}

export default DogVideo;
