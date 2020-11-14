import axios from 'axios';

import { endpointUrl } from './index';

const padsPath = () => 'api/pads/';
const padPath = name => `${padsPath()}${name}`;

export const getPads = () => axios.get(endpointUrl(padsPath())).then(res => {
  return res.data.result;
});

export const getPad = (name) => axios.get(endpointUrl(padPath(name))).then(res => {
  return res.data.result;
});

// export const getPad = (name) => simpleFetch(axios.get, endpointUrl(padPath(name)));
