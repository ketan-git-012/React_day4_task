export default function Slider(props){

    return (
        <div class="image-container">
            <img 
            src={ props.images[props.currentImage] }
            alt="Cleaning Image"
            width="100%"
            />
        </div>
    );
}