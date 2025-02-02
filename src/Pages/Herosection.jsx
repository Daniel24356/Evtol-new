import "./Herosection.css"
import drone from "../assets/drones-1-removebg.png"
import play1 from "../assets/play-1.webp"
import play2 from "../assets/play-2.jpg"
import { IoPlay } from "react-icons/io5";
import { PiMedalFill } from "react-icons/pi";

const HeroSection = () => {
    return (
        <>
        <section className="hero-sec">
            <div className="drone-img">
                <div className="me">
                    <img className="play-me" src={play1} alt="" />
                    <p>Futuristic</p>
                </div>
                <div className="your">
                    <img className="play-your" src={play2} alt="" />
                    <p>Quick Charge</p>
                </div>
               <img className="drone-me-img" src={drone} alt="" />
            </div>
            <div className="inno-div">
                <div className="innovative-div">
                   <PiMedalFill/>
                    <p>Most Innovative Award Winner</p>
                </div>
                <div className="power-div">
                    <p>Powered by Innovation,</p>
                    <p>Driven by Sustainability</p>
                </div>
                <div className="leading-div">
                    <p>Autoev are leading the charge towards a more sustainable</p>
                    <p>future, offering a thrilling blend of cutting-edge technology,</p>
                    <p>zero emissions, and unparalleled efficiency.</p>
                </div>
                <div className="req-play">
                    <button className="req-btn">Request a Test Drive</button>
                    <div className="play-div">
                       <div className="black-play">
                        <IoPlay/>
                       </div>
                       <p>Play Video</p>
                    </div>
                </div>
            </div>
        </section>
       
        </>
    )
}

export default HeroSection