import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";

const QRCodeGenerator = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [locationName, setLocationName] = useState("");


    const [generated, setGenerated] = useState(false);

    const qrCodeRef = useRef();

    const handleGenerateQRCode = () => {
        if (latitude && longitude) {
            setGenerated(true);
        } else {
            alert("Please enter valid location details!");
        }
    };

    const handleDownloadQRCodePDF = () => {
        if (qrCodeRef.current) {
            const doc = new jsPDF("p", "mm", "a4");
            const qrCodeSize = 100;
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const canvas = qrCodeRef.current.querySelector("canvas");
            const imgData = canvas.toDataURL("image/png");
            const x = (pageWidth - qrCodeSize) / 2;
            const y = (pageHeight - qrCodeSize) / 4;
            doc.addImage(imgData, "PNG", x, y, qrCodeSize, qrCodeSize);
            doc.save("QRCode.pdf");
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
                        <div className="card-body text-start">
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <label htmlFor="name" className="label">
                                    Location Name
                                </label>
                                <input
                                    type="text"
                                    className="input-field w-100"
                                    id="name"
                                    placeholder="Enter location name"
                                    value={locationName}
                                    onChange={(e) => setLocationName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <label htmlFor="latitude" className="label">
                                    Latitude
                                </label>
                                <input
                                    type="text"
                                    className="input-field w-100"
                                    id="latitude"
                                    placeholder="Enter latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <label htmlFor="longitude" className="label">
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    className="input-field w-100"
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
                                <div ref={qrCodeRef}>
                                    <QRCodeCanvas value={googleMapsUrl} size={200} />
                                </div>
                                <p className="mt-3">
                                    <strong>Location Name:</strong>{" "}
                                    <a
                                        href={googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary"
                                    >
                                        {locationName}
                                    </a>
                                </p>
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
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={handleDownloadQRCodePDF}
                                >
                                    Download
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;