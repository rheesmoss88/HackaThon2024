// Define the data model
class SolarPanel {
    constructor(sizeX, sizeY, cost, efficiency) {
        sizeX = 2.0066;
        sizeY = 0.9906;
        cost = 414; //avg cost between 340 and 488
        efficiency = 0.4;
    }
}

class UserInput {
    constructor(electricityCost, province) {
        this.electricityCost = electricityCost;
        this.province = province;
    }
}

// Function to calculate monthly savings
function calculateMonthlySavings(electricityCost, efficiency) {
    // Implement logic to calculate monthly savings
    return 2;

}

// Function to calculate payback period
function calculatePaybackPeriod(cost, monthlySavings) {
    // Implement logic to calculate payback period
}

// Function to calculate number of solar panels needed
function calculateNumberOfPanelsNeeded(electricityCost, efficiency, panelSize) {
    // Implement logic to calculate number of panels needed
}

// Function to update the result on the HTML page with calculations finished

function updateResult(userInput, solarPanel) {
    const monthlySavings = calculateMonthlySavings(userInput.electricityCost, solarPanel.efficiency);
    const paybackPeriod = calculatePaybackPeriod(solarPanel.cost, monthlySavings);
    const numberOfPanelsNeeded = calculateNumberOfPanelsNeeded(userInput.electricityCost, solarPanel.efficiency, solarPanel.size);

    // Update the HTML elements with the calculated results
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = 
        "<p>Monthly Savings: " + monthlySavings + "</p>" +
        "<p>Payback Period: " + paybackPeriod + "</p>" +
        "<p>Number of Panels Needed: " + numberOfPanelsNeeded + "</p>";
}


// Event listener to handle form submission
document.getElementById("calculationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get user input from the form fields
    const electricityCost = parseFloat(document.getElementById("electricityCost").value);
    const province = document.getElementById("province").value;

    // Create UserInput and SolarPanel objects
    const userInput = new UserInput(electricityCost, province);
    // Assuming solar panel data is predefined
    const solarPanel = new SolarPanel(5, 2000, 20); // Example data: size = 5 kW, cost = $2000, efficiency = 20%

    // Update the result based on user input and solar panel data
    updateResult(userInput, solarPanel);
});
