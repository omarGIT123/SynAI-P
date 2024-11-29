function portfolio() {
  const prompt = `
    -Portfolio:

1) - name : Fine-tuning GPT-3.5 for SQL Generation: Tailored GPT-3.5 turbo for SQL query generation. 
-details : The SQL Synthetic Data Generation Pipeline automates the creation, validation, and storage of SQL query examples for training large language models like GPT and Llama-3, focusing on SQL comprehension. It uses GPT-4 to generate diverse SQL queries, executes them on PostgreSQL, validates results with OpenAI's API, and stores them in JSONL format for easy integration into training datasets. This pipeline significantly accelerates the production of high-quality SQL data, improving model training efficiency and scalability.

The Automated Benchmarking of GPT Models for SQL Generation project introduces a framework that automates the generation, execution, and evaluation of SQL queries from GPT models. It uses a comprehensive scoring system to assess accuracy, format, and performance, while automatically tuning model parameters for optimal results. This system drastically reduces manual effort, continuously improves model performance, and provides detailed insights, setting a new standard for evaluating GPT models in SQL tasks.
Technologies: Python, GPT, Azure Studio, SQL

2) - name : Behavioral Machine Learning Project: Developed a model to detect employee engagement.
-details : The AI Behavior Model Data Transformation project converts transactional data into actionable insights, improving enterprise decision-making and employee engagement tracking. It features a real-time alert system to identify at-risk employees, progressive learning to refine predictions, and a workflow that transforms raw data into trends, detects behavioral risks, and generates alerts. This system enhances workforce management by providing proactive retention strategies and continuous model updates based on new data.
-Technologies: Python, Machine Learning, Online Learning

3) - name : Tunisian ASR Model: developed and enhanced an ASR model for Tunisian Derja.
-details : The ASR Model for Tunisian Derja Dialect focuses on building a speech recognition system tailored to the Tunisian Derja dialect, incorporating local linguistic features and bilingual elements (French and English). It uses a custom KenLM language model, supports dynamic resampling for various audio frequencies, and enables real-time transcription. The model processes and segments audio, applies dialect-specific detection, and outputs accurate transcriptions, advancing ASR capabilities for regional languages. Referencing Salah Zaiem (PhD Candidate): zaiemsalah@gmail.com for his amazing work on this matter.
-Technologies: Python, ASR, NLP

4) - name :  Automatic Parking Garage Door with Facial Recognition: Designed a system combining AI and electronics for garage doors. (an academic project at the start of omar's AI journey combining arduino electronics with python APIs)
Technologies: Python, Facial Recognition, Arduino, IoT

5) - name :  Tunisian ID Card OCR System: Built an OCR system for Tunisian ID cards using Flutter and Python.
-details : The Tunisian ID Card OCR System integrates AI into a mobile app using Optical Character Recognition (OCR) to scan and extract data from Tunisian ID cards. Built with Flutter, the app captures an image of the ID card, sends it to a Python-based OCR API for text extraction, and returns the extracted data for display or further processing. The project involves image pre-processing, OCR text extraction using an Arabic OCR engine, and real-time data transfer between the app and API. It demonstrates the practical application of AI in automating identity verification and administrative tasks.
-Technologies: Python, OCR, Flutter

6) - name :  SynAI Writing Assistant: Developed a writing assistant extension for Google Docs using LLMs.
-details : 
SynAI enhances the writing process by integrating directly with Google Docs, allowing users to generate ideas, rephrase text, and find synonyms without leaving the document. It provides automatic suggestions triggered by text selection, streamlining the workflow and improving productivity. SynAI uses adaptive learning, analyzing user history to refine content suggestions over time, making the tool increasingly personalized and efficient. This project highlights the potential of AI to improve real-time writing and collaboration.
-Technologies: TypeScript, HTML, CSS, Python, LLM

Instruction : Add cards to your response for the projects tackled and talked about.
`;
  return prompt;
}
module.exports = portfolio;
