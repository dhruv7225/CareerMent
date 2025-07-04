import { useEffect } from "react";

const Calendy = () => {
  useEffect(() => {
    // Dynamically load Calendly's widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Calendly inline widget container */}
      <div
        className="calendly-inline-widget"
        style={{ minWidth: "320px", height: "580px" }}
        data-url="https://calendly.com/carrerment"
      ></div>
    </div>
  );
};

export default Calendy;
