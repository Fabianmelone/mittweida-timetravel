import ImageSlider from "./sliderModule/ImageSlider.tsx";

const locationData: Record<string, { title: string; images: string[]; description: string }> = {
    "city-administration": {
        title: "City Administration",
        images: ["../public/img/mittweida-now-2020.png", "../public/img/mittweida-before-1914.png"],
        description: "This is the city administration building of Mittweida",
    },
    "city-library": {
        title: "City Library",
        images: ["/img/stadtverwaltung1.jpg", "/img/stadtverwaltung2.jpg"],
        description: "This is the city administration building of Mittweida",
    },
    "cafe-ines-haferkom": {
        title: "Cafe Ines Haferkom",
        images: ["/img/stadtverwaltung1.jpg", "/img/stadtverwaltung2.jpg"],
        description: "This is the city administration building of Mittweida",
    },
    "faculty-of-media": {
        title: "Faculty of Media",
        images: ["/img/stadtverwaltung1.jpg", "/img/stadtverwaltung2.jpg"],
        description: "This is the city administration building of Mittweida",
    }

}

export default function TimeTravel({ params }: { params: { slug: string }}) {
    const data = locationData[params.slug];

    if (!data) return <p>Location not found.</p>

    return (
        <div className="time-travel">
            <h1>{data.title}</h1>
            <ImageSlider imageOne={data.images[0]} imageTwo={data.images[1]} />
            <img className="logo" src={'../public/img/timetravel-logo.svg'} />
        </div>
    )
}