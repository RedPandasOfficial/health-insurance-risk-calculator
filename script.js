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
                resultDiv.innerHTML = `Risk Score: ${data.riskScore}`;
            } else {
                resultDiv.innerHTML = `Error: ${data.error}`;
            }
        } catch (error) {
            resultDiv.innerHTML = "Failed to connect to the server. Please try again.";
            console.error("Error:", error);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {

    // Height dropdown - Feet
    const feetDropdown = document.getElementById("heightFeet");
    for (let i = 2; i <= 8; i++) {  // Minimum height is 2 feet
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " ft";
        feetDropdown.appendChild(option);
    }

    // Height dropdown - Inches
    const inchesDropdown = document.getElementById("heightInches");
    for (let i = 0; i <= 11; i++) {  // Inches from 0 to 11
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " in";
        inchesDropdown.appendChild(option);
    }

    // Weight dropdown (example: 50 to 300 lbs)
    const weightDropdown = document.getElementById("weight");
    for (let i = 50; i <= 300; i += 5) {  // Increment by 5 pounds
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " lbs";
        weightDropdown.appendChild(option);
    }

    // Age dropdown (Minimum age = 1)
    const ageDropdown = document.getElementById("age");
    for (let i = 1; i <= 100; i++) {  // Age range from 1 to 100
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " years";
        ageDropdown.appendChild(option);
    }

    // Blood Pressure dropdown
    const bloodPressureDropdown = document.getElementById("bloodPressure");
    const bloodPressureOptions = ["Normal", "Prehypertension", "Hypertension Stage 1", "Hypertension Stage 2"];
    bloodPressureOptions.forEach(function(optionText) {
        let option = document.createElement("option");
        option.value = optionText;
        option.text = optionText;
        bloodPressureDropdown.appendChild(option);
    });

    // Add event listener for the submit button (does nothing for now)
    document.getElementById("submitButton").addEventListener("click", function() {
        // Get selected values
        const age = document.getElementById("age").value;
        const heightFeet = document.getElementById("heightFeet").value;
        const heightInches = document.getElementById("heightInches").value;
        const weight = document.getElementById("weight").value;
        const bloodPressure = document.getElementById("bloodPressure").value;
        const familyDisease = Array.from(document.getElementById("familyDisease").selectedOptions)
            .map(option => option.value)
            .join(", ");

        // Display the selected values in the summary
        document.getElementById("summaryAge").textContent = "Age: " + age;
        document.getElementById("summaryHeight").textContent = "Height: " + heightFeet + " ft " + heightInches + " in";
        document.getElementById("summaryWeight").textContent = "Weight: " + weight + " lbs";
        document.getElementById("summaryBloodPressure").textContent = "Blood Pressure: " + bloodPressure;
        document.getElementById("summaryFamilyDisease").textContent = "Family Disease(s): " + (familyDisease ? familyDisease : "None selected");

        // Remove the BMI-related information
        document.getElementById("summaryBMI").textContent = "BMI: N/A"; // No BMI calculation anymore

        // Optionally, you can also display the risk score or calculation here
        alert("Values selected:\n" + 
              "Age: " + age + "\n" +
              "Height: " + heightFeet + " ft " + heightInches + " in\n" +
              "Weight: " + weight + " lbs\n" +
              "Blood Pressure: " + bloodPressure + "\n" +
              "Family Disease(s): " + familyDisease + "\n" +
              "BMI: N/A"); // No BMI displayed for now
    });

});
