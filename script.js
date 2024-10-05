// Select output elements 
const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");
const submit_btn = document.querySelector(".submit-btn");

// Input elements
const input_year = document.querySelector("#year");
const input_day = document.querySelector("#day");
const input_month = document.querySelector("#month");

// Error elements
const error_day = document.querySelector(".error-day");
const error_month = document.querySelector(".error-month");
const error_year = document.querySelector(".error-year");

// Span elements for coloring
const span_day = document.querySelector(".span-day");
const span_month = document.querySelector(".span-month");
const span_year = document.querySelector(".span-year");

let isValid = false;

// Validate input fields
function validateInput(input, errorElement, maxValue, errorMessage, spanElement) {
    const value = +input.value;

    if (value < 0) {
        setError(input, errorElement, spanElement, "Must be a valid number");
    } else if (value > maxValue) {
        setError(input, errorElement, spanElement, errorMessage);
    } else if (value === 0) {
        setError(input, errorElement, spanElement, "This field is required");
    } else {
        clearError(input, errorElement, spanElement);
    }
}

// Set error message and style
function setError(input, errorElement, spanElement, message) {
    errorElement.textContent = message;
    input.classList.add("input-error");
    spanElement.classList.add("input-error-span");
    isValid = false;
}

// Clear error message and style
function clearError(input, errorElement, spanElement) {
    errorElement.textContent = "";
    input.classList.remove("input-error");
    spanElement.classList.remove("input-error-span");
    isValid = true;
}

// Check if the day is valid for the given month and year
function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Event listeners for input validation
input_day.addEventListener("input", () => {
    validateInput(input_day, error_day, 31, "Must be a valid day", span_day);
});
input_month.addEventListener("input", () => {
    validateInput(input_month, error_month, 12, "Must be a valid month", span_month);
});
input_year.addEventListener("input", () => {
    const year = +input_year.value;

    if (year < 1900) {
        setError(input_year, error_year, span_year, "Must be between 1900 and 2024");
    } else if (year > 2024) {
        setError(input_year, error_year, span_year, "Must be in the past");
    } else if (year === 0) {
        setError(input_year, error_year, span_year, "This field is required");
    } else {
        clearError(input_year, error_year, span_year);
    }
});

// Calculate and display the date
function calculateDate() {
    const day = +input_day.value;
    const month = +input_month.value;
    const year = +input_year.value;

    if (isValid && isValidDate(day, month, year)) {
        const birthday = `${month}/${day}/${year}`;
        const birthdayObj = new Date(birthday);
        const ageDiffMill = Date.now() - birthdayObj;
        const ageDate = new Date(ageDiffMill);

        const ageYears = ageDate.getUTCFullYear() - 1970;
        const ageMonths = ageDate.getUTCMonth();
        const ageDays = ageDate.getUTCDate();

        // Display the results
        output_day.textContent = ageDays;
        output_month.textContent = ageMonths;
        output_year.textContent = ageYears;
    } else {
        // Error handling if the date is invalid
        setError(input_day, error_day, span_day, "Must be a valid date");
    }
}

// Submit button event listener
submit_btn.addEventListener("click", calculateDate);
