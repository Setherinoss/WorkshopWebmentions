
const sourceUrl = "https://workshop-webmentions.vercel.app/blogpost1/"; 
const targetUrl = "https://webmention.io/webmention-client.vercel.app/webmention";


const webmentionEndpoint = `${targetUrl}?source=${encodeURIComponent(sourceUrl)}&target=${encodeURIComponent(targetUrl)}`;

async function sendWebmention() {
  try {
    const response = await fetch(webmentionEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      console.log("Webmention sent successfully!");
    } else {
      console.error("Failed to send webmention.", await response.text());
    }
  } catch (error) {
    console.error("Error while sending webmention:", error);
  }
}

sendWebmention();
