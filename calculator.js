// Function to calculate monthly savings
function calculateMonthlySavings() {
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const efficiency = 0.4; // Efficiency is predefined
    // Implement logic to calculate monthly savings
    return 2;

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
        return "You don't need any panels"; // Handle the case where kWhUsed is not positive
    }
}

// Function to update the result on the HTML page with calculations finished
function updateResult() {
    const monthlySavings = calculateMonthlySavings();
    const paybackPeriod = calculatePaybackPeriod();
    const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded();

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
        <p>Monthly Savings: ${monthlySavings}</p>
        <p>Payback Period: ${paybackPeriod}</p>
        <p>Number of Panels Needed: ${numberOfPanelsNeeded}</p>
    `;
}

// Event listener to handle form submission
document.getElementById("calculationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Update the result based on user input and predefined data
    updateResult();
});
