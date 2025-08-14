import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
//axios chi bat truong hop thanh cong va khong bat truong hop loi
//board api
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}
//upd board
export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}
//upd column
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}
//column api
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}
//upd column
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}
export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}
//card api
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  //axios se tra ket qua ve qua property cua no la data
  return response.data
}