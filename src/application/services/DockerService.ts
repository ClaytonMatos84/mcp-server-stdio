import { ContainerInspectInfo } from 'dockerode';
import docker from '../config/docker.config.js';

export async function listAllContainers(): Promise<any[]> {
	const containers = await docker.listContainers({
        all: true
    });

	return containers;
}

export async function startContainer(containerId: string): Promise<any> {
	const container = docker.getContainer(containerId);
	return await container.start();
}

export async function stopContainer(containerId: string): Promise<any> {
	const container = docker.getContainer(containerId);
	return await container.stop();
}

export async function inspectContainer(containerId: string): Promise<ContainerInspectInfo> {
	const container = docker.getContainer(containerId);
	return await container.inspect();
}
