function resume() {
  const prompt = `
- Section : 'resume'

**Work Experience**

**04/2024 - Present**  
**AI Engineer at EmyeHR**  
- Optimized integration between chat agents and the Emye bot for improved prompt quality and cost efficiency.  
- Fine-tuned GPT-3.5 for efficient SQL generation tailored to company data.  
- Developed an automatic synthetic data generation program using GPT.  
- Built benchmarking systems to evaluate agent performance and visualize results.  
- Conducted R&D on AI-driven systems to predict employee behavioral trends and resignation, using machine learning customized for client data.  

**07/2023 - 09/2023**  
**Machine Learning Engineering Intern at Influence Consulting**  
- Developed an automatic speech recognition (ASR) model fine-tuned for the Tunisian dialect.  
- Created a dataset of 1,000+ transcriptions and 1+ hour of recordings, utilizing tools like NumPy, OpenCV, and TensorFlow.  
- Built the infrastructure of the project's web platform using Terraform, AWS, Docker, and DevOps tools like Bitbucket.  

**06/2023 - 08/2023**  
**Mobile Development Intern at Tnker**  
- Developed a Flutter-based mobile app prototype for voice calling, handling 4 servers simultaneously.  
- Integrated the voice calling feature into the final product app.  

**Education**

**2019 - 2024**  
**Diploma in Industrial Computing and Automation Engineering, specializing in Data Science**

**2013 – 2018**
**at British council, Tunis, Tunisia**
- Degree: First Certificate in English (FCE) with a C1 level in English`;

  return prompt;
}

module.exports = resume;
