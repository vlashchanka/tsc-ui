import * as os from 'os';
import * as path from 'path';
import * as ts from 'typescript';
import { createServerForDashboard } from './server';


const args = process.argv.slice(2);
const parsedArgs = parseArgs(args);

function parseArgs(args: string[]): {config?: string, port?: string} {
    const options: object = {};
    for (const raw of args) {
        const [key,value] = raw.split('=');
        const normalizedKey = key.replace('--', '').replace('-', '');
        options[normalizedKey] = value;
    }
    return options;
}

const diagnosticsQueue: Message[] = [];
const port = parseInt(parsedArgs.port) || 3000;
const configPath = parsedArgs.config || './tsconfig.json'; // let's take local by default
const realPathOfConfig = path.resolve(configPath)
const tsConfigDirName = getProjectName(realPathOfConfig);
const templateVariables = [
    ['user', os.userInfo().username],
    ['project', tsConfigDirName],
] as ReadonlyArray<[string, string]>;
const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine
};
const createProgram = ts.createSemanticDiagnosticsBuilderProgram;


const host = ts.createWatchCompilerHost(
    realPathOfConfig,
    {
        ...getParsedTypescriptOptions() || {},
        ...{
            noEmit: true, // we shouldn't compile anything
        }
    },
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
);
overrideProgramCreatorWithQueueCleanup(host, diagnosticsQueue);

// Run compiler and dashboard service
ts.createWatchProgram(host);
createServerForDashboard<Message>(diagnosticsQueue, templateVariables, {
    port: port,
    configPath: realPathOfConfig,
});

function overrideProgramCreatorWithQueueCleanup(host: ts.WatchCompilerHost<ts.SemanticDiagnosticsBuilderProgram>, queue: Message[]) {
    const origCreateProgram = host.createProgram;
    host.createProgram = (rootNames: ReadonlyArray<string> | undefined, options, host, oldProgram) => {
        queue.length = 0;
        return origCreateProgram(rootNames, options, host, oldProgram);
    }
}

function reportDiagnostic(diagnostic: ts.Diagnostic): void {
    diagnosticsQueue.push({
        fileName: diagnostic.file?.fileName || '',
        error: ts.flattenDiagnosticMessageText( diagnostic.messageText, formatHost.getNewLine()),
        code: diagnostic.code,
    })
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic): void {
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

function getProjectName(configPath: string): string {
    try {
        return configPath.split("/").reverse()[1];
    } catch(e) {}
    return "Project"
}

function getParsedTypescriptOptions(): ts.ParsedCommandLine["options"] | null {
    try {
        return ts.parseCommandLine(ts.sys.args).options;
    } catch(e) {}
    return null
}
