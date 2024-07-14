import { Link } from "react-router-dom"
import { ModeToggle } from "./ModeToggle"
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const theme = useTheme().theme

  return (
    <div className="w-full flex justify-between items-center">
      <Link to="/" className="flex justify-center items-center gap-2">
        <img className="w-7 h-7" src={theme === "dark" ? `logo-light.svg` : `logo-dark.svg`} alt="THE LOGO" />
        <p className="text-black dark:text-white font-bold text-xl">LOGO</p>
      </Link>
      <div className="flex items-center justify-center gap-3">
        <Link to="/table" className="px-2 py-2.5 text-xs sm:text-sm font-semibold rounded border border-gray-200 hover:border-gray-500 dark:border-gray-800 hover:dark:border-gray-500 hover:border-dashed">View Data Table</Link>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header