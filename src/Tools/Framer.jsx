import {motion} from 'framer-motion'

export default function Framer({children}) {
   
  return (
    <motion.div
    initial={{ opacity: 0, y:0}}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>

  )
}
