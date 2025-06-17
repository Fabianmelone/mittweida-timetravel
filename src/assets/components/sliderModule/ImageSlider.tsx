import {useState, useRef } from "react";
import styles from "./ImageSlider.module.css";


interface ImageProps {
    imageOne: string;
    imageTwo: string;
}
export default function ImageSlider({imageOne, imageTwo}: ImageProps) {

    const [imageRevealFraq, setImageRevealFraq] = useState(0.5);
    const imageContainer = useRef<HTMLDivElement>(null);

    const slide = (xPosition: number): void => {
        const container = imageContainer.current;
        if (!container) return;

        const containerBoundingRect = container.getBoundingClientRect();
        const newFraq = (xPosition - containerBoundingRect.left) / containerBoundingRect.width;

        // you don't want the value to go outside of 0 or 1, which is why we use Math min and Math max
        setImageRevealFraq(Math.min(Math.max(newFraq, 0), 1));
    };

    const handleMouseDown = (): void => {
        window.onmousemove = handleMouseMove;
        window.onmouseup = handleMouseUp;
    }


    //for mobile
    const handleTouchStart = () => {
        window.ontouchmove = handleTouchMove;
        window.ontouchend = handleTouchEnd;
    }


    const handleMouseMove = (event: MouseEvent): void => {
        slide(event.clientX);
    }

    const handleTouchMove = (event: TouchEvent): void =>{
        slide(event.touches[0].clientX);
    }

    const handleMouseUp = (): void => {
        window.onmousemove = null;
        window.onmouseup = null;
    }

    const handleTouchEnd = () => {
        window.ontouchmove = null;
        window.ontouchend = null;
    }


    return (
        <div className={styles.ImageSlider} ref={imageContainer} aria-label="Before and After Image Slider">
            <img src={imageOne} className={styles.imgOne} alt="new Image"/>
            <img src={imageTwo} className={styles.imgTwo} alt="old Image"
                 style={{
                     clipPath:`polygon(0 0, ${imageRevealFraq * 100}% 0, ${imageRevealFraq * 100}% 100%, 0 100%)`
                 }}/>
            <div className={styles.slider}
                 style={{
                     left:`${imageRevealFraq * 100}%`,
                 }} aria-label="slider">
                <div className={styles.sliderDiv}>
                    <div className={styles.sliderLine} aria-label="Slider Border"></div>
                    <button className={styles.sliderButton}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            aria-label="Slide to compare the two images"
                    ></button>
                </div>
            </div>
        </div>
    )
}