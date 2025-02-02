import "./Card.css";
import drone1 from "../assets/drone-1.png";
import health1 from "../assets/health-1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [evtols, setEvtols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvtol, setSelectedEvtol] = useState(null);
  const [loadedMedications, setLoadedMedications] = useState([]);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isBatteryLoading, setIsBatteryLoading] = useState(false);

  // Fetching the eVTOLs initially
  useEffect(() => {
    const fetchEvtols = async () => {
      try {
        const response = await axios.get("http://localhost:3020/api/v1/evtol");
        setEvtols(response.data);
      } catch (err) {
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
    let batteryInterval;

    if (selectedEvtol) {
      batteryInterval = setInterval(async () => {
        try {
          const response = await axios.get(
            `http://localhost:3020/api/v1/evtol/${selectedEvtol.serialNumber}/battery`
          );
          const currentBatteryLevel = response.data.batteryLevel; // Ensure it's a number
          setBatteryLevel(currentBatteryLevel);
          setIsBatteryLoading(true); // Start loading state to show charging/discharging
        } catch (err) {
          console.error("Failed to fetch battery level", err);
        }
      }, 60000); // Update every 3 seconds
      
      // Stop the interval when the component is unmounted or when the eVTOL changes
      return () => clearInterval(batteryInterval);
    }
  }, [selectedEvtol]);

  // Function to open the modal and fetch medications for the selected eVTOL
  const openModal = async (evtol) => {
    setSelectedEvtol(evtol);
    try {
      const response = await axios.get(
        `http://localhost:3020/api/v1/evtol/${evtol.serialNumber}/medications`
      );
      setLoadedMedications(response.data);
      setIsDropdownOpen(true);
    } catch (err) {
      setError("Failed to fetch loaded medications");
      console.error(err);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsDropdownOpen(false);
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
                  <p>{batteryLevel}%</p>
                </div>
                <div className="battery-reader">
                  <div className="battery-left"></div>
                  <div className="battery-right" style={{ width: `${batteryLevel}%` }}></div>
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
                      <p>{batteryLevel}%</p>
                    </div>
                    <div className="battery-readers">
                      <div className="battery-lefts"></div>
                      <div
                        className="battery-rights"
                        style={{ width: `${batteryLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="checkout-btn">Checkout now</button>
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
