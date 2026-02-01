export default async function handler(req, res) {
  try {
    return res.status(200).json({
      hasKey: !!process.env.GEMINI_API_KEY,
      keyLength: process.env.GEMINI_API_KEY?.length || 0,
      node: process.version
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
