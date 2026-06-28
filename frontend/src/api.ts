import axios from 'axios'
import type {
  User,
  Child,
  Diagnosis,
  PostnatalGrowthAnalysis,
  TreatmentProtocol,
  ImplicationSet,
  ProcessRequest,
  ProcessResponse,
} from './types'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

// ── Users ──────────────────────────────────────────────────────────────────
export const getUsers = () => api.get<User[]>('/users').then((r) => r.data)

export const createUser = (data: Omit<User, 'id'>) =>
  api.post<User>('/users', data).then((r) => r.data)

export const updateUser = (id: number, data: Partial<Omit<User, 'id'>>) =>
  api.put<User>(`/users/${id}`, data).then((r) => r.data)

export const deleteUser = (id: number) =>
  api.delete(`/users/${id}`).then((r) => r.data)

// ── Children ───────────────────────────────────────────────────────────────
export const getChildren = () => api.get<Child[]>('/children').then((r) => r.data)

export const createChild = (data: Omit<Child, 'id'>) =>
  api.post<Child>('/children', data).then((r) => r.data)

export const updateChild = (id: number, data: Partial<Omit<Child, 'id'>>) =>
  api.put<Child>(`/children/${id}`, data).then((r) => r.data)

export const deleteChild = (id: number) =>
  api.delete(`/children/${id}`).then((r) => r.data)

// ── Diagnoses ──────────────────────────────────────────────────────────────
export const getDiagnoses = () =>
  api.get<Diagnosis[]>('/diagnoses').then((r) => r.data)

export const createDiagnosis = (data: Omit<Diagnosis, 'id'>) =>
  api.post<Diagnosis>('/diagnoses', data).then((r) => r.data)

export const updateDiagnosis = (id: number, data: Partial<Omit<Diagnosis, 'id'>>) =>
  api.put<Diagnosis>(`/diagnoses/${id}`, data).then((r) => r.data)

export const deleteDiagnosis = (id: number) =>
  api.delete(`/diagnoses/${id}`).then((r) => r.data)

// ── Postnatal Growth Analyses ──────────────────────────────────────────────
export const getPostnatalGrowthAnalyses = () =>
  api.get<PostnatalGrowthAnalysis[]>('/postnatal-growth-analyses').then((r) => r.data)

export const createPostnatalGrowthAnalysis = (data: Omit<PostnatalGrowthAnalysis, 'id'>) =>
  api.post<PostnatalGrowthAnalysis>('/postnatal-growth-analyses', data).then((r) => r.data)

export const updatePostnatalGrowthAnalysis = (
  id: number,
  data: Partial<Omit<PostnatalGrowthAnalysis, 'id'>>
) => api.put<PostnatalGrowthAnalysis>(`/postnatal-growth-analyses/${id}`, data).then((r) => r.data)

export const deletePostnatalGrowthAnalysis = (id: number) =>
  api.delete(`/postnatal-growth-analyses/${id}`).then((r) => r.data)

// ── Treatment Protocols ────────────────────────────────────────────────────
export const getTreatmentProtocols = () =>
  api.get<TreatmentProtocol[]>('/treatment-protocols').then((r) => r.data)

export const createTreatmentProtocol = (data: Omit<TreatmentProtocol, 'id'>) =>
  api.post<TreatmentProtocol>('/treatment-protocols', data).then((r) => r.data)

export const updateTreatmentProtocol = (
  id: number,
  data: Partial<Omit<TreatmentProtocol, 'id'>>
) => api.put<TreatmentProtocol>(`/treatment-protocols/${id}`, data).then((r) => r.data)

export const deleteTreatmentProtocol = (id: number) =>
  api.delete(`/treatment-protocols/${id}`).then((r) => r.data)

// ── Implication Sets ───────────────────────────────────────────────────────
export const getImplicationSets = () =>
  api.get<ImplicationSet[]>('/implication-sets').then((r) => r.data)

export const createImplicationSet = (data: Omit<ImplicationSet, 'id'>) =>
  api.post<ImplicationSet>('/implication-sets', data).then((r) => r.data)

export const updateImplicationSet = (
  id: number,
  data: Partial<Omit<ImplicationSet, 'id'>>
) => api.put<ImplicationSet>(`/implication-sets/${id}`, data).then((r) => r.data)

export const deleteImplicationSet = (id: number) =>
  api.delete(`/implication-sets/${id}`).then((r) => r.data)

// ── Process endpoints ──────────────────────────────────────────────────────
export const callProcess = (endpoint: string, body: ProcessRequest): Promise<ProcessResponse> =>
  api.post<ProcessResponse>(endpoint, body).then((r) => r.data)