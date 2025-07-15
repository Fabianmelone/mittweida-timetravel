import ImageSlider from "./sliderModule/ImageSlider.tsx";
import locationData from "../../data/LocationData.json";

export default function TimeTravel({ params }: { params: { slug: string }}) {
    if(!(params.slug in locationData)) {
        return <p>Location not found.</p>
    }

    const data = locationData[params.slug as keyof typeof locationData];

    return (
        <div className="time-travel">
            <h1>{data.title}</h1>
            <ImageSlider
                imageOne={data.images[0]}
                imageTwo={data.images[1]}
                afterText={data.beforeAfter[0]}
                beforeText={data.beforeAfter[1]}/>
            <img className="logo" src={'../public/img/timetravel-logo.svg'} />
        </div>
    )
}