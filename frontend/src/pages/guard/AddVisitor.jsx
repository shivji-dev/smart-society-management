function AddVisitor() {
  return (
    <div>
      <h1>Add Visitor</h1>

      <form>
        <input type="text" placeholder="Visitor Name" />
        <br /><br />

        <input type="text" placeholder="Phone Number" />
        <br /><br />

        <input type="text" placeholder="Purpose" />
        <br /><br />

        <button type="submit">
          Add Visitor
        </button>
      </form>
    </div>
  );
}

export default AddVisitor;