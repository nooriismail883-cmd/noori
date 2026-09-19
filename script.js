async function findIP() {
  const ip = document.getElementById("ipInput").value.trim();
  const result = document.getElementById("result");

  if (!ip) {
    result.innerHTML = "Please enter an IP address.";
    return;
  }

  result.innerHTML = "🔍 Searching...";

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`);
    const data = await response.json();

    if (!data.success) {
      result.innerHTML = "❌ IP address not found.";
      return;
    }

    result.innerHTML = `
      <strong>IP:</strong> ${data.ip}<br>
      <strong>Country:</strong> ${data.country}<br>
      <strong>City:</strong> ${data.city}<br>
      <strong>Region:</strong> ${data.region}<br>
      <strong>Postal Code:</strong> ${data.postal || "Unknown"}<br>
      <strong>Timezone:</strong> ${data.timezone?.id || "Unknown"}<br>
      <strong>ISP:</strong> ${data.connection?.isp || "Unknown"}
    `;
  } catch (error) {
    result.innerHTML = "❌ Something went wrong.";
    console.error(error);
  }
}
