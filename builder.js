let currentStep = 1;
const totalSteps = 9;

function showStep(step) {
  for (let i = 1; i <= totalSteps; i++) {
    const stepDiv = document.getElementById(`step${i}`);
    if (stepDiv) {
      stepDiv.classList.remove("active");
    }
  }
  const newStep = document.getElementById(`step${step}`);
  if (newStep) {
    newStep.classList.add("active");
  }
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  } else {
    saveData(); // Final step - save and redirect
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// ✅ Get dynamic work experience entries
function getWorkExperiences() {
  const entries = document.querySelectorAll("#experience-container .experience-entry");
  const experiences = [];

  entries.forEach(entry => {
    const title = entry.querySelector(".job-title")?.value || "";
    const company = entry.querySelector(".company-name")?.value || "";
    const duration = entry.querySelector(".duration")?.value || "";
    const description = entry.querySelector(".job-desc")?.value || "";

    if (title || company || duration || description) {
      experiences.push({ title, company, duration, description });
    }
  });

  return experiences;
}

// ✅ Get dynamic language entries
function getLanguages() {
  const entries = document.querySelectorAll("#languages-container .language-entry");
  const languages = [];

  entries.forEach(entry => {
    const language = entry.querySelector('input[name="language[]"]')?.value.trim() || "";
    const level = entry.querySelector('select[name="level[]"]')?.value.trim() || "";

    if (language || level) {
      languages.push({ language, level });
    }
  });

  return languages;
}

// ✅ Add dynamic language entry
function addLanguage() {
  const container = document.getElementById("languages-container");
  const entry = document.createElement("div");
  entry.className = "language-entry";
  entry.innerHTML = `
    <input type="text" name="language[]" placeholder="Language (e.g., Spanish)" />
    <select name="level[]">
      <option value="">Select Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
      <option value="Fluent">Fluent</option>
      <option value="Native">Native</option>
    </select>
    <button type="button" onclick="this.parentElement.remove()">Remove</button>
  `;
  container.appendChild(entry);
}

// ✅ Save all resume data to localStorage
function saveData() {
  const data = {
    fullName: document.getElementById("fullName")?.value || "",
    email: document.getElementById("email")?.value || "",
    phone: document.getElementById("phone")?.value || "",
    linkedin: document.getElementById("linkedin")?.value || "",
    location: document.getElementById("location")?.value || "",
    portfolio: document.getElementById("portfolio")?.value || "",
    summary: document.querySelector("#step2 textarea")?.value || "",
    skills: document.querySelector("#step3 textarea")?.value || "",
    experience: getWorkExperiences(),
    education: document.querySelector("#step5 textarea")?.value || "",
    certifications: document.querySelector("#step6 textarea")?.value || "",
    projects: document.querySelector("#step7 textarea")?.value || "",
    languages: getLanguages()
  };

  localStorage.setItem("resumeData", JSON.stringify(data));

  const photoInput = document.getElementById("photo");
  if (photoInput && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("resumePhoto", e.target.result);
      window.location.href = "preview.html";
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    window.location.href = "preview.html";
  }
}

// ✅ Initialize page after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);

  // Handle skill button clicks to auto-fill skills textarea
  const skillButtons = document.querySelectorAll(".skill-btn");
  const skillTextarea = document.querySelector("#step3 textarea");

  skillButtons.forEach(button => {
    button.addEventListener("click", () => {
      button.classList.toggle("selected");

      const selectedSkills = Array.from(skillButtons)
        .filter(btn => btn.classList.contains("selected"))
        .map(btn => btn.textContent.trim());

      skillTextarea.value = selectedSkills.join(", ");
    });
  });
});
