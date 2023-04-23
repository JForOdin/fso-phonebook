
const SearchForContact = ({searchForName, handleSearchContactChange,findContact}) => {
    
    return (
        <div>       
            <h3>Search for Contact</h3>
            <form onSubmit={findContact}>
                <div className="name">Name: <input value ={searchForName} onChange={handleSearchContactChange}/></div>
                <button type="submit">find</button>
            </form>
        </div>
    )
};

export default SearchForContact;