async function getSection(section) {
  const leven = (await import("leven")).default;

  const about = require("./Information/about");
  const contact = require("./Information/contact");
  const home = require("./Information/home");
  const portfolio = require("./Information/portfolio");
  const resume = require("./Information/resume");

  // Map of sections
  const sectionsMap = {
    about,
    contact,
    home,
    portfolio,
    resume,
  };

  const list_sections = Object.keys(sectionsMap);

  // Calculate similarity
  const similarities = list_sections.map((s) => ({
    section: s,
    similarity: 1 - leven(section, s) / Math.max(section.length, s.length), // Normalize distance
  }));

  // Get the best matching section
  const bestMatch = similarities.reduce((max, current) =>
    current.similarity > max.similarity ? current : max
  );

  // Ensure the returned section is in string format
  const selectedSection = sectionsMap[bestMatch.section];

  // If the section is a function, call it to get the string content
  if (typeof selectedSection === "function") {
    return selectedSection(); // Assuming the function returns a string
  }

  // If it's not a function, return it directly
  return selectedSection.toString
    ? selectedSection.toString()
    : String(selectedSection);
}

module.exports = getSection;
