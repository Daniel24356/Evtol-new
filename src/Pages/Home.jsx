import Card from "./Card"
import Header from "./Header"
import HeroSection from "./Herosection"
import "./Home.css"
import MedicineBanner from "./MedicineBanner"


const Home = () => {
    return (
        <>
        <div className="header-hero">
        <Header/>
        <HeroSection/>
        </div>
       <Card/>
       {/* <MedicineBanner/> */}
        </>
    )
}

export default Home