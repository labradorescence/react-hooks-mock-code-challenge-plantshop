function Search( { searchTerm, onHandleSearch }) {

  const onHandleChange = (e) => {
      onHandleSearch(e.target.value)
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={onHandleChange}
        value={searchTerm}
      />
    </div>
  );
}

export default Search;
