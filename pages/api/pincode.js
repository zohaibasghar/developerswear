import pincodes from '@/pincodes.json'

export default function handler(req, res) {
  try {
    res.status(200).json(pincodes);
  } catch (error) {
    res.status(400).json({error})
  }
}
