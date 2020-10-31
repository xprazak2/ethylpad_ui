import { protocol, host, port } from './backend';

const backendUrl = () => `${protocol}://${host}:${port}`;

export const endpointUrl = path => `${backendUrl()}/${path}`
