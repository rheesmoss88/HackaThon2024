function calculatePanelArea() {
    const sizeX = 2.0066;
    const sizeY = 0.9906;
    const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded(); // Get the number of panels needed
 
 
    const surfaceArea = numberOfPanelsNeeded * sizeX * sizeY;
    return surfaceArea.toFixed(2);
 }
 
 
 // Function to calculate payback period
 function calculatePaybackPeriod() {
    const cost = 414; // Cost is predefined
    // Implement logic to calculate payback period
 }
 
 
 // Function to calculate number of solar panels needed
 function calculateNumberOfPanelsNeeded() {
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const province = document.getElementById("province").value;
    let costOfKwHours, SolarKwhPerYear, AdmFee;
 
 
    switch(province) {
        case "British Columbia":
            costOfKwHours = 0.15;
            SolarKwhPerYear = 1000;
            AdmFee = 267.24;
            break;
        case "Alberta":
            costOfKwHours = 0.258;
            SolarKwhPerYear = 1246;
            AdmFee = 119.52;
            break;
        case "Quebec":
            costOfKwHours = 0.0759;
            SolarKwhPerYear = 1150;
            AdmFee = 25.00;
            break;
        case "Yukon":
            costOfKwHours = 0.125;
            SolarKwhPerYear = 965;
            AdmFee = 175.8;
            break;
        default:
            costOfKwHours = 0; // Set default values to handle invalid province selection
            SolarKwhPerYear = 0;
            AdmFee = 0;
            break;
    }
 
 
    const kWhUsed = (electricityCost - AdmFee) / costOfKwHours;
    if(kWhUsed > 0) { // Check if kWhUsed is greater than 0
        const numPanels = Math.ceil( kWhUsed / (SolarKwhPerYear * 0.4)); // Assuming efficiency is 40%
        return numPanels;
    } else {
        return 0; // Return 0 panels if kWhUsed is not positive
    }
 }
 
 
 // Function to update the result on the HTML page with calculations finished
 function updateResult() {
    const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded();
    const panelArea = calculatePanelArea();
    const paybackPeriod = calculatePaybackPeriod();
 
 
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
        <p>Number of Panels Needed: ${numberOfPanelsNeeded}</p>
        <p>Panel Surface Area Needed: ${panelArea} m<sup>2</sup></p>
        <p>Payback Period: ${paybackPeriod}</p>
    `;
 }
 
 
 // Event listener to handle form submission
 document.getElementById("calculationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Update the result based on user input and predefined data
    updateResult();
 });
 