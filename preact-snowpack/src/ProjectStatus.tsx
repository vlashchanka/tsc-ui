import { h } from 'preact';
import {useStore} from "./store/store";

function ProjectStatus() {

  const { locationHash, messages, uniqueCodes, uniqueFiles, project } = useStore('locationHash', 'messages', 'uniqueCodes','uniqueFiles', 'project');
  const statusClass = locationHash !== '#' && locationHash !== '' ? 'hidden' : '';
  return (
      <div class={"main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5 " + statusClass}>

        <div class="bg-gray-800 pt-3">
          <div class="rounded-tl-3xl bg-gradient-to-r from-blue-500 to-gray-800 p-4 shadow text-2xl text-white">
            <h3 class="font-bold pl-2">{project}</h3>
          </div>
        </div>

        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded-full p-5 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-600">Files affected</h5>
                  <h3 class="font-bold text-3xl"><span>{uniqueFiles}</span> file(s)</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div class="bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500 rounded-lg shadow-xl p-5">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded-full p-5 bg-indigo-600"><i class="fas fa-tasks fa-2x fa-inverse"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-600">Diagnostics</h5>
                  <h3 class="font-bold text-3xl"><span>{messages.length}</span> problem(s)</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 xl:w-1/3 p-6">
            <div class="bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500 rounded-lg shadow-xl p-5">
              <div class="flex flex-row items-center">
                <div class="flex-shrink pr-4">
                  <div class="rounded-full p-5 bg-red-600"><i class="fas fa-exclamation-triangle fa-2x fa-inverse"></i></div>
                </div>
                <div class="flex-1 text-right md:text-center">
                  <h5 class="font-bold uppercase text-gray-600">Unique error codes</h5>
                  <h3 class="font-bold text-3xl">{uniqueCodes}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProjectStatus;
