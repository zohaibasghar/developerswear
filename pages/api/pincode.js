export default function handler(req, res) {
  try {
    let pincodes = {
      123456: ["Lahore", "Punjab"],
      121212: ["Faisalabad", "Punjab"],
      343434: ["Peshawar", "KPK"],
      565656: ["Karachi", "Sindh"],
      112233: ["Haiderabad", "Sindh"],
    };

    res.status(200).json(pincodes);
  } catch (error) {
    res.status(400).json({ error });
  }
}
