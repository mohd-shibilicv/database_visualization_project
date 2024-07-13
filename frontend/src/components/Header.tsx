import { Link } from "react-router-dom"
import { ModeToggle } from "./ModeToggle"
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const theme = useTheme().theme

  return (
    <div className="w-full flex justify-between items-center">
      <Link to="/" className="flex justify-center items-center gap-2">
        <img className="w-7 h-7" src={theme === "dark" ? `logo-light.svg` : `logo-dark.svg`} alt="THE LOGO" />
        <p className="text-black dark:text-white font-bold text-lg">LOGO</p>
      </Link>
      <ModeToggle />
    </div>
  )
}

export default Header