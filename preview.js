function downloadPDF() {
  const element = document.getElementById("resume");

  const options = {
    margin: 0.5,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(options).from(element).save();
}

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("resumeData"));
  const photo = localStorage.getItem("resumePhoto");

  if (!data) return;

  const setText = (id, text, containerId = null) => {
    const element = document.getElementById(id);
    const container = containerId ? document.getElementById(containerId) : element;
    if (text && text.trim() !== "") {
      element.textContent = text;
    } else {
      container.style.display = "none";
    }
  };

  // Basic Fields
  setText("output-name", data.fullName);
  setText("output-title", data.title, "output-title");
  setText("output-email", data.email, "email-section");
  setText("output-phone", data.phone, "phone-section");
  setText("output-linkedin", data.linkedin, "linkedin-section");
  setText("output-location", data.location, "location-section");
  setText("output-portfolio", data.portfolio, "portfolio-section");
  setText("output-about", data.summary, "about-section");
  setText("output-education", data.education, "education-section");
  setText("output-certifications", data.certifications, "certifications-section");
  setText("output-projects", data.projects, "projects-section");
  setText("output-interests", data.interests, "interests-section");

  // Photo
  const photoElement = document.getElementById("output-photo");
  if (photo) {
    photoElement.src = photo;
  } else {
    photoElement.style.display = "none";
  }

  // Skills
  const skillsList = document.getElementById("output-skills");
  const skillsSection = document.getElementById("skills-section");
  skillsList.innerHTML = "";
  if (data.skills && data.skills.trim() !== "") {
    const skills = data.skills.split(",").map(s => s.trim()).filter(Boolean);
    if (skills.length > 0) {
      skills.forEach(skill => {
        const li = document.createElement("li");
        li.textContent = skill;
        skillsList.appendChild(li);
      });
    } else {
      skillsSection.style.display = "none";
    }
  } else {
    skillsSection.style.display = "none";
  }

  // Languages
  const languageList = document.getElementById("output-languages");
  const languagesSection = document.getElementById("languages-section");
  languageList.innerHTML = "";
  if (Array.isArray(data.languages) && data.languages.length > 0) {
    data.languages.forEach(lang => {
      const li = document.createElement("li");
      li.textContent = `${lang.language} (${lang.level})`;
      languageList.appendChild(li);
    });
  } else {
    languagesSection.style.display = "none";
  }

  // Experience
  const experienceList = document.getElementById("output-experience");
  const experienceSection = document.getElementById("experience-section");
  experienceList.innerHTML = "";
  if (Array.isArray(data.experience) && data.experience.length > 0) {
    data.experience.forEach(exp => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${exp.title || ""}</strong> at <em>${exp.company || ""}</em><br/>
        <span>${exp.duration || ""}</span><br/>
        <p>${exp.description || ""}</p>
      `;
      experienceList.appendChild(li);
    });
  } else {
    experienceSection.style.display = "none";
  }
});
