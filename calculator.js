function calculatePanelArea() {
    const sizeX = 2.0066;
    const sizeY = 0.9906;
    const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded(); // Get the number of panels needed
    const surfaceArea = numberOfPanelsNeeded * sizeX * sizeY;
    return surfaceArea.toFixed(2);
}
 
// Function to calculate payback period
function calculatePaybackPeriod() {
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const totalCost = totalCostToUser();
    const payBackPeriod = totalCost / electricityCost; // This is the payback period
    return payBackPeriod.toFixed(2) + " years.";
}
 
// Function to calculate number of solar panels needed
function calculateNumberOfPanelsNeeded() {
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const province = document.getElementById("province").value;

    let costOfKwHours, SolarKwhPerYear, AdmFee;

    switch (province) {
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
    if (kWhUsed > 0) {
        const numPanels = Math.ceil(kWhUsed / (SolarKwhPerYear * 0.4));
        return numPanels;
    } else {
        return 0;
    }
}

 
function totalCostToUser() {
    const roofAvailableSpace = parseFloat(document.getElementById("roofSurfaceArea").value) || 0;
    const numberOfPanels = calculateNumberOfPanelsNeeded();
    const cost = 414; // Cost is predefined for 1 solar panel
    const totalCost = numberOfPanels * cost;
    return totalCost;
}
 
// Function to update the result on the HTML page with calculations finished
function updateResult() {
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const resultElement = document.getElementById("result");

    if (electricityCost <= 0 || isNaN(electricityCost)) {
        // Clear the result box and display "Invalid Electricity Cost"
        resultElement.innerHTML = "<p>Invalid Electricity Cost</p>";
    } else {
        // Proceed with calculations and update the result box
        const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded();
        const panelArea = calculatePanelArea();
        const paybackPeriod = calculatePaybackPeriod();
        const totalUserCost = totalCostToUser();

        resultElement.innerHTML = `
            <p>Number of Panels Needed: ${numberOfPanelsNeeded}</p>
            <p>Panel Surface Area Needed: ${panelArea} m<sup>2</sup></p>
            <p>Payback Period: ${paybackPeriod}</p>
            <p>Total Installation Cost: $${totalUserCost} CAD</p>
        `;
    }
}
 
// Event listener to handle form submission
document.getElementById("calculationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Update the result based on user input and predefined data
    updateResult();
});
