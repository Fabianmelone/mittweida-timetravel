import {useState, useRef } from "react";
import { useLocation }  from 'wouter';
import styles from "./ImageSlider.module.css";


const AfterMoreInfo = ({ isExpanded, toggle, imageRevealFraq }: { isExpanded: boolean, toggle: () => void, imageRevealFraq: number }) => (
    <div className={`${styles.additionalInfo} ${isExpanded ? styles.expanded : styles.collapsed}`} style={{top: `${imageRevealFraq * 2}%`}}>
        <button
            className={`${styles.slideContent} ${isExpanded ? styles.expandButton : styles.collapseButton}`}
            onClick={toggle}
            aria-label={isExpanded ? 'Collapse content' : 'Expand content'}
        />
        <h2>After</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet.</p>
    </div>
)

const BeforeMoreInfo = ({ isExpanded, toggle, imageRevealFraq }: { isExpanded: boolean, toggle: () => void, imageRevealFraq: number }) => (
    <div className={`${styles.additionalInfo} ${isExpanded ? styles.expanded : styles.collapsed}`} style={{top: `${(200 + (-1 * imageRevealFraq * 2))}%`}}>
        <button
            className={`${styles.slideContent} ${isExpanded ? styles.expandButton : styles.collapseButton}`}
            onClick={toggle}
            aria-label={isExpanded ? 'Collapse content' : 'Expand content'}
        />
        <h2>Before</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet.</p>
    </div>
)

interface ImageProps {
    imageOne: string;
    imageTwo: string;
}
export default function ImageSlider({imageOne, imageTwo}: ImageProps) {
    const [imageRevealFraq, setImageRevealFraq] = useState(0.5);
    const imageContainer = useRef<HTMLDivElement>(null);
    const [location] = useLocation() as [string, (to: string) => void];
    const [, navigate] = useLocation();
    const sliderPercentage = Math.round(((imageRevealFraq * 100)) * 100 / 100);

// Now you can safely do:
    const showDescriptions = location.startsWith("/timetravel");

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
    const handleMouseMove = (event: MouseEvent): void => {slide(event.clientX);}
    const handleTouchMove = (event: TouchEvent): void =>{slide(event.touches[0].clientX);}
    const handleMouseUp = (): void => {
        window.onmousemove = null;
        window.onmouseup = null;
    }
    const handleTouchEnd = () => {
        window.ontouchmove = null;
        window.ontouchend = null;
    }


    const after = imageRevealFraq < 0.5;
    const before = imageRevealFraq > 0.5;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={styles.ImageSlider} ref={imageContainer} aria-label="Before and After Image Slider">

            {showDescriptions && (
                <button className={styles.closeButton}
                        onClick={()=> navigate("/")}
                />
            )}
            <div className={styles.afterContainer}>
                <img src={imageOne} className={styles.imgOne} alt="new Image"/>
                {!after && showDescriptions && (
                    <div className={styles.afterDescription} style={{ opacity: imageRevealFraq < 0.5 ? 0 : 1}}>
                        <h2>After</h2>
                    </div>
                )}
                {showDescriptions && after && <AfterMoreInfo isExpanded={isExpanded} toggle={() => setIsExpanded(!isExpanded)} imageRevealFraq={sliderPercentage} />}
            </div>
            <div className={styles.beforeContainer}  style={{
                clipPath:`polygon(0 0, ${imageRevealFraq * 100}% 0, ${imageRevealFraq * 100}% 100%, 0 100%)`
            }}>
                <img src={imageTwo} className={styles.imgTwo} alt="old Image"
                    />
                {!before && showDescriptions && (
                    <div className={styles.beforeDescription} style={{ opacity: imageRevealFraq > 0.5 ? 0 : 1}}>
                        <h2>Before</h2>
                    </div>
                )}
                {before && showDescriptions && <BeforeMoreInfo isExpanded={isExpanded} toggle={() => setIsExpanded(!isExpanded)} imageRevealFraq={sliderPercentage} />}
            </div>

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