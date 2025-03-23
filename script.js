document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("risk-form"); // Corrected form ID
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        // Get user input
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const age = parseInt(document.getElementById("age").value);
        const bloodPressure = document.getElementById("blood-pressure").value;
        const familyHistory = Array.from(document.querySelectorAll("input[name='family-history']:checked"))
                                  .map(input => input.value);

        // Validate input
        if (!weight || !height || !age) {
            resultDiv.innerHTML = "Please fill in all required fields.";
            return;
        }

        resultDiv.innerHTML = "Calculating..."; // Show loading message

        // Send request to API
        try {
            const response = await fetch("https://health-insurance-risk-calculator-api.azurewebsites.net/calculate-bmi", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ weight, height, age, bloodPressure, familyHistory })
            });

            const data = await response.json();
            if (response.ok) {
                resultDiv.innerHTML = `Your BMI is: ${data.bmi.toFixed(2)}<br>Risk Score: ${data.riskScore}`;
            } else {
                resultDiv.innerHTML = `Error: ${data.error}`;
            }
        } catch (error) {
            resultDiv.innerHTML = "Failed to connect to the server. Please try again.";
            console.error("Error:", error);
        }
    });
});
