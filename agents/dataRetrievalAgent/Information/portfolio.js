function portfolio() {
  const prompt = `
    -Section : 'Portfolio'

Projects : 

1) - name : Tunisian derja ASR model: 
-details : The ASR Model for Tunisian Derja Dialect focuses on building a speech recognition system tailored to the Tunisian Derja dialect, incorporating local linguistic features and bilingual elements (French and English). It uses a custom KenLM language model, supports dynamic resampling for various audio frequencies, and enables real-time transcription. The model processes and segments audio, applies dialect-specific detection, and outputs accurate transcriptions, advancing ASR capabilities for regional languages. Referencing Salah Zaiem (PhD Candidate): zaiemsalah@gmail.com for his amazing work on this matter.
-Technologies: Python, ASR, NLP

2) - name :  Automatic Parking Garage Door with Facial Recognition:
-details : Designed a system combining AI and electronics for garage doors. (an academic project at the start of omar's AI journey combining arduino electronics with python APIs)
Technologies: Python, Facial Recognition, Arduino, IoT

3) - name :  Tunisian ID Card OCR System: Built an OCR system for Tunisian ID cards using Flutter and Python.
-details : The Tunisian ID Card OCR System integrates AI into a mobile app using Optical Character Recognition (OCR) to scan and extract data from Tunisian ID cards. Built with Flutter, the app captures an image of the ID card, sends it to a Python-based OCR API for text extraction, and returns the extracted data for display or further processing. The project involves image pre-processing, OCR text extraction using an Arabic OCR engine, and real-time data transfer between the app and API. It demonstrates the practical application of AI in automating identity verification and administrative tasks.
-Technologies: Python, OCR, Flutter

4) - name :  SynAI Writing Assistant: Developed a writing assistant extension for Google Docs using LLMs.
-details : 
SynAI enhances the writing process by integrating directly with Google Docs, allowing users to generate ideas, rephrase text, and find synonyms without leaving the document. It provides automatic suggestions triggered by text selection, streamlining the workflow and improving productivity. SynAI uses adaptive learning, analyzing user history to refine content suggestions over time, making the tool increasingly personalized and efficient. This project highlights the potential of AI to improve real-time writing and collaboration.
-Technologies: JavaScript for google docs, HTML, CSS, Python, LLM

Instruction : Add cards to your response for the projects tackled and talked about.
`;
  return prompt;
}
module.exports = portfolio;
