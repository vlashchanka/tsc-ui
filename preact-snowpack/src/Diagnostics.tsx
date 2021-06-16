import { h } from 'preact';
import { Navigation, useStore } from "./store/store";

function Diagnostics() {
    const {messages, navigation} = useStore('messages', 'navigation');
    if (navigation !== Navigation.Diagnostics) {
        return null;
    }
    return (
        <div class={"main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"}>
            <div class="bg-gray-800 pt-3">
                <div class="rounded-tl-3xl bg-gradient-to-r from-green-500 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 class="font-bold pl-2">Diagnostics</h3>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-200 table-auto">
                                <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        File Name / Error
                                    </th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Code
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                {
                                    messages.map(({fileName, code, error}) => {
                                        return (<tr>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-green-900">
                                                    <a href={`vscode://file/${fileName}`}>{fileName}</a>
                                                </div>
                                                <div class="text-sm text-pink-700 max-w-full errorCode">{error}</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  <a target="_blank" href="https://www.google.com/search?q=typescript+error+code+TS{code}">{code}</a>
                </span>
                                            </td>
                                        </tr>)
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diagnostics;
