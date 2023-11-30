import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="relative min-h-screen font-kanit flex items-center justify-center background-light dark:background-dark">
      <Navbar />
      <Form />
    </main>
  );
}

export default App;
