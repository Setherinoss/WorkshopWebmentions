
const sourceUrl = "https://webmmention-workshop.vercel.app/"; 
const targetUrl = "https://webmention-client.vercel.app/blogpost1/";




async function getWebmentionEndpoint(target: string): Promise<string> {
  try {
    const response = await fetch(target, {
      method: "GET",
    });

    if (response.ok) {
      const endpoint = await response.text(); 
      console.log("Webmention endpoint retrieved:", endpoint);
      return endpoint;
    } else {
      console.error("Failed to retrieve webmention endpoint.", await response.text());
    }
  } catch (error) {
    console.error("Error while retrieving webmention endpoint:", error);
  }

  return ""; 
}

async function sendWebmention() {
  try {
    const webmentionEndpoint = await getWebmentionEndpoint(targetUrl);

    if (!webmentionEndpoint) {
      console.error("No endpoint available. Aborting webmention send.");
      return;
    }

    const endpointWithParams = `${webmentionEndpoint}?source=${encodeURIComponent(sourceUrl)}&target=${encodeURIComponent(targetUrl)}`;

    const response = await fetch(endpointWithParams, {
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

document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        console.log("Source URL:", sourceUrl);
        //sendWebmention(sourceUrl, targetUrl);
        const web_button = document.getElementById("send-webmention");       
        web_button?.addEventListener("click", async function(){
            console.log("Webmention button clicked");
            await sendWebmention();
        });
   
    })();    
})    
