const InputBox = ({ type, id, placeholder, errorText, error, setter }) => (
  <div className="mb-3">
    <input
      type={type}
      id={id}
      autoComplete="false"
      className=" bg-transparent  rounded-none  border border-lightPurple text-textMediumDark  block w-full px-3 py-2 focus:outline-none focus:bg-lightPurpleBox"
      placeholder={placeholder}
      onChange={(e) => setter(e.target.value)} />
    {error ? <p className="mt-2 text-sm text-red-400">{errorText}</p> : <></>}
  </div>
);

export default InputBox;
