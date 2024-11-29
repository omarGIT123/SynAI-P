const tools = require("./tools");
const getSection = require("./tools");
async function dataRetrieval(sections) {
  const info = [];
  for (const sectionIndex in sections) {
    const section = sections[sectionIndex];
    data = await getSection(section);
    info.push({ section: section, information: data });
  }
  console.log(info);
  return info;
}

module.exports = dataRetrieval;
