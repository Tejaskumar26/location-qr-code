import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";

const QRCodeGenerator = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [locationName, setLocationName] = useState("");
    const [googleMapsUrl, setGoogleMapsUrl] = useState("");
    const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);

    const qrCodeRef = useRef();

    useEffect(() => {
        if (locationName) {
            setGoogleMapsUrl(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`
            );
        } else if (latitude && longitude) {
            setGoogleMapsUrl(`https://www.google.com/maps?q=${latitude},${longitude}`);
        } else {
            setGoogleMapsUrl("");
        }
    }, [latitude, longitude, locationName]);

    const handleGenerateQRCode = () => {
        if (locationName || (latitude && longitude)) {
            setIsQRCodeGenerated(true);
        } else {
            alert("Please enter either a location name or both latitude and longitude!");
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
            if (locationName) {
                doc.text(locationName, pageWidth / 2, y + qrCodeSize + 20, { align: "center" });
            }
            doc.save("QRCode.pdf");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>QR Code Generator for Location</h3>
                        </div>
                        <div className="card-body">
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <label htmlFor="name" className="form-label">Location Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input-field w-100"
                                    placeholder="Enter location name"
                                    value={locationName}
                                    onChange={(e) => setLocationName(e.target.value)}
                                    disabled={latitude || longitude}
                                />
                            </div>

                            {/* OR Divider */}
                            <div className="or-divider">
                                <span>OR</span>
                            </div>

                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <label htmlFor="latitude" className="form-label">Latitude</label>
                                <input
                                    type="text"
                                    id="latitude"
                                    className="input-field w-100"
                                    placeholder="Enter latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                    disabled={locationName}
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-between align-items-center">
                                <label htmlFor="longitude" className="form-label">Longitude</label>
                                <input
                                    type="text"
                                    id="longitude"
                                    className="input-field w-100"
                                    placeholder="Enter longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                    disabled={locationName}
                                />
                            </div>
                            <button className="btn btn-success w-100" onClick={handleGenerateQRCode}>
                                Generate QR Code
                            </button>
                        </div>
                        {isQRCodeGenerated && googleMapsUrl && (
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
                                        {locationName || "Unnamed Location"}
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
                                <button className="btn btn-primary mt-3" onClick={handleDownloadQRCodePDF}>
                                    Download QR Code as PDF
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