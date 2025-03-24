document.addEventListener("DOMContentLoaded", function () {
    // Populate height dropdowns
    const feetDropdown = document.getElementById("heightFeet");
    for (let i = 2; i <= 8; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " ft";
        feetDropdown.appendChild(option);
    }

    const inchesDropdown = document.getElementById("heightInches");
    for (let i = 0; i <= 11; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " in";
        inchesDropdown.appendChild(option);
    }

    // Populate weight dropdown
    const weightDropdown = document.getElementById("weight");
    for (let i = 10; i <= 300; i += 5) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " lbs";
        weightDropdown.appendChild(option);
    }

    // Populate age dropdown
    const ageDropdown = document.getElementById("age");
    for (let i = 1; i <= 120; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " years";
        ageDropdown.appendChild(option);
    }

    // Populate blood pressure dropdown
    const bloodPressureDropdown = document.getElementById("bloodPressure");
    const bloodPressureOptions = {
        "normal": "Normal",
        "elevated": "Prehypertension",
        "stage-1": "Hypertension Stage 1",
        "stage-2": "Hypertension Stage 2",
        "crisis": "Hypertensive Crisis"
    };

    Object.keys(bloodPressureOptions).forEach(function (key) {
        let option = document.createElement("option");
        option.value = key;
        option.text = bloodPressureOptions[key];
        bloodPressureDropdown.appendChild(option);
    });

    // Handle submit button click
    document.getElementById("submitButton").addEventListener("click", function () {
        // Get user input
        const feet = feetDropdown.value;
        const inches = inchesDropdown.value;
        const weightLbs = weightDropdown.value;
        const age = ageDropdown.value;
        const bloodPressure = bloodPressureDropdown.value;
        const familyDisease = Array.from(document.getElementById("familyDisease").selectedOptions)
            .map(option => option.value)
            .join(",");

        console.log("Inputs:", { feet, inches, weightLbs, age, bloodPressure, familyDisease });

        // Validate input
        if (!feet || !inches || !weightLbs || !age) {
            document.getElementById("insurabilityScore").textContent = "Score: Error";
            document.getElementById("riskLevel").textContent = "Risk Level: Please fill in all required fields";
            document.getElementById("summaryBMI").textContent = "BMI: N/A";
            return;
        }

        // Reset results
        document.getElementById("summaryBMI").textContent = "BMI: Calculating...";
        document.getElementById("insurabilityScore").textContent = "Score: Calculating...";
        document.getElementById("riskLevel").textContent = "Risk Level: Calculating...";

        // API call to fetch BMI first
        const bmiUrl = `https://health-insurance-risk-calculator-api.azurewebsites.net/calculate-bmi?height_feet=${feet}&height_inches=${inches}&weight_pounds=${weightLbs}`;
        fetch(bmiUrl)
            .then(response => response.json())
            .then(bmiData => {
                if (!bmiData.bmi) throw new Error("Invalid BMI response");
                document.getElementById("summaryBMI").textContent = `BMI: ${bmiData.bmi}`;
                
                // Now call risk API using the BMI result
                const riskUrl = `https://health-insurance-risk-calculator-api.azurewebsites.net/score-risk?age=${age}&bmi=${bmiData.bmi}&bp=${bloodPressure}&fd=${familyDisease}`;
                return fetch(riskUrl);
            })
            .then(response => response.json())
            .then(riskData => {
                if (!riskData.riskScore) throw new Error("Invalid risk score response");
                document.getElementById("insurabilityScore").textContent = `Score: ${riskData.riskScore}`;

                let riskLevel = "High Risk";
                const score = parseFloat(riskData.riskScore);
                if (score <= 20) riskLevel = "Low Risk";
                else if (score <= 50) riskLevel = "Moderate Risk";

                document.getElementById("riskLevel").textContent = `Risk Level: ${riskLevel}`;
            })
            .catch(error => {
                document.getElementById("insurabilityScore").textContent = "Score: Error";
                document.getElementById("riskLevel").textContent = "Risk Level: Error";
                console.error("Risk API Error:", error);
            });
    });
});
