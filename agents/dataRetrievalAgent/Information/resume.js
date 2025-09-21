function resume() {
  const prompt = `
- Section : 'resume'

**Work Experience**

**04/2025 - Present**  
**LLM & Full Stack Engineer at Navero LTD (Remote, United Kingdom - London)**  
- Developed pipelines leveraging Large Language Models (LLMs) for CV analysis, test generation, and document processing.  
- Engineered prompt design, tuning, and versioning, including LLM consumption tracking across services.  
- Designed and deployed background jobs and microservices using Python, RabbitMQ, and Redis.  
- Built and maintained databases and backend applications, integrating RESTful services and third-party APIs.  
- Developed user-centric front-end architectures with Next.js, TypeScript, Redux, and cloud infrastructure (GCP), ensuring scalable and performant solutions.  
- Automated repetitive workflows, boosting team productivity and reducing manual effort.  
- Oversaw testing, deployment, and optimization of full-stack features for speed, reliability, and seamless user experience.  

**03/2024 - 04/2025**  
**AI & Full Stack Engineer at EmyeHR (Tunisia)**  
- Automated HR workflows with Generative AI conversational agents, reducing manual effort and response times.  
- Fine-tuned GPT-3.5 models for efficient SQL query generation on company datasets.  
- Designed and optimized PostgreSQL databases, improving query performance and scalability.  
- Developed AI-powered web modules: Angular (UI) and Node.js (APIs and business logic).  
- Built synthetic data pipelines with LLMs and CUDA and created benchmarking systems with visualizations to support data-driven decisions.  
- Conducted predictive HR analytics R&D using scikit-learn, online and batch learning for employee behavior and attrition trends.  
- Delivered full SDLC ownership in agile teams, optimizing frontend and backend performance for scalable, reliable solutions.  

**06/2023 - 08/2023**  
**Machine Learning Intern at Influence Consulting (Tunisia)**  
- Developed an ASR model for the Tunisian dialect, reducing WER and CER by 10% compared to existing models.  
- Built and processed a dataset of 1000+ transcriptions, applying NumPy, OpenCV, and TensorFlow for preprocessing and optimization.  
- Implemented the project's web platform infrastructure using Terraform, AWS, Docker, and Bitbucket, enabling scalable deployment and efficient workflows.  

**06/2023 - 08/2023**  
**Mobile Development Intern at Tnker**  
- Developed a Flutter-based mobile app prototype for voice calling, handling 4 servers simultaneously.  
- Integrated the voice calling feature into the final product app.  

**Education**

**2019 - 2024**
** Graduate from the National Institute of Applied Science and Technology, Tunisia **
- Diploma in Industrial Computing and Automation Engineering, specializing in Data Science.

**2013 – 2018**
**at British council, Tunis, Tunisia**
- Degree: First Certificate in English (FCE) with a C1 level in English`;

  return prompt;
}

module.exports = resume;
