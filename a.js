const API_KEY = 'L09VYBcwpllrBCAp7eaBNMoBzp7fVS3j37foKdi5';

const promptInput = document.getElementById("promptInput")
const generateBtn = document.getElementById("generateBtn")
const stopBtn = document.getElementById("stopBtn")
const resultText = document.getElementById("resultText")
const textsm = document.querySelector(".text-sm")
const copyBtn = document.querySelector(".btn")
const icon = document.querySelector("#faicon")

const generate = async () => {
  if (promptInput.value) {
    textsm.innerText = "Searching for the most delicious recepies..."
    textsm.style = `
      font-size: 0.875rem;
  color: #777;
  font-weight: bold;
  position: relative;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2s linear infinite;
    `
  }
  const response = await fetch('https://api.cohere.ai/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'command-xlarge-nightly',
      prompt: `Give me best recipe for ${promptInput.value}`,
      max_tokens: 900,
    }),
  });
  const data = await response.json();
  // let index = 0;
  if (data.text) {
    resultText.innerText = data.text
    resultText.style.fontFamily = "Lucida Sans"
    resultText.style.userSelect = "all"
    console.log(data.text);
    promptInput.value = ""
    textsm.innerText = "Here you are.. Bon Appétit!"
    textsm.style = ""

    copyBtn.addEventListener("click", () => {
      const textToCopy = resultText.innerText;

      // Create a temporary textarea element
      const tempTextarea = document.createElement("textarea");
      document.body.appendChild(tempTextarea);

      // Set the text content to the textarea
      tempTextarea.value = textToCopy;
      resultText.select();
      resultText.setSelectionRange(0, 99999)
      // navigator.clipboard.writeText(resultText);
      icon.setAttribute
    })
  } else {
    console.log("loading");
  }



};

promptInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    generate();
  }
});

generateBtn.addEventListener("click", generate);

// L09VYBcwpllrBCAp7eaBNMoBzp7fVS3j37foKdi5