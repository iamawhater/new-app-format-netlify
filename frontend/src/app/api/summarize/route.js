import axios from "axios";

export async function POST(req) {
  try {
    console.log("Received request to /api/summarize");

    const body = await req.json();
    console.log("Request body:", body);

    const backendResponse = await axios.post(
      "http://34.226.138.101/api/summarize",
      body
    );
    console.log("Backend response:", backendResponse.data);

    return new Response(JSON.stringify(backendResponse.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/summarize:", error);

    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}