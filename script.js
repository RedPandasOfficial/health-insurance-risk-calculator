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

    // Weight dropdown
    const weightDropdown = document.getElementById("weight");
    for (let i = 10; i <= 300; i += 5) {  // Increment by 5 pounds
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " lbs";
        weightDropdown.appendChild(option);
    }

    // Age dropdown
    const ageDropdown = document.getElementById("age");
    for (let i = 1; i <= 120; i++) {  // Age range from 1 to 120
        let option = document.createElement("option");
        option.value = i;
        option.text = i + " years";
        ageDropdown.appendChild(option);
    }

    // Blood Pressure dropdown (matching API)
    const bloodPressureDropdown = document.getElementById("bloodPressure");
    const bloodPressureOptions = {
        "normal": "Normal",
        "elevated": "Prehypertension",
        "stage-1": "Hypertension Stage 1",
        "stage-2": "Hypertension Stage 2",
        "crisis": "Hypertensive Crisis"
    };
    Object.keys(bloodPressureOptions).forEach(function(key) {
        let option = document.createElement("option");
        option.value = key;
        option.text = bloodPressureOptions[key];
        bloodPressureDropdown.appendChild(option);
    });

    // No functionality for the submit button
    // Removed event listener for submit button since no action is needed
    // Fetch the /ping endpoint when the page loads
    window.onload = function() {
        fetch('https://health-insurance-risk-calculator-api.azurewebsites.net/ping')  // Update with your actual API URL if needed
          .then(response => response.json())
          .then(data => {
            console.log('Ping API Response:', data);
            // Optionally handle success (e.g., update UI or log the data)
          })
          .catch(error => {
            console.error('Error:', error);
            // Optionally handle error (e.g., show an error message)
          });
      };
});
