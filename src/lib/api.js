import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

const requestServiceFn = httpsCallable(functions, 'serviceRequest');
const contactMessageFn = httpsCallable(functions, 'contactMessage');
const documentRequestFn = httpsCallable(functions, 'documentRequest');
const aiAssistantFn = httpsCallable(functions, 'aiAssistant');

export async function submitServiceRequest(payload) {
  const response = await requestServiceFn(payload);
  return response.data;
}

export async function submitContactMessage(payload) {
  const response = await contactMessageFn(payload);
  return response.data;
}

export async function requestCompanyDocuments(payload) {
  const response = await documentRequestFn(payload);
  return response.data;
}

export async function askEnashAssistant(payload) {
  const response = await aiAssistantFn(payload);
  return response.data;
}
