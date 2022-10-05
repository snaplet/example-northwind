import fetch from "node-fetch";

/**
 * @param {string} path
 */
export async function netlify(path, options) {
  const response = await fetch(`https://api.netlify.com/api/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Netlify API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}