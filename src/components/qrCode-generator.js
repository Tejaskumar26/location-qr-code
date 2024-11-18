import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [generated, setGenerated] = useState(false);

    const handleGenerateQRCode = () => {
        if (latitude && longitude) {
            setGenerated(true);
        } else {
            alert("Please enter valid location details!");
        }
    };

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>QR Code Generator for Location</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="latitude" className="form-label">
                                    Latitude
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="latitude"
                                    placeholder="Enter latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="longitude" className="form-label">
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="longitude"
                                    placeholder="Enter longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                            </div>
                            <div className="d-grid">
                                <button
                                    className="btn btn-success"
                                    onClick={handleGenerateQRCode}
                                >
                                    Generate QR Code
                                </button>
                            </div>
                        </div>
                        {generated && (
                            <div className="card-footer text-center">
                                <h5>QR Code</h5>
                                <QRCodeCanvas value={googleMapsUrl} size={200} />
                                <p className="mt-3">
                                    <strong>Google Maps URL:</strong>{" "}
                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary"
                                    >
                                        {googleMapsUrl}
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
