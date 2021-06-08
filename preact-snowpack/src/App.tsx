import {h} from 'preact';
import {useEffect} from 'preact/hooks';
import './App.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Diagnostics from "./Diagnostics";
import ProjectStatus from "./ProjectStatus";
import {useStore} from "./store/store";

function App() {
    const {dispatch} = useStore('messages');
    useEffect(() => {
        dispatch('load');
    }, []);
    return (
        <div>
            <Navbar/>

            <div class="flex flex-col md:flex-row">
                <Sidebar/>
                <Diagnostics />
                <ProjectStatus/>
            </div>

        </div>
    );
}

export default App;
