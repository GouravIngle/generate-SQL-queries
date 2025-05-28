const form = document.getElementById("sql-form");
const output = document.getElementById("output");

form.onsubmit = async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value;

  const res = await fetch("/generate-sql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  output.textContent = data.query || data.error || "❌ Error generating query";
};

document.getElementById("copybtn").addEventListener("click", function () {
  const output = document.getElementById("output").innerText;

  navigator.clipboard
    .writeText(output)
});
