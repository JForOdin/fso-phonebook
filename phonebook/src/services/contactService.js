import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';

const baseUrl = 'http://localhost:3001/api/persons'
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
  
}

//const deleteContact = (props,{message}) => {
const deleteContact = (id) => {
  console.log("Deleting contact ",id)
  const request = axios.delete(`${baseUrl}/${id}`)
  .catch(error => {
   // return <ErrorMessage message = "Already deleted from server"  />
   // return setErrorMessage("Already deleted from server")
   
    alert(
      `the contact '${id}' was already deleted from server`
   )
  })
  return request;
}
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll, 
  create, 
  deleteContact,
  update
}
