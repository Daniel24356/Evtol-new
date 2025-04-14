import "./Medication.css";
import Header from "./Header";
import MedicineBanner from "./MedicineBanner";
import health1 from "../assets/health-1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Medication = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = (medicationCode) => {
        setIsDropdownOpen(isDropdownOpen === medicationCode ? null : medicationCode);
    };

    const [medications, setMedications] = useState([]);
    const [loadings, setLoadings] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const token = localStorage.getItem("Authorization"); // Retrieve token from localStorage
                if (!token) {
                    throw new Error("Authorization token is missing");
                }
    
                const response = await axios.get("http://localhost:3020/api/v1/medication", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include Bearer token in headers
                    },
                });
    
                setMedications(response.data);
                console.log(response.data);
            } catch (err) {
                toast.error("Failed to fetch medications", {
                    // position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 5000,
                });
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
                toast.error("Failed to fetch eVTOLs", {
                    // position: toast.POSITION.BOTTOM_CENTER,
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

    const [selectedEvtol, setSelectedEvtol] = useState("");
    const [selectedMedications, setSelectedMedications] = useState([]);
    const [loadingMedications, setLoadingMedications] = useState(false);
    const [medicationLoadError, setMedicationLoadError] = useState(null);

    const handleMedicationSelection = (medication) => {
        setSelectedMedications((prev) =>
            prev.find((med) => med.code === medication.code)
                ? prev.filter((med) => med.code !== medication.code)
                : [...prev, medication]
        );
    };
     
    const handleAddMedicationToEvtol = async (medication) => {
        if (!selectedEvtol) {
            toast.error("Please select an eVTOL.", {
                // position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
            });
            return;
        }

        if (selectedMedications.length === 0) {
            toast.error("Please select at least one medication.", {
                //   position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
            });
            return;
        }

        const medicationDTO = {
            serialNumber: selectedEvtol,
            medications: selectedMedications.map((medication) => ({
                code: medication.code,
            }))
        };

        console.log(medicationDTO)

        try {
            const token = localStorage.getItem("Authorization"); // Retrieve token from localStorage
            if (!token) {
                throw new Error("Authorization token is missing");
            }
            // First, check eVTOL availability for loading
            // const response = await axios.post(
            //     "http://localhost:3020/api/v1/evtol/check-load",{   
            //         medicationDTO
            //     }
            // );
            // console.log("eVTOL load check successful:", response.data);
              
            // If the load check passed, proceed to load the medication into eVTOL
            const loadResponse = await axios.post(
                "http://localhost:3020/api/v1/evtol/load",
                medicationDTO, // Payload should be here
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include Bearer token in headers
                    },
                }
            );
            console.log("Medication loaded successfully:", loadResponse.data);
            toast.success("Medication loaded successfully:", {
                // position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
            });
        } catch (err) {
            toast.error("Error, You have currently passed the Weight limit or batter is low", {
                // position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
            });
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
             <Header/>
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
                            <button onClick={() => toggleDropdown(medication.code)} className="add-evtol">
                                Add to eVTOL
                            </button>
                            {isDropdownOpen === medication.code && (
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

                            <button
                                onClick={() => handleMedicationSelection(medication)}
                                className="select-medication"
                            >
                                {selectedMedications.find((med) => med.code === medication.code)
                                    ? "Deselect"
                                    : "Select"}
                            </button>

                            {/* Button to load medication into selected eVTOL */}
                            <button
                                onClick={() => handleAddMedicationToEvtol(medication)}
                                disabled={loadingMedications}
                                className="load-medication"
                            >
                                {loadingMedications ? "Loading..." : "Load Medication"}
                            </button>

                        </div>
                    ))}
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default Medication;
