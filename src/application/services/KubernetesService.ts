import { execSync } from 'child_process';

export function getContexts(): string {
    const currentContext = execSync('kubectl config get-contexts').toString();
    return currentContext;
}

export function getCurrentContext(): string {
    const currentContext = execSync('kubectl config current-context').toString().trim();
    return currentContext;
}

export function getPods(): string {
    const pods = execSync('kubectl get pods').toString();
    return pods;
}

export function setCurrentContext(context: string): void {
    execSync(`kubectl config use-context ${context}`);
}

export function grepLogs(podName: string, namespace: string, query: string): string {
    try {
        const logs = execSync(`kubectl logs ${podName} -n ${namespace} | grep -m 10 ${query}`).toString();
        return logs;
    } catch (error) {
        console.error('Error executing grepLogs:', error);
        return 'Logs not found or error occurred.';
    }
}
