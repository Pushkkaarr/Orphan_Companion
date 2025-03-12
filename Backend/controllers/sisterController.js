// File: Backend/controllers/sisterController.js
const axios = require('axios');

exports.generateSisterResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_SISTER_API_KEY;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Construct the request payload according to the Gemini API format
    const payload = {
      contents: [
        {
          parts: [
            {
              text: message
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ]
    };

    // Make direct API call to the sister model
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/tunedModels/ridhika-ln2haogwrym5:generateContent?key=${apiKey}`,
      payload
    );

    // Extract the generated text from the response
    const generatedText = response.data.candidates[0].content.parts[0].text;

    // Return the response
    res.status(200).json({
      response: generatedText
    });

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.response?.data || error.message
    });
  }
};