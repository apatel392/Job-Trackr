import { useContext } from 'react';
import ThemeContext from '../context/themesContext'; // ✅ default import

const UseTheme = () => useContext(ThemeContext);
export default UseTheme;