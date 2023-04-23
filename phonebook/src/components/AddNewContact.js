const AddNewContact = ({addContact,newContact,handleContactChange,newNumber,handleNumberChange}) => {
    
    return (
        <div>
          <form onSubmit={addContact} className="submit-contact">
          <div>
            <h3>Add Contact</h3>
            <div className="add-contact">
              <div className="name">Name: <input value ={newContact} onChange={handleContactChange}/></div>
              <div className="number">Number: <input value ={newNumber} onChange={handleNumberChange}/></div>
            </div>
            <button type="submit">save</button>
          </div>
        </form>  
        </div>
    )

}
export default AddNewContact;