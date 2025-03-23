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

document.addEventListener("DOMContentLoaded", function () {
    const heightSelect = document.getElementById("height");
    const weightSelect = document.getElementById("weight");
    const ageSelect = document.getElementById("age");
    const bloodPressureSelect = document.getElementById("bloodPressure");
    const familyDiseaseSelect = document.getElementById("familyDisease");
    const insurabilityScore = document.getElementById("insurabilityScore");
    const riskLevel = document.getElementById("riskLevel");

    // Populate height dropdown (example: 4'0" to 7'0")
    for (let feet = 4; feet <= 7; feet++) {
        for (let inches = 0; inches <= 11; inches++) {
            let option = document.createElement("option");
            option.value = `${feet}'${inches}"`;
            option.textContent = `${feet}'${inches}"`;
            heightSelect.appendChild(option);
        }
    }

    // Populate weight dropdown (example: 50 to 400 pounds)
    for (let weight = 50; weight <= 400; weight += 10) {
        let option = document.createElement("option");
        option.value = weight;
        option.textContent = `${weight} lbs`;
        weightSelect.appendChild(option);
    }

    // Populate age dropdown (example: 18 to 100 years)
    for (let age = 18; age <= 100; age++) {
        let option = document.createElement("option");
        option.value = age;
        option.textContent = `${age} years`;
        ageSelect.appendChild(option);
    }

    // Populate blood pressure dropdown
    const bloodPressureOptions = [
        "Normal", "Elevated", "Hypertension Stage 1", "Hypertension Stage 2", "Hypertensive Crisis"
    ];
    bloodPressureOptions.forEach(pressure => {
        let option = document.createElement("option");
        option.value = pressure;
        option.textContent = pressure;
        bloodPressureSelect.appendChild(option);
    });

    // Populate family disease dropdown
    const familyDiseaseOptions = [
        "Diabetes", "Heart Disease", "Cancer", "Hypertension", "Asthma", "None"
    ];
    familyDiseaseOptions.forEach(disease => {
        let option = document.createElement("option");
        option.value = disease;
        option.textContent = disease;
        familyDiseaseSelect.appendChild(option);
    });

    // Function to calculate the risk score
    function calculateRisk() {
        const height = heightSelect.value;
        const weight = parseInt(weightSelect.value, 10);
        const age = parseInt(ageSelect.value, 10);
        const bloodPressure = bloodPressureSelect.value;
        const familyDisease = familyDiseaseSelect.value;

        let score = 0;
        let risk = "Low";

        // BMI Calculation (simplified version: weight (lbs) / height (inches)^2 * 703)
        const heightInches = parseInt(height.split("'")[0]) * 12 + parseInt(height.split("'")[1].replace('"', ''));
        const bmi = (weight / (heightInches * heightInches)) * 703;

        // Age risk: 1 point for every 10 years over 40
        if (age > 40) {
            score += Math.floor((age - 40) / 10);
        }

        // Blood pressure risk
        const bpRisk = {
            "Normal": 0,
            "Elevated": 1,
            "Hypertension Stage 1": 2,
            "Hypertension Stage 2": 3,
            "Hypertensive Crisis": 4
        };
        score += bpRisk[bloodPressure] || 0;

        // Family disease risk
        if (familyDisease !== "None") {
            score += 2;
        }

        // Final scoring based on BMI (simplified)
        if (bmi > 30) {
            score += 3; // Obesity increases risk
        } else if (bmi > 25) {
            score += 2; // Overweight increases risk
        }

        // Determine risk level based on score
        if (score <= 3) {
            risk = "Low";
        } else if (score <= 6) {
            risk = "Moderate";
        } else {
            risk = "High";
        }

        // Display results
        insurabilityScore.textContent = `Score: ${score}`;
        riskLevel.textContent = `Risk Level: ${risk}`;
    }

    // Attach event listeners to dropdowns to calculate score as values change
    heightSelect.addEventListener("change", calculateRisk);
    weightSelect.addEventListener("change", calculateRisk);
    ageSelect.addEventListener("change", calculateRisk);
    bloodPressureSelect.addEventListener("change", calculateRisk);
    familyDiseaseSelect.addEventListener("change", calculateRisk);
});
