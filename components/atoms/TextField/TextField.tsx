const TextField = ({ label = "", id = "", ...props }) => {
  return (
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" />
    </div>
  )
}

export default TextField
