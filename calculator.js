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

function actualCalculation() {
    const roofAvailableSpace = parseFloat(document.getElementById("roofSurfaceArea").value);
    const panelArea = parseFloat(calculatePanelArea()); // Retrieve panel area

    if (roofAvailableSpace < panelArea) {
        const usablePanels = parseFloat((roofAvailableSpace / panelArea) * 100);
        const updatedNumberOfPanels = parseInt(calculateNumberOfPanelsNeeded()) * (roofAvailableSpace / panelArea);
        const updatedPaybackPeriod = parseFloat(calculatePaybackPeriod()) * (panelArea / roofAvailableSpace);
        const updatedTotalCost = Math.floor(updatedNumberOfPanels)*414.02; //SOMETHING TO DO WITH FLOORING THAT TOOK US A LONG TIME

        // Update Actual Results section
        document.getElementById("actualResultsHeader").style.display = "block";
        document.getElementById("actualResult").style.display = "block";
        document.getElementById("actualResult").innerHTML = `
            <p>Percentage of Usable Panels: ${usablePanels.toFixed(2)}%</p>
            <p>Updated Number of Panels: ${Math.floor(updatedNumberOfPanels)}</p>
            <p>Updated Payback Period: ${updatedPaybackPeriod.toFixed(2)} years</p>
            <p>Updated Total Installation Cost: $${updatedTotalCost.toFixed(2)} CAD</p>
        `;

        return usablePanels.toFixed(2);
    } else {
        // Hide the Actual Results section if not needed
        document.getElementById("actualResultsHeader").style.display = "none";
        document.getElementById("actualResult").style.display = "none";
    }
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
    const numberOfPanels = calculateNumberOfPanelsNeeded();
    const cost = 414.02; // Cost is predefined for 1 solar panel
    const totalCost = numberOfPanels * cost;
    return totalCost.toFixed(2);
}
 
// Function to update the result on the HTML page with calculations finished
function updateResult() {
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const resultElement = document.getElementById("result");
    const actualResultElement = document.getElementById("actualResult");
    const roofAvailableSpace = parseFloat(document.getElementById("roofSurfaceArea").value);
    const panelArea = parseFloat(calculatePanelArea()); // Retrieve panel area
 
    if (electricityCost <= 0 || isNaN(electricityCost)) {
        // Clear the result box and display "Invalid Electricity Cost"
        resultElement.innerHTML = "<p>Invalid Electricity Cost</p>";
    } else {
        // Proceed with calculations and update the result box
        const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded();
        const paybackPeriod = calculatePaybackPeriod();
        const totalUserCost = totalCostToUser();
        const usablePanels = actualCalculation(); // Retrieve actual calculation value
 
        let resultHTML = `
            <p>Number of Panels Needed: ${numberOfPanelsNeeded}</p>
            <p>Panel Surface Area Needed: ${panelArea} m<sup>2</sup></p>
            <p>Payback Period: ${paybackPeriod}</p>
            <p>Total Installation Cost: $${totalUserCost} CAD</p>
        `;
 
    
 
        resultElement.innerHTML = resultHTML;
 
        if (roofAvailableSpace < panelArea) {
            const updatedNumberOfPanels = Math.ceil(roofAvailableSpace / (sizeX * sizeY));
            const updatedTotalUserCost = updatedNumberOfPanels * 414.02;
            const updatedPaybackPeriod = updatedTotalUserCost / electricityCost;
            const updatedPanelArea = roofAvailableSpace;
            actualResultElement.innerHTML = `
                <h2>Actual Results</h2>
                <p>Number of Panels Needed: ${updatedNumberOfPanels}</p>
                <p>Panel Surface Area Needed: ${updatedPanelArea} m<sup>2</sup></p>
                <p>Payback Period: ${updatedPaybackPeriod} years.</p>
                <p>Total Installation Cost: $${updatedTotalUserCost} CAD</p>
            `;
            actualResultElement.style.display = "block"; // Show the actual result section
        } else {
            actualResultElement.style.display = "none"; // Hide the actual result section if not needed
        }
    }
 }
 
// Event listener to handle form submission
document.getElementById("calculationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Update the result based on user input and predefined data
    updateResult();
});
