async function getSection(section) {
  const leven = (await import("leven")).default;

  const about = require("./Information/about");
  const contact = require("./Information/contact");
  const home = require("./Information/home");
  const portfolio = require("./Information/portfolio");
  const resume = require("./Information/resume");

  const sectionsMap = {
    about,
    contact,
    home,
    portfolio,
    resume,
  };

  const list_sections = Object.keys(sectionsMap);

  const similarities = list_sections.map((s) => ({
    section: s,
    similarity: 1 - leven(section, s) / Math.max(section.length, s.length),
  }));

  const bestMatch = similarities.reduce((max, current) =>
    current.similarity > max.similarity ? current : max
  );

  const selectedSection = sectionsMap[bestMatch.section];

  if (typeof selectedSection === "function") {
    return selectedSection();
  }

  return selectedSection.toString
    ? selectedSection.toString()
    : String(selectedSection);
}

module.exports = getSection;
