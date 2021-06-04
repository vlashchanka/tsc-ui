import * as http from 'http';

import * as fs from 'fs';
import * as path from 'path';

type Variables = ReadonlyArray<[string, string]>;
interface ServerOptions {
    port: number,
    hostname?: string,
    configPath: string,
}

export function createServerForDashboard<T extends object>(messages:T[] = [], vars: Variables, options: ServerOptions) {
    const hostname = options.hostname || '127.0.0.1';
    const port = options.port || 3000;

    http.createServer((req, res) => {
        switch (req.url) {
            case '/':
                return homeHandler(req, res)(vars);
            case '/messages':
                return messagesHandler(req, res)(messages);
            default:
                return defaultHandler(req, res);
        }
    }).listen(port, hostname, () => {
        console.info(`TSC UI is running at http://${hostname}:${port}/ for ${options.configPath} `);
    });
}

function homeHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    return (vars: Variables) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        const template = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
        const index = interpolateVars(template, vars);
        res.write(index);
        res.end();
    };
}

function interpolateVars(html: string, vars: Variables) {
    return vars.reduce((template, [find, replace]) => {
       return template.replace(new RegExp(`{{${find}}}`, 'g'), replace);
    }, html);
}

function messagesHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    return (messages: any[]) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
            diagnostics: messages,
            filesAffected: Array.from(new Set(messages.map(({ fileName }) => fileName))),
            errorCodes: Array.from(new Set(messages.map(({ code }) => code))),
        }));
        res.end();
    };
}

function defaultHandler(req: http.IncomingMessage, res: http.ServerResponse) {
    return () => {
        res.writeHead(200, {});
        res.write(200);
        res.end();
    }
}
