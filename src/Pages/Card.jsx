import "./Card.css";
import drone1 from "../assets/drone-1.png";
import health1 from "../assets/health-1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Card = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [evtols, setEvtols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvtol, setSelectedEvtol] = useState(null);
    const [loadedMedications, setLoadedMedications] = useState([]);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [batteryLevels, setBatteryLevels] = useState({});
    const [isBatteryLoading, setIsBatteryLoading] = useState(false);

    // Fetching the eVTOLs initially
    useEffect(() => {
        const fetchEvtols = async () => {
            try {
                const response = await axios.get("http://localhost:3020/api/v1/evtol");
                setEvtols(response.data);
            } catch (err) {
                toast.error("Failed to fetch eVTOLs", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                  });
                setError("Failed to fetch eVTOLs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvtols();
    }, []);

    // Fetch the battery level periodically for the selected eVTOL
    useEffect(() => {
        const fetchEvtols = async () => {
          try {
            const response = await axios.get("http://localhost:3020/api/v1/evtol");
            setEvtols(response.data);  // Set all eVTOLs
            // Initialize the battery levels for all eVTOLs
            const initialBatteryLevels = response.data.reduce((acc, evtol) => {
              acc[evtol.serialNumber] = evtol.batteryLevel;  // Set initial battery level
              return acc;
            }, {});
            setBatteryLevels(initialBatteryLevels);  // Set battery levels state
          } catch (err) {
            toast.error("Failed to fetch eVTOLs", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
              });
            console.error("Failed to fetch eVTOLs", err);
          }
        };
    
        fetchEvtols();
      }, []);
    
      // Periodically fetch the battery level for each eVTOL
      useEffect(() => {
        const batteryInterval = setInterval(async () => {
          try {
            // Loop through all eVTOLs and fetch their individual battery levels
            for (const evtol of evtols) {
              const response = await axios.get(
                `http://localhost:3020/api/v1/evtol/${evtol.serialNumber}/battery`
              );
              const newBatteryLevel = response.data.batteryLevel;
    
              // Update the battery level for the corresponding eVTOL
              setBatteryLevels((prevLevels) => ({
                ...prevLevels,
                [evtol.serialNumber]: newBatteryLevel,
              }));
            }
          } catch (err) {
            toast.error("Failed to fetch battery levels", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
              });
            console.error("Failed to fetch battery levels", err);
          }
        }, 6000); // Update every 6 seconds
    
        // Clear interval when the component is unmounted
        return () => clearInterval(batteryInterval);
      }, [evtols]); 

    // Function to open the modal and fetch medications for the selected eVTOL
    const openModal = async (evtol) => {
        setSelectedEvtol(evtol);
        try {
            const response = await axios.get(
                `http://localhost:3020/api/v1/evtol/${evtol.serialNumber}/medications`
            );
            setLoadedMedications(response.data);
            setIsDropdownOpen(true);
            document.body.classList.add("modal-open");
        } catch (err) {
            toast.error("Failed to fetch loaded medications", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
              });
            setError("Failed to fetch loaded medications");
            console.error(err);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        setIsDropdownOpen(false);
        document.body.classList.remove("modal-open");
        setSelectedEvtol(null);
        setLoadedMedications([]);
    };

    if (loading) return <p>Loading eVTOLs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <section className="card-sec">
                <button className="tailored-btn">Tailored Made</button>
                <div className="prec-div">
                    <h3>Power & Precision</h3>
                    <p>Discover all features</p>
                </div>
                <div className="card-cont">
                    {evtols.map((evtol) => (
                        <div
                            key={evtol.serialNumber}
                            className="card-me"
                            onClick={() => openModal(evtol)} // Open modal on click
                        >
                            <div className="card-div">
                                <img src={drone1} alt="" />
                                <h5>{evtol.serialNumber}</h5>
                                <p>{evtol.model}</p>
                            </div>
                            <div>
                                <p className="weight-txt">Weight: {evtol.weightLimit}g</p>
                            </div>

                            <div className="battery-cont">
                                <div className="battery-txt">
                                    <p>Battery</p>
                                    <p>{batteryLevels[evtol.serialNumber]}%</p>
                                </div>
                                <div className="battery-reader">
                                    <div className="battery-fill" style={{ width: `${batteryLevels[evtol.serialNumber]}%` }}></div>
                                </div>
                                {isBatteryLoading && <p>Battery is updating...</p>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for displaying eVTOL details and loaded medications */}
                {isDropdownOpen && selectedEvtol && (
                    <section className="modal-sec">
                        <div className="modal-ass">
                            <div className="close-btn" onClick={closeModal}>
                                <IoClose />
                            </div>
                            <div className="modal-div">
                                <div>
                                    <img src={drone1} alt="" />
                                </div>
                                <div>
                                    <h1 className="evtol-model">Model: {selectedEvtol.serialNumber}</h1>
                                    <p className="light-weight">LightWeight</p>
                                    <p className="weight-text">
                                        <span className="weight-innertxt">Weight:</span> {selectedEvtol.weightLimit}g
                                    </p>

                                    <div className="battery-conts">
                                        <div className="battery-txts">
                                            <p>Battery</p>
                                            <p>{batteryLevels[selectedEvtol.serialNumber]}%</p>
                                        </div>
                                        <div className="battery-readers">
                                            <div className="battery-lefts"></div>
                                            <div className="battery-reader">
                                                <div className="battery-fill" style={{ width: `${batteryLevels[selectedEvtol.serialNumber]}%` }}></div>
                                            </div>
                                        </div>
                                    </div>

                                 <Link to='/checkout'><button className="checkout-btn">Checkout now</button></Link>   
                                </div>
                            </div>

                            {/* Displaying loaded medications */}
                            <div className="heah">
                                <h3>Loaded Medications:</h3>
                                <div className="health-modal">
                                    {loadedMedications.length > 0 ? (
                                        loadedMedications.map((med) => (
                                            <div key={med.code} className="health-item">
                                                <img src={health1} alt={med.name} />
                                                <h3>{med.name}</h3>
                                                <p>Weight: {med.weight}g</p>
                                                <p>Code: {med.code}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No medications loaded.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
};

export default Card;
