import './App.css';
import ChatWindow from './components/Main/ChatWindow';
import Sidebar from './components/Main/Sidebar/Sidebar';

function App() {
  return (
    <div className="flex h-screen bg-white dark:bg-[#121212]">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default App;
