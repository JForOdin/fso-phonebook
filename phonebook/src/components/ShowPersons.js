
const ShowPersons = ({showAll,persons,onDelete,searchForName}) => {
    console.log("Called show persons"+showAll);
    const contactsToShow = showAll ? persons : persons.filter(person => person.name.startsWith(searchForName));
    return (
      <div>
        <h3>Contacts</h3>  
        {contactsToShow.map((person)=><div key = {person.name} className = "person-div">{person.name} - 
        {" "}{person.number} <button onClick={() => onDelete(person)}>delete</button></div>)}
      </div>
    )
} 
export default ShowPersons;