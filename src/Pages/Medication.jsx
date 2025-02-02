import "./Medication.css";
import Header from "./Header";
import MedicineBanner from "./MedicineBanner";
import health1 from "../assets/health-1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

const Medication = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const [medications, setMedications] = useState([]);
  const [loadings, setLoadings] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get("http://localhost:3020/api/v1/medication");
        setMedications(response.data);
        console.log(response.data);
      } catch (err) {
        setErrors("Failed to fetch medications");
        console.error(err);
      } finally {
        setLoadings(false);
      }
    };

    fetchMedications();
  }, []);

  const [evtols, setEvtols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvtols = async () => {
      try {
        const response = await axios.get("http://localhost:3020/api/v1/evtol");
        setEvtols(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch eVTOLs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvtols();
  }, []);

  const [selectedEvtol, setSelectedEvtol] = useState("");
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [loadingMedications, setLoadingMedications] = useState(false);
  const [medicationLoadError, setMedicationLoadError] = useState(null);

  const handleAddMedicationToEvtol = async (medication) => {
    if (!selectedEvtol) {
      alert("Please select an eVTOL.");
      return;
    }
  
    const medicationDTO = {
      serialNumber: selectedEvtol,
      medications: selectedMedications.map((medication) => ({
        code: medication.code,
      }))
    };
  
    try {
      // First, check eVTOL availability for loading
      const response = await axios.post(
        "http://localhost:3020/api/v1/evtol/check-load", 
        medicationDTO
      );
      console.log("eVTOL load check successful:", response.data);
  
      // If the load check passed, proceed to load the medication into eVTOL
      const loadResponse = await axios.post(
        "http://localhost:3020/api/v1/evtol/load", 
        medicationDTO
      );
      console.log("Medication loaded successfully:", loadResponse.data);
      alert("Medication added to eVTOL successfully!");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMedicationLoadError("Failed to load medication: " + (err.response?.data?.message || err.message));
    } finally {
      setLoadingMedications(false);
    }
  };
  
  if (loadings) return <p>Loading Medications...</p>;
  if (errors) return <p>{errors}</p>;

  return (
    <>
      <MedicineBanner />

      <section className="health-sec">
        <div className="health-top">
          <div>
            <p className="med-prod">Health Products</p>
          </div>
          <div className="health-mid">
            <div>
              <p>ALL</p>
            </div>
            <div>
              <p>HAND CARE</p>
            </div>
            <div>
              <p>MOUTH & TEETH</p>
            </div>
            <div>
              <p>VITAMINS</p>
            </div>
            <div>
              <p>PAIN & FEVER</p>
            </div>
          </div>
        </div>

        <div className="health-cont">
          {medications.map((medication) => (
            <div className="health-div" key={medication.code}>
              <img src={health1} alt="" />
              <div>
                <p className="med-name">{medication.name}</p>
                <p className="med-desc">{medication.code}</p>
                <p className="med-price">{medication.weight}</p>
              </div>
              <button onClick={toggleDropdown} className="add-evtol">
                Add to eVTOL
              </button>
              {isDropdownOpen && (
                <div className="evt-model">
                  {evtols.map((evtol) => (
                    <div key={evtol.serialNumber}>
                      <p
                        onClick={() => setSelectedEvtol(evtol.serialNumber)}
                        className="evtol-item"
                      >
                        {evtol.serialNumber}
                      </p>
                      <p>{evtol.weightLimit}g</p>
                      <p>{evtol.batteryCapacity}%</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Button to load medication into selected eVTOL */}
              <button
                onClick={() => handleAddMedicationToEvtol(medication)}
                disabled={loadingMedications}
                className="load-medication"
              >
                {loadingMedications ? "Loading..." : "Load Medication"}
              </button>

              {/* Display error message if any */}
              {medicationLoadError && <p className="error">{medicationLoadError}</p>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Medication;
