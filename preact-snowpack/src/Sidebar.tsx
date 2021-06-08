import { h } from 'preact';

function Sidebar() {
  const isDiagnostics = true;
  const isHome = true;
  const diagnosticsClass = isDiagnostics ? 'text-white' : 'text-gray-600';
  const homeClass = isHome ? 'text-white' : 'text-gray-600';
  return (
      <div class="bg-gray-800 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
        <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li class="mr-3 flex-1">
              <a href="#diagnostics" class="block py-1 md:py-3 pl-1 align-middle text-green-600 no-underline border-b-2 border-gray-800 hover:border-green-500">
                <i class="fa fa-envelope pr-0 md:pr-3"></i>
                <span
                    class={"pb-1 md:pb-0 text-xs md:text-base text-gray-600 block md:inline-block " + diagnosticsClass}>
                        Diagnostics
                    </span>
              </a>
            </li>
            <li class="mr-3 flex-1">
              <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-500">
                <i class="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i>
                <span
                    class={"pb-1 md:pb-0 text-xs md:text-base text-gray-600 block md:inline-block " + homeClass}>
                        Status
                    </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
  );
}

export default Sidebar;
