import axios from "axios";
const sendMail = async (receiverEmail) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/sendMail`, { receiverEmail })
    return res.data;
}
export default sendMail;