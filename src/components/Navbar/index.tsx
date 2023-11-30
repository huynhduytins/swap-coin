import { FaFileWaveform } from 'react-icons/fa6'
import Mode from './Mode'

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between gap-5 px-5 py-4 fixed top-0 nav-light dark:nav-dark">
      <div className="flex items-center gap-1 min-w-[200px]">
        <FaFileWaveform className="text-primary-500 w-6 h-6 max-sm:hidden" />
        <p className="text-2xl text-dark-100 dark:text-light-900">
          Fancy <span className="text-primary-500">Form</span>
        </p>
      </div>
      <Mode />
    </nav>
  )
}

export default Navbar
