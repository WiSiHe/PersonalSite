import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function OTPFormV3() {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""))

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target
    if (value !== "") {
      if (index !== 3) {
        document.getElementById(`otp_${index + 1}`)?.focus()
      }
    }
    setOtp([...otp.map((d, idx) => (idx === index ? value : d))])
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="p-10 bg-white rounded shadow-xl">
          <h1 className="mb-2 text-3xl font-bold text-center">Enter OTP</h1>
          <div className="flex justify-center gap-2">
            {otp.map((data, index) => {
              return (
                <motion.input
                  key={index}
                  type="tel"
                  name={`otp_${index}`}
                  id={`otp_${index}`}
                  maxLength={1}
                  className="w-12 h-12 text-2xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  aria-label={`OTP digit ${index + 1}`}
                  aria-describedby={`otp_${index}_description`}
                />
              )
            })}
          </div>
          <div className="mt-4 text-center">
            <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Verify OTP
            </button>
          </div>
          <div className="sr-only">
            <p id="otp_0_description">First digit of OTP</p>
            <p id="otp_1_description">Second digit of OTP</p>
            <p id="otp_2_description">Third digit of OTP</p>
            <p id="otp_3_description">Fourth digit of OTP</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
