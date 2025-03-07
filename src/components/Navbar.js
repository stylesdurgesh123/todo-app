import { useState, useEffect } from "react";
import {
  Search,
  Grid,
  Sun,
  Moon,
  List,
  X,
  Plus,
  Bell,
  Calendar,
  ArrowRepeat,
  Trash,
  Cart
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Theme toggle function
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        } shadow`}>
        <div className="container-fluid">
          {/* Logo & Title */}
          <a className="navbar-brand d-flex align-items-center" href="/">
          <div className="p-2 rounded">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/024/382/921/small_2x/gradient-green-check-mark-icon-symbol-logo-in-a-circle-tick-symbol-green-color-transparent-free-png.png"
                alt="logo"
                width="40"
                height="30"
              />
            </div> 

            <span className="ms-2 text-success fw-bold fs-5">DoIt</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-toggler p-2 rounded border-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={30} className="text-danger" />
            ) : (
              <List size={30} className="text-success" />
            )}
          </button>
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>
            <div className="ms-auto d-flex align-items-center gap-3">
              <Search size={20} />
              <Grid size={20} />

              {/* Dark Mode Toggle Button */}
              <button
                className="btn btn-outline-secondary"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay position-fixed"
          style={{
            zIndex: 1050,
            width: "300px",
            height: "calc(100vh - 40px)", 
            backgroundColor: "#EEF6EF",
            top: "20px",
            right: "20px",
            borderRadius: "8px",
            overflowY: "auto"
          }}
        >
          <div className="p-3">
            <ul className="list-group">
              <li className="list-group-item d-flex align-items-center mb-2">
                <Cart size={20} className="me-2" />
                Buy groceries
              </li>
              <li className="list-group-item d-flex align-items-center mb-2">
                <Plus size={20} className="me-2" />
                Add step
              </li>
              <li className="list-group-item d-flex align-items-center mb-2">
                <Bell size={20} className="me-2" />
                Set Reminder
              </li>
              <li className="list-group-item d-flex flex-column align-items-start mb-2">
                <div
                  onClick={() => setShowCalendar(!showCalendar)}
                  style={{ cursor: "pointer" }}
                  className="d-flex align-items-center"
                >
                  <Calendar size={20} className="me-2" />
                  Add Due, Date
                </div>
                {showCalendar && (
                  <input type="date" className="form-control mt-2" />
                )}
              </li>
              <li className="list-group-item d-flex align-items-center mb-2">
                <ArrowRepeat size={20} className="me-2" />
                Repeat
              </li>
            </ul>
            <hr />
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-light"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
              <button className="btn btn-danger">
                <Trash size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
