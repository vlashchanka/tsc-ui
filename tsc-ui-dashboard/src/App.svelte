<!-- App.svelte -->
<script>
    import Sidebar from './Sidebar.svelte';
    import {onMount} from 'svelte';
    import ProjectStatus from "./ProjectStatus.svelte";
    import Diagnostics from "./Diagnostics.svelte";
    import Navbar from "./Navbar.svelte";
    import { status } from './store';

    onMount(() => {
        const id = window.setInterval(status.getStatus, 500);
        status.getStatus();
        return () => {
            window.clearInterval(id);
        };
    });
</script>

<Navbar />

<div class="flex flex-col md:flex-row">
    <Sidebar />
    <Diagnostics />
    <ProjectStatus />
</div>

