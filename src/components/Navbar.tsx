import '../assets/styles/navbar.scss';
import logo from '../assets/img/logo.svg';

export default function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" />
      <h1>DATA HARGA IKAN DI INDONESIA</h1>
    </div>
  );
}
